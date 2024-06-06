import { ElementType, ReactNode } from "react"

export type TabGroups = Record<number, chrome.tabGroups.TabGroup>

export interface IMenu {
  path: string
  title: string
  icon: ElementType
  element: ReactNode
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
