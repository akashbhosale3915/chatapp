import { useSelectedUser } from "../hooks/useSelectedUser";
import { User } from "../hooks/useSideBarUsers";
import { BeatLoader } from "react-spinners";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../hooks/useAuthContext";

interface SideBarUserProps {
  user: User;
  currentUser?: boolean;
  onlineUsers?: string[];
}

const SideBarUser = ({
  user,
  currentUser,
  onlineUsers,
}: SideBarUserProps) => {
  const { logout, loading } = useAuth();

  const { setSelectedUser } = useSelectedUser();
  return (
    <div
      className={`border p-2 rounded-xl flex items-center gap-3 cursor-pointer select-none flex-grow ${
        !currentUser && "hover:bg-blue-400"
      }`}
      onClick={() => {
        !currentUser && setSelectedUser(user);
        localStorage.setItem(
          "selectedUser",
          JSON.stringify(user)
        );
      }}
    >
      <div className="relative">
        <img
          src={user.profilePicture}
          alt="user image"
          className="h-10"
        />
        {onlineUsers?.includes(user._id) && (
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full"></div>
        )}
      </div>
      <div>
        <h1 className="text-black font-bold capitalize">
          {user.fullName}
        </h1>
        <p key={user._id} className="text-xs">
          {user.username}
        </p>
      </div>
      {currentUser && (
        <button
          onClick={logout}
          className="border border-slate-400 rounded-lg p-1 ml-auto"
        >
          {loading ? (
            <BeatLoader size={6} />
          ) : (
            <TbLogout className="text-3xl" />
          )}
        </button>
      )}
    </div>
  );
};

export default SideBarUser;
