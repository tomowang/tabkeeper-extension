import {
  ITab,
  IWindow,
  TabGroupMenuAction,
  TabGroups,
  TabMenuAction,
} from "@/types";
import Tab from "./Tab";
import TabGroup from "./TabGroup";
import { Flex } from "@chakra-ui/react";

// https://developer.chrome.com/docs/extensions/reference/tabGroups/#property-TAB_GROUP_ID_NONE
const TAB_GROUP_ID_NONE = chrome.tabGroups.TAB_GROUP_ID_NONE;

interface WindowProps {
  win: IWindow;
  groups: TabGroups;
  handleClickTabMenu: (id: number | undefined, action: TabMenuAction) => void;
  handleClickGroupMenu: (
    id: number,
    action: TabGroupMenuAction,
    updateProperties?: chrome.tabGroups.UpdateProperties
  ) => void;
  handleTabMouseEvent: (tab: chrome.tabs.Tab | null) => void;
}

/**
 * Renders tabs and tab groups for a given window.
 *
 * @param {chrome.windows.Window} win - The window object to render tabs for
 * @param {TabGroups} groups - Object containing tab groups information
 * @return {JSX.Element} The rendered tabs and tab groups in a <div> element
 */
function Window({
  win,
  groups,
  handleClickTabMenu,
  handleClickGroupMenu,
  handleTabMouseEvent,
}: WindowProps) {
  let groupId: number = TAB_GROUP_ID_NONE;

  const tabs = [];
  let group: ITab[] = [];
  win.tkTabs.forEach((tab) => {
    if (tab.groupId !== groupId) {
      if (group.length > 0) {
        tabs.push(
          <TabGroup
            key={groupId}
            tabs={group}
            group={groups[groupId]}
            handleClickTabMenu={handleClickTabMenu}
            handleClickGroupMenu={handleClickGroupMenu}
            handleTabMouseEvent={handleTabMouseEvent}
          />
        );
        group = [];
      }
      if (tab.groupId === TAB_GROUP_ID_NONE) {
        tabs.push(
          <Tab
            key={tab.id}
            tab={tab}
            handleClickTabMenu={handleClickTabMenu}
            handleTabMouseEvent={handleTabMouseEvent}
          />
        );
      } else {
        group.push(tab);
      }
      groupId = tab.groupId;
    } else {
      if (tab.groupId === TAB_GROUP_ID_NONE) {
        tabs.push(
          <Tab
            key={tab.id}
            tab={tab}
            handleClickTabMenu={handleClickTabMenu}
            handleTabMouseEvent={handleTabMouseEvent}
          />
        );
      } else {
        group.push(tab);
      }
    }
  });
  if (group.length > 0) {
    tabs.push(
      <TabGroup
        key={groupId}
        tabs={group}
        group={groups[groupId]}
        handleClickTabMenu={handleClickTabMenu}
        handleClickGroupMenu={handleClickGroupMenu}
        handleTabMouseEvent={handleTabMouseEvent}
      />
    );
  }

  return (
    <Flex
      border={1}
      rounded="md"
      shadow="md"
      p={2}
      flexWrap="wrap"
      alignItems="center"
      gap={1}
    >
      {tabs}
    </Flex>
  );
}

export default Window;
