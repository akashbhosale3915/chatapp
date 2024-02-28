import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }
  return context;
};
