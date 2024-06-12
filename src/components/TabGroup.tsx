import { ITab, TabMenuAction } from "@/types"
import Tab from "./Tab"
import { Text, Flex } from "@chakra-ui/react"

interface TabGroupProps {
  tabs: ITab[],
  group: chrome.tabGroups.TabGroup,
  handleClickTabMenu: (id: number|undefined, action: TabMenuAction) => void
  handleTabMouseEvent: (tab: chrome.tabs.Tab|null) => void
}

export default function TabGroup({tabs, group, handleClickTabMenu, handleTabMouseEvent} : TabGroupProps) {
  const gc = group.color
  return(
    <Flex wrap='wrap' gap={0.5} p={1} borderBottomColor={gc} borderBottomWidth={2} alignItems='center'>
      <Text as='span' bg={gc} px={1.5} borderRadius='md' fontSize='sm' color={gc === 'yellow' || gc === 'orange' ? 'black' : 'white'}>{group.title}</Text>
      {tabs.map(tab => {
        return <Tab key={tab.id} tab={tab}
          handleClickTabMenu={handleClickTabMenu}
          handleTabMouseEvent={handleTabMouseEvent}></Tab>
      })}
    </Flex>
  )
}
