import {IMenu} from "@/types";
import TabKeeper from '@/pages/TabKeeper';
import SessionBox from '@/pages/SessionBox';
import AutoGroup from '@/pages/AutoGroup';
import General from '@/pages/General';

import { TfiLayoutTab } from "react-icons/tfi";
import { PiTabsDuotone, PiGear } from "react-icons/pi";
import { LuGroup } from "react-icons/lu";

export const menus: IMenu[] = [{
  path: 'home',
  title: 'TabKeeper',
  icon: TfiLayoutTab,
  element: <TabKeeper />,
}, {
  path: 'session-box',
  title: 'Session Box',
  icon: PiTabsDuotone,
  element: <SessionBox />,
}, {
  path: 'auto-group',
  title: 'Auto Group',
  icon: LuGroup,
  element: <AutoGroup />,
}, {
  path: 'general',
  title: 'General',
  icon: PiGear,
  element: <General />,
}]
