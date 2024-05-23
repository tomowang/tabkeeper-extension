import { NavLink } from "react-router-dom";
import { Icon } from '@chakra-ui/react'
import { IMenu } from "@/types";

export function NavItem({menu}: {menu: IMenu}) {
  return <li>
      <NavLink className={({ isActive }) =>
          "flex gap-1 p-1 " + (isActive ? "bg-slate-200 rounded" : "")
        } to={menu.path}>
        <Icon as={menu.icon} w={6} h={6}/>
        <span className="leading-6">{menu.title}</span>
      </NavLink>
    </li>
}
