import toast from "react-hot-toast";
import { useSelectedUser } from "../hooks/useSelectedUser";

const MessageInput = () => {
  const { selectedUser, setMessages } = useSelectedUser();

  async function handleMessage(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");

    if (!message) {
      return;
    }

    try {
      const res = await fetch(
        `api/messages/send/${selectedUser?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await res.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        data,
      ]);
      e.target.message.value = "";
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <form
      className="border flex items-center px-4 py-3"
      onSubmit={handleMessage}
    >
      <input
        type="text"
        name="message"
        id="message"
        placeholder="Type your message here"
        className="h-full w-full p-2 outline-none"
      />
      <button className="border border-slate-400 rounded-lg px-3 py-2">
        Send
      </button>
    </form>
  );
};

export default MessageInput;
