import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
}
const useSideBarUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      try {
        const response = await fetch("api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        toast.error("Error fetching users");
      }
      setLoading(false);
    }
    getUsers();
  }, []);
  return { users, loading };
};

export default useSideBarUsers;
