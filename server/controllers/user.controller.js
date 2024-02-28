const User = require("../models/user.model");

async function getUsers(req, res) {
  try {
    const loggedInUser = req.userId;

    const allUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password -createdAt -updatedAt -__v");
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(
      "Error in getUsers controller : ",
      error.message
    );
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
}

module.exports = {
  getUsers,
};
