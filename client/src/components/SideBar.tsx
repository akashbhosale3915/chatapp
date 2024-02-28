import { FaSearch } from "react-icons/fa";
import useSideBarUsers from "../hooks/useSideBarUsers";
import SideBarUser from "./SideBarUser";
import { useSocketContext } from "../hooks/useSocketContext";

const SideBar = () => {
  const { loading, users } = useSideBarUsers();
  const { onlineUsers } = useSocketContext();

  console.log(onlineUsers, "SIDEBAR");
  return (
    <div className="flex-grow p-2">
      <div className="flex items-center border p-3 rounded-xl mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none"
        />
        <FaSearch className="cursor-pointer" />
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            {users?.length > 0 &&
              users?.map((user) => (
                <SideBarUser
                  user={user}
                  key={user._id}
                  onlineUsers={onlineUsers}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
