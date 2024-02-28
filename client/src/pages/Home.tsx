import MessageHeader from "../components/MessageHeader";
import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";
import SideBar from "../components/SideBar";
import { useSelectedUser } from "../hooks/useSelectedUser";
import EmptyMessageScreen from "../components/EmptyMessageScreen";
import SideBarUser from "../components/SideBarUser";

const Home = () => {
  const { selectedUser } = useSelectedUser();
  const loggedInUser = JSON.parse(
    localStorage.getItem("user")!
  );
  return (
    <div className="flex h-screen">
      <div className="flex w-full backdrop-filter backdrop-blur-sm">
        <div className="flex flex-col w-80 border border-r-black">
          <SideBar />
          <div className="h-14 flex items-center p-2">
            <SideBarUser user={loggedInUser} currentUser />
          </div>
        </div>
        <>
          {selectedUser ? (
            <div className="flex flex-col flex-grow">
              <MessageHeader />
              <Messages />
              <MessageInput />
            </div>
          ) : (
            <EmptyMessageScreen />
          )}
        </>
      </div>
    </div>
  );
};

export default Home;
