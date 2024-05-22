import { Link } from "react-router-dom";

export interface Menu {
  path: string
  title: string
}

export function NavItem({menu, className = ''}: {menu: Menu, className?: string}) {
  return <li className={className}>
      <Link to={menu.path}>{menu.title}</Link>
    </li>
}
