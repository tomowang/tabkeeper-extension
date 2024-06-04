import { TabMenuAction } from "@/types"
import Tab from "./Tab"

interface TabGroupProps {
  tabs: chrome.tabs.Tab[],
  group: chrome.tabGroups.TabGroup,
  handleClickTabMenu: (id: number|undefined, action: TabMenuAction) => void
  handleTabMouseEvent: (tab: chrome.tabs.Tab|null) => void
}

export default function TabGroup({tabs, group, handleClickTabMenu, handleTabMouseEvent} : TabGroupProps) {
  return(
    <div title={group.title} className={`flex flex-wrap gap-0.5 border-2 rounded shadow-sm p-1 color-${group.color}`}>
      {tabs.map(tab => {
        return <Tab key={tab.id} tab={tab}
          handleClickTabMenu={handleClickTabMenu}
          handleTabMouseEvent={handleTabMouseEvent}></Tab>
      })}
    </div>
  )
}
