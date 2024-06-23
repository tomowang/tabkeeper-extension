import { ElementType, ReactNode } from "react";

export type TabGroups = Record<number, chrome.tabGroups.TabGroup>;

export interface DuplicationInfo {
  count: number;
  totalCount: number;
  tabUrlIDMapping: Record<string, number[]>;
}

export interface IWindow extends chrome.windows.Window {
  tkTabs: ITab[];
}

export interface ITab extends chrome.tabs.Tab {
  tkFilter: boolean; // filter mode or not
  tkMatched: boolean; // matched or not
  tkColor: string; // highlight color when matched
}

export interface IMenu {
  path: string;
  title: string;
  icon: ElementType;
  element: ReactNode;
}

export enum TabMenuAction {
  Activate,
  Reload,
  Close,
  Duplicate,
  Mute,
  Unmute,
  Pin,
  Unpin,
  Highlight,
  Unhighlight,
  Unload,
}

export enum TabGroupMenuAction {
  Ungroup,
  Update,
}

export enum ToolbarAction {
  Reload,
  Close,
  Unload,
  Group,
  Ungroup,
  Deduplicate,
  HighlightDuplicates,
  Pin,
  Unpin,
  SaveSession,
}

export interface IAutoGroupRule {
  title: string;
  color: chrome.tabGroups.ColorEnum;
  mode: "wildcard" | "regex";
  enabled: boolean;
  pattern: string;
}

export interface ISessionBoxItem {
  title: string;
  urls: string[];
}
