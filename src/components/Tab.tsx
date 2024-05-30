import { TabMenuAction } from '@/types';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Stack,
  Badge,
} from '@chakra-ui/react'


interface TabProps {
  tab: chrome.tabs.Tab,
  handleClickTabMenu: (id: number|undefined, action: TabMenuAction) => void
}

export default function Tab({tab, handleClickTabMenu}: TabProps) {

  // https://developer.chrome.com/docs/extensions/reference/api/tabs#type-TabStatus
  let statusColor = "yellow";
  if (tab.status === "complete") {
    statusColor = "green";
  } else if (tab.status === "unloaded") {
    statusColor = "gray";
  }
  return <Popover trigger='click'>
    <PopoverTrigger>
      <div className={"border rounded flex items-center p-1 cursor-pointer" + (tab.active ? " border-blue-600" : "")}>
        <img src={tab.favIconUrl} className={"w-5 h-5" + (tab.status === "unloaded" ? " rounded-full border-2 border-slate-500 border-dashed" : "")} />
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>{tab.title}</PopoverHeader>
      <PopoverBody>
        <p className='truncate' onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Activate)}>{tab.url}</p>
        <Stack direction='row'>
          <Badge colorScheme={statusColor}>{tab.status}</Badge>
          {tab.pinned && <Badge colorScheme='green'>Pinned</Badge>}
          {tab.active && <Badge colorScheme='blue'>Active</Badge>}
          {tab.mutedInfo?.muted && <Badge colorScheme='red'>Muted</Badge>}
        </Stack>
      </PopoverBody>
    </PopoverContent>
  </Popover>
}
