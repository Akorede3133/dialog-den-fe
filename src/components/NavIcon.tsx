import { CSSProperties } from "react"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { selectChat } from "../features/chats/redux/chatSlice";

type IconProp = {
  icon: React.ReactNode;
  link: string;
}



const NavIcon = ( { icon, link }: IconProp  ) => {
  const { darkMode } = useSelector(selectChat)
  const activeStyle:CSSProperties = {
    color: '#7269ef',
    backgroundColor: darkMode ? '#3E4A56' : '#f7f7ff'
  }
  
  return (
    <li>
      <NavLink to={link} className='p-4 flex justify-center rounded-md' style={({ isActive }) => isActive ? activeStyle : {}}>
        { icon }
      </NavLink>
    </li>
  )
}

export default NavIcon