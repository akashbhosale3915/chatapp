import { Message } from "../context/SelectedUserContext";

const MessageComponent = ({
  message,
  senderId,
  createdAt,
}: Message) => {
  const loggedInUser = JSON.parse(
    localStorage.getItem("user")!
  );

  const currentUser = senderId === loggedInUser._id;
  return (
    <div
      className={`
          border p-2 rounded-lg w-fit text-white flex flex-col space-y-1
      ${
        currentUser
          ? "self-end bg-black"
          : "self-start bg-blue-500"
      }`}
    >
      <p>{message}</p>
      <p className="text-[10px]">
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default MessageComponent;
