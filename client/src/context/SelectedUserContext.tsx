import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { User } from "../hooks/useSideBarUsers";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuthContext";

export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  _id: string;
}

interface SelectedUserProviderProps {
  children: ReactNode;
}

export interface SelectedUserContextProps {
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<
    React.SetStateAction<User | undefined>
  >;
  messages: Message[];
  setMessages: Dispatch<React.SetStateAction<Message[]>>;
}
export const SelectedUserContext = createContext<
  SelectedUserContextProps | undefined
>(undefined);

export const SelectedUserProvider = ({
  children,
}: SelectedUserProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<
    User | undefined
  >(
    localStorage.getItem("selectedUser")
      ? JSON.parse(localStorage.getItem("selectedUser")!)
      : undefined
  );

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function getMessages() {
      try {
        const messagePromise = await fetch(
          `api/messages/${selectedUser?._id}`
        );

        const data = await messagePromise.json();
        setMessages(data);
      } catch (error) {
        toast.error("Error fetching messages");
      }
    }
    if (JSON.parse(localStorage.getItem("user")!)) {
      getMessages();
    }
  }, [selectedUser?._id]);

  return (
    <SelectedUserContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        messages,
        setMessages,
      }}
    >
      {children}
    </SelectedUserContext.Provider>
  );
};
