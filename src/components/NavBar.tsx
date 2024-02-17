import { CiUser } from "react-icons/ci";
import { HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineUser, HiOutlineUserCircle, HiOutlineSun,  HiOutlineCog8Tooth, HiOutlineMoon  } from "react-icons/hi2";
import NavIcon from "./NavIcon";

const NavBar = () => {
  return (
    <header className="fixed bottom-0 sm:top-0 left-0 w-full sm:w-[5rem] bg-white drop-shadow-xl shadow-inner sm:px-4">
      <nav>
        <ul className="flex sm:flex-col justify-between sm:gap-10">
          <NavIcon link='profile' icon={<HiOutlineUserCircle className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='' icon={<HiOutlineChatBubbleOvalLeftEllipsis className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='contacts' icon={<HiOutlineUser className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='settings' icon={<HiOutlineCog8Tooth className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <li className=" hidden sm:block">
            <button className="p-4">
              <HiOutlineMoon  className="text-xl hover:text-primary-blue bg-inherit text-inherit" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;