import { HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineUser, HiOutlineUserCircle, HiOutlineCog8Tooth, HiOutlineMoon  } from "react-icons/hi2";
import NavIcon from "./NavIcon";
import logo from '../assets/chat-logo.png';
import useCurrentUser from "../features/auth/hooks/useCurrentUser";
import ContextMenu from "../context/ContextMenu";
import { BiLogOutCircle } from "react-icons/bi";
import useLogout from "../features/auth/hooks/useLogout";
import { useAppSelector } from "../redux/hooks";
import { selectChat } from "../features/chats/redux/chatSlice";

const NavBar = () => {
  const { user } = useCurrentUser();
  const { socket } = useAppSelector(selectChat)
  const { logoutUser } = useLogout();
  const handleLogout = () => {
    logoutUser();
    socket.emit('logout', { userId: user?.id })
  }
  return (
    <header className={`w-full sm:w-[70px] bg-white drop-shadow-xl shadow-inner sm:h-full sm:max-h-full order-2 sm:order-1 relative sm:flex flex-col items-center`}>
      <section className="hidden sm:block mt-5 mb-10 px-3">
        <img src={logo} className=" w-[70px h-auto object-cover rounded-md" alt="" />
      </section>
      <nav>
        <ul className=" grid grid-cols-5 sm:flex items-center sm:flex-col sm:justify-between sm:gap-10 sm:px-4 ">
          <NavIcon link='profile' icon={<HiOutlineUserCircle className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='' icon={<HiOutlineChatBubbleOvalLeftEllipsis className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='contacts' icon={<HiOutlineUser className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='settings' icon={<HiOutlineCog8Tooth className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <li className=" hidden sm:block">
            <button className="p-4">
              <HiOutlineMoon  className="text-xl hover:text-primary-blue bg-inherit text-inherit" />
            </button>
          </li>
          <ContextMenu>
            <ContextMenu.Open type="logout">
              <li className=" cursor-pointer flex justify-center">
                <img src={user?.photo} alt="" className="w-[30px] h-[30px] rounded-full" />
              </li>
            </ContextMenu.Open>
            <ContextMenu.Window type="logout">
              <ul className="absolute top-[-170%] right-[10px] sm:top-[80%] sm:right-[-120%] bg-white  shadow-lg w-[120px] rounded-md text-text-primary text-sm">
              <li className=" hover:bg-bg-silver flex items-center">
                  <button className="w-full p-3 text-left">Settings</button>
                  <button className="pr-3">
                    <HiOutlineCog8Tooth className="text-xl" />
                  </button>
                </li>
                <li className=" hover:bg-bg-silver flex items-center" onClick={handleLogout}>
                  <button className="w-full p-3 text-left">Logout</button>
                  <button className="pr-3">
                    <BiLogOutCircle className="text-xl" />

                  </button>
                </li>
              </ul>
            </ContextMenu.Window>
          </ContextMenu>
        
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;