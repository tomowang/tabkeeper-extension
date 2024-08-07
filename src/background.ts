import { IAutoGroupRule } from "./types";
import {
  EXTENSION_BADGE_COLOR,
  EXTENSION_BADGE_TEXT_COLOR,
  S_KEY_AUTO_GROUP_RULES,
} from "./utils/const";

chrome.runtime.onInstalled.addListener(() => {
  console.log("tabkeeper is installed");
  void onTabsUpdated();
});

async function onTabsUpdated() {
  const tabs = await chrome.tabs.query({});
  const length = tabs.length;
  let text = "";
  if (length > 0) {
    text = length.toString();
  }
  await chrome.action.setBadgeText({ text });
  await chrome.action.setBadgeTextColor({ color: EXTENSION_BADGE_TEXT_COLOR });
  await chrome.action.setBadgeBackgroundColor({ color: EXTENSION_BADGE_COLOR });
}

chrome.tabs.onCreated.addListener(() => {
  console.log("tab created");
  void onTabsUpdated();
});
chrome.tabs.onRemoved.addListener(() => {
  console.log("tab removed");
  void onTabsUpdated();
});

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

async function autoGroupTab(tab: chrome.tabs.Tab) {
  if (tab.id === undefined) return;
  const groups = await chrome.tabGroups.query({});
  const mapping: Record<string, number> = {};
  for (const group of groups) {
    if (group.title) mapping[group.title] = group.id;
  }
  if (!tab.url) return;
  const { autoGroupRules } = (await chrome.storage.local.get(
    S_KEY_AUTO_GROUP_RULES
  )) as {
    autoGroupRules: IAutoGroupRule[];
  };
  if (!autoGroupRules) return;
  for (const rule of autoGroupRules) {
    let regex: RegExp;
    const { title, color, enabled, mode, pattern } = rule;
    if (!enabled) continue;
    if (mode === "wildcard") {
      regex = new RegExp(pattern.split("*").map(escapeRegExp).join(".*"), "i");
    } else {
      regex = new RegExp(pattern, "i");
    }
    if (!regex.test(tab.url)) {
      continue;
    }
    let groupId = mapping[title];
    if (groupId !== undefined) {
      await chrome.tabs.group({ groupId, tabIds: [tab.id] });
    } else {
      groupId = await chrome.tabs.group({ tabIds: [tab.id] });
      await chrome.tabGroups.update(groupId, { title, color });
    }
    break;
  }
}

chrome.tabs.onUpdated.addListener(
  (_: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    // only apply when url is changed
    if (!changeInfo.url) return;
    chrome.windows.get(tab.windowId, (win) => {
      if (win.type === "normal") {
        void autoGroupTab(tab);
      }
    });
  }
);
