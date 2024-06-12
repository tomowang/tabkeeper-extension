import { ITab, TabGroupMenuAction, TabMenuAction } from "@/types";
import Tab from "./Tab";
import {
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
} from "@chakra-ui/react";
import ActionMenuItem from "./ActionMenuItem";
import { FaRegObjectUngroup } from "react-icons/fa";

interface TabGroupProps {
  tabs: ITab[];
  group: chrome.tabGroups.TabGroup;
  handleClickTabMenu: (id: number | undefined, action: TabMenuAction) => void;
  handleClickGroupMenu: (id: number, action: TabGroupMenuAction) => void;
  handleTabMouseEvent: (tab: chrome.tabs.Tab | null) => void;
}

export default function TabGroup({
  tabs,
  group,
  handleClickTabMenu,
  handleClickGroupMenu,
  handleTabMouseEvent,
}: TabGroupProps) {
  const gc = group.color;
  return (
    <Flex
      wrap="wrap"
      gap={0.5}
      p={1}
      borderBottomColor={gc}
      borderBottomWidth={2}
      alignItems="center"
    >
      <Popover trigger="click" placement="bottom-start" closeOnBlur={true}>
        <PopoverTrigger>
          <Text
            as="span"
            bg={gc}
            px={1.5}
            cursor="pointer"
            borderRadius="md"
            fontSize="sm"
            color={gc === "yellow" || gc === "orange" ? "black" : "white"}
          >
            {group.title}
          </Text>
        </PopoverTrigger>
        <PopoverContent w="auto" _focusVisible={{ outline: "none" }}>
          <PopoverBody>
            <VStack as="ul" spacing={0.5} alignItems="start">
              <ActionMenuItem
                icon={FaRegObjectUngroup}
                title="Ungroup"
                onClick={() =>
                  handleClickGroupMenu(group.id, TabGroupMenuAction.Ungroup)
                }
              />
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab.id}
            tab={tab}
            handleClickTabMenu={handleClickTabMenu}
            handleTabMouseEvent={handleTabMouseEvent}
          ></Tab>
        );
      })}
    </Flex>
  );
}
