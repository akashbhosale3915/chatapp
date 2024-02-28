// AuthContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { useSelectedUser } from "../hooks/useSelectedUser";

export interface AuthContextProps {
  isLoggedIn: boolean;
  login: (user) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<
  AuthContextProps | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [loading, setLoading] = useState(false);

  const { setSelectedUser } = useSelectedUser();

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setLoggedIn(true);
  };

  const logout = async () => {
    try {
      setLoading(true);
      const logout = await fetch("api/auth/logout");
      const data = await logout.json();

      if (logout.ok && data.message) {
        localStorage.removeItem("user");
        setLoggedIn(false);
        setSelectedUser(undefined);
        toast.success("Logged out successfully");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error logging out");
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        setLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
