import { ElementType } from "react";
import { ITab, TabMenuAction } from "@/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  Icon,
  Box,
  VStack,
  Image,
} from "@chakra-ui/react";
import {
  RiFocus3Line,
  RiCloseLine,
  RiUnpinLine,
  RiPushpinLine,
} from "react-icons/ri";
import { HiDuplicate } from "react-icons/hi";
import { PiMemory } from "react-icons/pi";
import { TbVolume, TbVolumeOff } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { TbHighlight, TbHighlightOff } from "react-icons/tb";

interface TabProps {
  tab: ITab;
  handleClickTabMenu: (id: number | undefined, action: TabMenuAction) => void;
  handleTabMouseEvent: (tab: chrome.tabs.Tab | null) => void;
}

export default function Tab({
  tab,
  handleClickTabMenu,
  handleTabMouseEvent,
}: TabProps) {
  let padding = 0.5;
  let imageClassName = "";
  let boxShadowValue = "";
  if (tab.status === "unloaded") {
    imageClassName = "rounded-full border-2 border-slate-500 border-dashed";
  }
  let img = (
    <Image src={tab.favIconUrl} w={5} h={5} className={imageClassName}></Image>
  );
  if (tab.tkFilter) {
    if (tab.tkMatched) {
      padding = 0;
      boxShadowValue = `inset 0 0 0 99999px ${tab.tkColor}`;
      img = (
        <Image
          src={tab.favIconUrl}
          w={6}
          h={6}
          className={imageClassName}
        ></Image>
      );
    } else {
      img = (
        <Image
          src={tab.favIconUrl}
          w={5}
          h={5}
          className={imageClassName}
          filter="auto"
          blur="1px"
        ></Image>
      );
    }
  }
  return (
    <Popover trigger="click" placement="bottom-start">
      <PopoverTrigger>
        <Flex
          borderWidth={1}
          borderRadius="base"
          alignItems="center"
          p={padding}
          cursor="pointer"
          borderColor={tab.active ? "blue.600" : ""}
          boxShadow={boxShadowValue}
          // onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Activate)}
          onMouseOver={() => handleTabMouseEvent(tab)}
        >
          {img}
        </Flex>
      </PopoverTrigger>
      <PopoverContent w="auto" _focusVisible={{ outline: "none" }}>
        <PopoverBody>
          <VStack as="ul" spacing={0.5} alignItems="start">
            {!tab.active && (
              <TabMenuItem
                icon={RiFocus3Line}
                title="Activate"
                onClick={() =>
                  handleClickTabMenu(tab.id, TabMenuAction.Activate)
                }
              />
            )}
            <TabMenuItem
              icon={IoMdRefresh}
              title="Reload"
              onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Reload)}
            />
            <TabMenuItem
              icon={RiCloseLine}
              title="Close"
              onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Close)}
            />
            <TabMenuItem
              icon={HiDuplicate}
              title="Duplicate"
              onClick={() =>
                handleClickTabMenu(tab.id, TabMenuAction.Duplicate)
              }
            />
            {!tab.active &&
              (tab.highlighted ? (
                <TabMenuItem
                  icon={TbHighlightOff}
                  title="Unhighlight"
                  onClick={() =>
                    handleClickTabMenu(tab.id, TabMenuAction.Unhighlight)
                  }
                />
              ) : (
                <TabMenuItem
                  icon={TbHighlight}
                  title="Highlight"
                  onClick={() =>
                    handleClickTabMenu(tab.id, TabMenuAction.Highlight)
                  }
                />
              ))}
            {tab.pinned ? (
              <TabMenuItem
                icon={RiUnpinLine}
                title="Unpin"
                onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Unpin)}
              />
            ) : (
              <TabMenuItem
                icon={RiPushpinLine}
                title="Pin"
                onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Pin)}
              />
            )}
            {tab.status !== "unloaded" && (
              <TabMenuItem
                icon={PiMemory}
                title="Unload"
                onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Unload)}
              />
            )}
            {tab.audible &&
              (tab.mutedInfo?.muted ? (
                <TabMenuItem
                  icon={TbVolume}
                  title="Unmute"
                  onClick={() =>
                    handleClickTabMenu(tab.id, TabMenuAction.Unmute)
                  }
                />
              ) : (
                <TabMenuItem
                  icon={TbVolumeOff}
                  title="Mute"
                  onClick={() => handleClickTabMenu(tab.id, TabMenuAction.Mute)}
                />
              ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

interface TabMenuItemProps {
  icon: ElementType;
  title: string;
  onClick: () => void;
}

function TabMenuItem({ icon, title, onClick }: TabMenuItemProps) {
  return (
    <Flex
      as="li"
      cursor="pointer"
      gap={2}
      _hover={{ color: "blue.500" }}
      onClick={onClick}
    >
      <Icon as={icon} w={6} h={6} />
      <Box as="span" lineHeight={6}>
        {title}
      </Box>
    </Flex>
  );
}
