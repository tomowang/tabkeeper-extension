import { Outlet } from "react-router-dom";
import { NavItem, Menu } from "@/components/nav";


export default function Root() {
  const menus : Menu[] = [{
    path: 'home',
    title: 'Home',
  }, {
    path: 'session-box',
    title: 'Session Box',
  }]
  return (
    <>
      <div className="flex min-w-[800px]">
        <nav className="w-1/12">
          <ul>
            {menus.map((menu, i)=>{
              return <NavItem menu={menu} key={i}></NavItem>
            })}
          </ul>
        </nav>
        <main className="w-11/12">
          <Outlet />
        </main>
      </div>
    </>
  )
}
