import { useSelectedUser } from "../hooks/useSelectedUser";

const MessageHeader = () => {
  // const user = JSON.parse(localStorage.getItem("user")!);
  const { selectedUser } = useSelectedUser();

  return (
    <div className="h-16 border border-b-black p-2 flex gap-4 items-center">
      <img
        src={selectedUser.profilePicture}
        alt="user image"
        className="h-full"
      />
      <div>
        <h1 className="text-black text-xl font-bold capitalize">
          {selectedUser.fullName}
        </h1>
        <h2>{selectedUser.username}</h2>
      </div>
    </div>
  );
};

export default MessageHeader;
