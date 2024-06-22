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
  useDisclosure,
  PopoverArrow,
  Input,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ActionMenuItem from "./ActionMenuItem";
import { LiaObjectUngroup } from "react-icons/lia";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import ColorChoice from "./ColorChoice";

interface TabGroupProps {
  tabs: ITab[];
  group: chrome.tabGroups.TabGroup;
  handleClickTabMenu: (id: number | undefined, action: TabMenuAction) => void;
  handleClickGroupMenu: (
    id: number,
    action: TabGroupMenuAction,
    updateProperties?: chrome.tabGroups.UpdateProperties
  ) => void;
  handleTabMouseEvent: (tab: chrome.tabs.Tab | null) => void;
}

export default function TabGroup({
  tabs,
  group,
  handleClickTabMenu,
  handleClickGroupMenu,
  handleTabMouseEvent,
}: TabGroupProps) {
  const gc = `g_${group.color}`;
  const collapsed = group.collapsed;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      wrap="wrap"
      gap={0.5}
      pb={0.5}
      borderBottomColor={gc}
      borderBottomWidth={collapsed ? 0 : 2}
      pt={collapsed ? 0.5 : 1}
      alignItems="center"
    >
      <Popover
        trigger="click"
        placement="bottom-start"
        closeOnBlur={true}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Text
            as="span"
            bg={gc}
            px={1.5}
            cursor="pointer"
            borderRadius="md"
            fontSize="sm"
            minW={5}
            h={5}
            lineHeight={5}
            color={gc === "g_yellow" || gc === "g_orange" ? "black" : "white"}
          >
            {group.title}
          </Text>
        </PopoverTrigger>
        <PopoverContent w="auto" _focusVisible={{ outline: "none" }}>
          <PopoverArrow />
          <PopoverBody>
            <VStack spacing={1.5} alignItems="start">
              <Input
                size="sm"
                variant="outline"
                borderRadius="md"
                value={group.title}
                placeholder="Name This Group"
                onChange={(e) => {
                  handleClickGroupMenu(group.id, TabGroupMenuAction.Update, {
                    title: e.target.value,
                  });
                }}
              ></Input>
              <ColorChoice
                selectedColor={group.color}
                onColorChange={function (
                  color: chrome.tabGroups.ColorEnum
                ): void {
                  handleClickGroupMenu(group.id, TabGroupMenuAction.Update, {
                    color,
                  });
                }}
              />
            </VStack>
            <Divider colorScheme="blue" size="md" my={2} />
            <VStack as="ul" spacing={0.5} alignItems="start">
              <ActionMenuItem
                icon={LiaObjectUngroup}
                title="Ungroup"
                onClick={() => {
                  handleClickGroupMenu(group.id, TabGroupMenuAction.Ungroup);
                  onClose();
                }}
              />
              {collapsed ? (
                <ActionMenuItem
                  icon={TbLayoutSidebarRightCollapse}
                  title="Expand"
                  onClick={() => {
                    handleClickGroupMenu(group.id, TabGroupMenuAction.Update, {
                      collapsed: false,
                    });
                    onClose();
                  }}
                />
              ) : (
                <ActionMenuItem
                  icon={TbLayoutSidebarLeftCollapse}
                  title="Collapse"
                  onClick={() => {
                    handleClickGroupMenu(group.id, TabGroupMenuAction.Update, {
                      collapsed: true,
                    });
                    onClose();
                  }}
                />
              )}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex
        as={motion.div}
        direction="row"
        gap={0.5}
        overflow="hidden"
        initial={false}
        animate={{ width: collapsed ? 0 : "auto" }}
      >
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
    </Flex>
  );
}
