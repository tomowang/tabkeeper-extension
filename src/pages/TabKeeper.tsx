import { useState, useEffect, useCallback } from "react";
import Window from "@/components/Window";
import {
  DuplicationInfo,
  ITab,
  IWindow,
  TabGroupMenuAction,
  TabGroups,
  TabMenuAction,
  ToolbarAction,
} from "@/types";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import ToolBar from "@/components/ToolBar";
import StatusBar from "@/components/StatusBar";
import { defaultdict } from "@/utils";
import { colorPalette } from "@/utils/const";

function TabKeeper() {
  const [wins, setWins] = useState<IWindow[]>([]);
  const [groups, setGroups] = useState<TabGroups>({});
  const [viewTab, setViewTab] = useState<chrome.tabs.Tab | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedTabs, setSelectedTabs] = useState<(number | undefined)[]>([]);
  const [showDuplications, setShowDuplications] = useState<boolean>(false);
  const [duplicationInfo, setDuplicationInfo] = useState<DuplicationInfo>({
    count: 0,
    totalCount: 0,
  });
  const fetchData = useCallback(
    async function () {
      const groups: TabGroups = {};
      const wins = await chrome.windows.getAll({
        populate: true, // populates tabs property
        windowTypes: ["normal"],
      });
      const tabGroups = await chrome.tabGroups.query({});
      tabGroups.forEach((group) => {
        groups[group.id] = group;
      });
      const selectedTabs: (number | undefined)[] = [];
      const tabUrlIDMapping = defaultdict(Array<number | undefined>);
      const tabUrlColorMapping = {} as Record<string, string>;
      wins.forEach((win) => {
        win.tabs?.forEach((tab) => {
          if (tab.url) tabUrlIDMapping[tab.url].push(tab.id);
        });
      });
      let duplicateCount = 0;
      let duplicateTotalCount = 0;
      for (const url in tabUrlIDMapping) {
        if (tabUrlIDMapping[url].length > 1) {
          const color = colorPalette[duplicateCount % colorPalette.length];
          duplicateCount += 1;
          duplicateTotalCount += tabUrlIDMapping[url].length;
          tabUrlColorMapping[url] = color;
        }
      }
      setDuplicationInfo({
        count: duplicateCount,
        totalCount: duplicateTotalCount,
      });
      const ws = wins.map((win) => {
        win.tabs?.forEach((tab) => {
          // TODO: use rules to apply favIconUrl and support Edge URLs
          if (tab.url?.startsWith("chrome://extensions/")) {
            tab.favIconUrl = "images/extension-icon.svg";
          } else if (
            tab.url?.startsWith("chrome://newtab") ??
            tab.url?.startsWith("chrome://new-tab-page") ??
            tab.url?.startsWith("chrome://whats-new/")
          ) {
            tab.favIconUrl = "images/browser-chrome-icon.svg";
          } else if (tab.url?.startsWith("chrome://bookmarks")) {
            tab.favIconUrl = "images/browser-bookmarks.svg";
          } else if (tab.url?.startsWith("chrome://version/")) {
            tab.favIconUrl = "images/google-chrome-icon.svg";
          } else if (tab.url?.startsWith("chrome://")) {
            tab.favIconUrl = "images/globe-line-icon.svg";
          }
        });
        const w: IWindow = { ...win, tkTabs: [] };
        if (win.tabs) {
          w.tkTabs = win.tabs?.map((tab) => {
            const t: ITab = {
              ...tab,
              ...{
                tkFilter: false,
                tkMatched: false,
                tkColor: "yellow",
              },
            };
            if (search) {
              t.tkFilter = true;
              const regex = new RegExp(search, "i");
              const title = tab.title?.toLowerCase();
              const url = tab.url?.toLowerCase();
              if (title?.match(regex) ?? url?.match(regex)) {
                t.tkMatched = true;
                selectedTabs.push(tab.id);
              }
            } else if (showDuplications) {
              t.tkFilter = true;
              if (tab.url && tabUrlColorMapping[tab.url]) {
                t.tkMatched = true;
                t.tkColor = tabUrlColorMapping[tab.url];
              }
            }
            return t;
          });
        }
        return w;
      });
      setWins(ws);
      setGroups(groups);
      setSelectedTabs(selectedTabs);
    },
    [search, showDuplications]
  );
  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  async function handleClickTabMenu(
    tabId: number | undefined,
    action: TabMenuAction
  ) {
    if (tabId === undefined) {
      // undefined if tab is not in a window
      return;
    }
    switch (action) {
      case TabMenuAction.Activate:
        await chrome.tabs.update(tabId, { active: true });
        break;
      case TabMenuAction.Reload:
        await chrome.tabs.reload(tabId);
        break;
      case TabMenuAction.Close:
        await chrome.tabs.remove(tabId);
        break;
      case TabMenuAction.Duplicate:
        await chrome.tabs.duplicate(tabId);
        break;
      case TabMenuAction.Highlight:
        await chrome.tabs.update(tabId, { highlighted: true });
        break;
      case TabMenuAction.Unhighlight:
        await chrome.tabs.update(tabId, { highlighted: false });
        break;
      case TabMenuAction.Pin:
        await chrome.tabs.update(tabId, { pinned: true });
        break;
      case TabMenuAction.Unpin:
        await chrome.tabs.update(tabId, { pinned: false });
        break;
      case TabMenuAction.Unload:
        await chrome.tabs.discard(tabId);
        break;
      case TabMenuAction.Mute:
        await chrome.tabs.update(tabId, { muted: true });
        break;
      case TabMenuAction.Unmute:
        await chrome.tabs.update(tabId, { muted: false });
        break;
    }
    await fetchData();
    try {
      // tab may have been closed by the time we get here
      setViewTab(await chrome.tabs.get(tabId));
    } catch (e) {
      console.error(e);
      setViewTab(null);
    }
  }

  async function handleClickGroupMenu(
    groupId: number,
    action: TabGroupMenuAction
  ) {
    switch (action) {
      case TabGroupMenuAction.Ungroup: {
        const tabs = await chrome.tabs.query({
          groupId: groupId,
        });
        const ids: number[] = tabs.flatMap((t) =>
          t.id !== undefined ? [t.id] : []
        );
        await chrome.tabs.ungroup(ids);
        break;
      }
      case TabGroupMenuAction.Collapse: {
        await chrome.tabGroups.update(groupId, {
          collapsed: true,
        });
        break;
      }
      case TabGroupMenuAction.Expand: {
        await chrome.tabGroups.update(groupId, {
          collapsed: false,
        });
        break;
      }
    }
    await fetchData();
  }

  async function handleToolbarAction(
    tabIds: (number | undefined)[],
    action: ToolbarAction
  ) {
    if (
      tabIds.length === 0 &&
      action !== ToolbarAction.HighlightDuplicates &&
      action !== ToolbarAction.Deduplicate
    ) {
      return;
    }
    const ids = tabIds.flatMap((t) => (t !== undefined ? [t] : []));
    switch (action) {
      case ToolbarAction.Close:
        await chrome.tabs.remove(ids);
        break;
      case ToolbarAction.Reload:
        await Promise.all(
          ids.map(async (id) => {
            await chrome.tabs.reload(id);
          })
        );
        break;
      case ToolbarAction.Unload:
        await Promise.all(
          ids.map(async (id) => {
            await chrome.tabs.discard(id);
          })
        );
        break;
      case ToolbarAction.Group:
        await chrome.tabs.group({ tabIds: ids });
        break;
      case ToolbarAction.Ungroup:
        await chrome.tabs.ungroup(ids);
        break;
      case ToolbarAction.Pin:
        await Promise.all(
          ids.map(async (id) => {
            await chrome.tabs.update(id, { pinned: true });
          })
        );
        break;
      case ToolbarAction.Unpin:
        await Promise.all(
          ids.map(async (id) => {
            await chrome.tabs.update(id, { pinned: false });
          })
        );
        break;
      case ToolbarAction.HighlightDuplicates:
        setShowDuplications((prev) => !prev);
        setSearch("");
        break;
      case ToolbarAction.Deduplicate:
        break;
    }
    await fetchData();
  }

  function handleTabMouseEvent(tab: chrome.tabs.Tab | null) {
    setViewTab(tab);
  }

  return (
    <Flex direction="column" h="full" gap={2}>
      <ToolBar
        search={search}
        setSearch={setSearch}
        selectedTabs={selectedTabs}
        showDuplications={showDuplications}
        duplicationInfo={duplicationInfo}
        handleToolbarAction={(
          tabIds: (number | undefined)[],
          action: ToolbarAction
        ) =>
          void (async () => {
            await handleToolbarAction(tabIds, action);
          })()
        }
      ></ToolBar>
      <Flex wrap="wrap" mx="auto" gap={2}>
        {wins.map((win, index) => {
          // win.id may be undefined, use index for key
          return (
            <Window
              key={index}
              win={win}
              groups={groups}
              handleClickTabMenu={(
                tabId: number | undefined,
                action: TabMenuAction
              ) =>
                void (async () => {
                  await handleClickTabMenu(tabId, action);
                })()
              }
              handleClickGroupMenu={(
                groupId: number,
                action: TabGroupMenuAction
              ) =>
                void (async () => {
                  await handleClickGroupMenu(groupId, action);
                })()
              }
              handleTabMouseEvent={handleTabMouseEvent}
            />
          );
        })}
      </Flex>
      <Spacer />
      <Box>
        <StatusBar
          search={search}
          selectedTabs={selectedTabs}
          duplicationInfo={duplicationInfo}
          tab={viewTab}
        />
      </Box>
    </Flex>
  );
}

export default TabKeeper;
