import { CSSProperties } from "react"
import { NavLink } from "react-router-dom"

type IconProp = {
  icon: React.ReactNode;
  link: string;
}

const activeStyle:CSSProperties = {
  color: '#7269ef',
  backgroundColor: '#f7f7ff'
}



const NavIcon = ( { icon, link }: IconProp  ) => {
  return (
    <li>
      <NavLink to={link} className='p-4 block' style={({ isActive }) => isActive ? activeStyle : {}}>
        { icon }
      </NavLink>
    </li>
  )
}

export default NavIcon