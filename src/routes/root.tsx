import { Outlet } from "react-router-dom";
import { NavItem } from "@/components/nav";

import {menus} from "@/utils/const"


export default function Root() {
  return (
    <>
      <div className="flex w-[800px] h-[600px]">
        <nav className="w-1/5 min-w-1/5 min-h-full p-2">
          <ul>
            {menus.map((menu, i)=>{
              return <NavItem menu={menu} key={i}></NavItem>
            })}
          </ul>
        </nav>
        <main className="w-4/5 p-2">
          <Outlet />
        </main>
      </div>
    </>
  )
}
