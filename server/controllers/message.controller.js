const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket");

async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([
      newMessage.save(),
      conversation.save(),
    ]);

    const receiverSocketId =
      getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "new-message",
        newMessage
      );
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
}

async function getMessages(req, res) {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.userId;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChat],
      },
    }).populate("messages"); //Not reference of message model but actual messages

    if (!conversation?.messages) {
      return res.status(404).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
}

module.exports = {
  sendMessage,
  getMessages,
};
