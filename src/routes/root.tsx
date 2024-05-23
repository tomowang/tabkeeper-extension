import { Outlet } from "react-router-dom";
import { NavItem } from "@/components/nav";

import {menus} from "@/utils/const"


export default function Root() {
  return (
    <>
      <div className="flex min-w-[800px] min-h-[600px]">
        <nav className="w-[150px] min-h-full p-2">
          <ul>
            {menus.map((menu, i)=>{
              return <NavItem menu={menu} key={i}></NavItem>
            })}
          </ul>
        </nav>
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </>
  )
}
