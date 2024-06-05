import { TabMenuAction } from '@/types';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  Icon,
  Box,
} from '@chakra-ui/react'
import { RiFocus3Line } from "react-icons/ri";


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
    <PopoverContent w='auto' _focusVisible={{ outline: "none" }}>
      <PopoverBody>
        <ul>
          <Flex as='li' cursor='pointer' gap={1} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Activate)}>
            <Icon as={RiFocus3Line} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Activate</Box>
          </Flex>
        </ul>
      </PopoverBody>
    </PopoverContent>
  </Popover>
}
