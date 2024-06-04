import { TabMenuAction } from '@/types';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react'


interface TabProps {
  tab: chrome.tabs.Tab,
  handleClickTabMenu: (id: number|undefined, action: TabMenuAction) => void
  handleTabMouseEvent: (tab: chrome.tabs.Tab|null) => void
}

export default function Tab({tab, handleClickTabMenu, handleTabMouseEvent}: TabProps) {
  return <Popover trigger='click' placement='bottom-start'>
    <PopoverTrigger>
      <div className={"border rounded flex items-center p-1 cursor-pointer" + (tab.active ? " border-blue-600" : "")}
        onMouseOver={() => handleTabMouseEvent(tab)}>
        <img src={tab.favIconUrl} className={"w-5 h-5" + (tab.status === "unloaded" ? " rounded-full border-2 border-slate-500 border-dashed" : "")} />
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverBody>
        <ul>
          <li onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Activate)}>Activate</li>
        </ul>
      </PopoverBody>
    </PopoverContent>
  </Popover>
}
