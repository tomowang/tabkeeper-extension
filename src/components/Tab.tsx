import { TabMenuAction } from '@/types';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  Icon,
  Box,
  VStack,
} from '@chakra-ui/react'
import { RiFocus3Line, RiRefreshLine, RiCloseLine, RiUnpinLine, RiPushpinLine } from "react-icons/ri";
import { HiDuplicate } from "react-icons/hi";
import { PiMemory } from "react-icons/pi";
import { TbVolume, TbVolumeOff } from "react-icons/tb";


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
        <VStack as='ul' spacing={0.5} alignItems='start'>
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Activate)}>
            <Icon as={RiFocus3Line} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Activate</Box>
          </Flex>
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Reload)}>
            <Icon as={RiRefreshLine} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Reload</Box>
          </Flex>
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Close)}>
            <Icon as={RiCloseLine} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Close</Box>
          </Flex>
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Duplicate)}>
            <Icon as={HiDuplicate} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Duplicate</Box>
          </Flex>
          { tab.pinned ?
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Unpin)}>
            <Icon as={RiUnpinLine} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Unpin</Box>
          </Flex>
          :
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Pin)}>
            <Icon as={RiPushpinLine} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Pin</Box>
          </Flex>
          }
          { tab.status !== "unloaded" &&
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Unload)}>
            <Icon as={PiMemory} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Unload</Box>
          </Flex>
          }
          { tab.audible && (tab.mutedInfo?.muted ?
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Unmute)}>
            <Icon as={TbVolume} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Unmute</Box>
          </Flex>
          :
          <Flex as='li' cursor='pointer' gap={2} _hover={{ color: 'blue.500'}} onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Mute)}>
            <Icon as={TbVolumeOff} w={6} h={6}/>
            <Box as='span' lineHeight={6}>Mute</Box>
          </Flex>
          )}
        </VStack>
      </PopoverBody>
    </PopoverContent>
  </Popover>
}
