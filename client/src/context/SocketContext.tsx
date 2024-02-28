import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAuth } from "../hooks/useAuthContext";

interface SocketContextProps {
  onlineUsers: string[];
  socket: Socket | null;
}

export const SocketContext =
  createContext<SocketContextProps | null>(null);

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>(
    []
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const { isLoggedIn } = useAuth();
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    if (isLoggedIn) {
      const newSocket = io("http://localhost:8000", {
        query: {
          userId: user._id,
        },
      });

      setSocket((prev) => {
        if (prev) {
          prev.disconnect();
        }
        return newSocket;
      });

      newSocket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isLoggedIn, user?._id]);
  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
