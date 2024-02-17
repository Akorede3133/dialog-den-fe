import { CiUser } from "react-icons/ci";
import { HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineUser, HiOutlineUserCircle, HiOutlineSun,  HiOutlineCog8Tooth, HiOutlineMoon  } from "react-icons/hi2";
import NavIcon from "./NavIcon";
import logo from '../assets/logo.png';

const NavBar = () => {
  return (
    <header className="fixed bottom-0 sm:top-0 left-0 w-full sm:w-[5rem] bg-white drop-shadow-xl shadow-inner">
      <section className="hidden sm:block my-10 px-3">
        <img src={logo} className=" w-[70px] h-auto object-cover rounded-md" alt="" />
      </section>
      <nav>
        <ul className="flex items-center sm:flex-col justify-between sm:gap-10 px-4">
          <NavIcon link='profile' icon={<HiOutlineUserCircle className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='' icon={<HiOutlineChatBubbleOvalLeftEllipsis className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='contacts' icon={<HiOutlineUser className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <NavIcon link='settings' icon={<HiOutlineCog8Tooth className="text-xl hover:text-primary-blue bg-inherit text-inherit"  />} />
          <li className=" hidden sm:block">
            <button className="p-4">
              <HiOutlineMoon  className="text-xl hover:text-primary-blue bg-inherit text-inherit" />
            </button>
          </li>
          <li>
            <img src={logo} alt="" className="w-[30px] h-[30px] rounded-full" />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;