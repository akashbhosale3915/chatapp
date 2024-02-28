import { useEffect } from "react";
import { useSelectedUser } from "./useSelectedUser";
import { useSocketContext } from "./useSocketContext";

export const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useSelectedUser();

  useEffect(() => {
    socket?.on("new-message", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket?.off("new-message");
    };
  }, [messages, setMessages, socket]);
  return;
};
