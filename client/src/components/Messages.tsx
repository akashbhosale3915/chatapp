import { useEffect, useRef } from "react";
import { useListenMessages } from "../hooks/useListenMessages";
import { useSelectedUser } from "../hooks/useSelectedUser";
import MessageComponent from "./Message";

const Messages = () => {
  useListenMessages();
  const { messages } = useSelectedUser();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      className="flex flex-col flex-grow p-5 space-y-2 overflow-y-auto"
      ref={messageContainerRef}
    >
      {messages?.length > 0 &&
        messages?.map((message) => (
          <MessageComponent
            key={message._id}
            {...message}
          />
        ))}
    </div>
  );
};

export default Messages;
