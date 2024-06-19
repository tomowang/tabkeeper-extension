import { IMenu } from "@/types";
import TabKeeper from "@/pages/TabKeeper";
import SessionBox from "@/pages/SessionBox";
import AutoGroup from "@/pages/AutoGroup";
import General from "@/pages/General";

import { TfiLayoutTab } from "react-icons/tfi";
import { PiTabsDuotone, PiGear } from "react-icons/pi";
import { LuGroup } from "react-icons/lu";

export const menus: IMenu[] = [
  {
    path: "home",
    title: "TabKeeper",
    icon: TfiLayoutTab,
    element: <TabKeeper />,
  },
  {
    path: "session-box",
    title: "Session Box",
    icon: PiTabsDuotone,
    element: <SessionBox />,
  },
  {
    path: "auto-group",
    title: "Auto Group",
    icon: LuGroup,
    element: <AutoGroup />,
  },
  {
    path: "general",
    title: "General",
    icon: PiGear,
    element: <General />,
  },
];

export const colorPalette = [
  "#c12e34",
  "#e6b600",
  "#0098d9",
  "#2b821d",
  "#005eaa",
  "#339ca8",
  "#cda819",
  "#32a487",
];

// ColorEnum = "grey" | "blue" | "red" | "yellow" | "green" | "pink" | "purple" | "cyan" | "orange";
export const tabGroupColors: chrome.tabGroups.ColorEnum[] = [
  "grey",
  "blue",
  "red",
  "yellow",
  "green",
  "pink",
  "purple",
  "cyan",
  "orange",
];

export const tabGroupColorMap: Record<string, string> = {
  g_grey: "#5E6468",
  g_blue: "#1B74E8",
  g_red: "#D73226",
  g_yellow: "#F8AC02",
  g_green: "#188139",
  g_pink: "#D01A85",
  g_purple: "#A143F4",
  g_cyan: "#027C84",
  g_orange: "#F8913F",
};
