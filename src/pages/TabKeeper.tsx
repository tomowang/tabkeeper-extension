import { useState, useEffect } from 'react'
import Window from '@/components/Window'
import TabInfo from '@/components/TabInfo'
import { TabGroups, TabMenuAction } from '@/types'

function TabKeeper() {
  const [wins, setWins] = useState<chrome.windows.Window[]>([])
  const [groups, setGroups] = useState<TabGroups>({})
  const [viewTab, setViewTab] = useState<chrome.tabs.Tab|null>()
  const fetchData = async function() {
    const groups: TabGroups = {}
    const wins = await chrome.windows.getAll({
      populate: true, // populates tabs property
      windowTypes: ['normal'],
    });
    const tabGroups = await chrome.tabGroups.query({});
    tabGroups.forEach(group => {
      groups[group.id] = group;
    });
    wins.forEach(win => {
      win.tabs?.forEach(tab => {
        // TODO: use rules to apply favIconUrl and support Edge URLs
        if (tab.url?.startsWith('chrome://extensions/')) {
          tab.favIconUrl = "images/extension-icon.svg";
        } else if (tab.url?.startsWith('chrome://newtab') ?? tab.url?.startsWith('chrome://new-tab-page') ?? tab.url?.startsWith('chrome://whats-new/')) {
          tab.favIconUrl = "images/browser-chrome-icon.svg";
        } else if (tab.url?.startsWith('chrome://bookmarks')) {
          tab.favIconUrl = "images/browser-bookmarks.svg";
        } else if (tab.url?.startsWith('chrome://version/')) {
          tab.favIconUrl = "images/google-chrome-icon.svg";
        } else if (tab.url?.startsWith('chrome://')) {
          tab.favIconUrl = "images/globe-line-icon.svg";
        }
      })
    })
    setWins(wins)
    setGroups(groups)
  }
  useEffect(() => {
    fetchData().catch(console.error)
  }, [setWins, setGroups])

  async function handleClickTabMenu(tabId: number | undefined, action: TabMenuAction) {
    if (tabId === undefined) { // undefined if tab is not in a window
      return
    }
    switch (action) {
      case TabMenuAction.Activate:
        await chrome.tabs.update(tabId, { active: true } as chrome.tabs.UpdateProperties)
        break;
      case TabMenuAction.Reload:
        await chrome.tabs.reload(tabId)
        break;
      case TabMenuAction.Close:
        await chrome.tabs.remove(tabId)
        break;
      case TabMenuAction.Duplicate:
        await chrome.tabs.duplicate(tabId)
        break;
      case TabMenuAction.Highlight:
        await chrome.tabs.update(tabId, { highlighted: true } as chrome.tabs.UpdateProperties)
        break;
      case TabMenuAction.Unhighlight:
        await chrome.tabs.update(tabId, { highlighted: false } as chrome.tabs.UpdateProperties)
        break;
      case TabMenuAction.Pin:
        await chrome.tabs.update(tabId, { pinned: true } as chrome.tabs.UpdateProperties)
        break;
      case TabMenuAction.Unpin:
        await chrome.tabs.update(tabId, { pinned: false } as chrome.tabs.UpdateProperties)
        break;
      case TabMenuAction.Unload:
        await chrome.tabs.discard(tabId)
        break;
      case TabMenuAction.Mute:
        await chrome.tabs.update(tabId, { muted: true } as chrome.tabs.UpdateProperties)
        break;
      case TabMenuAction.Unmute:
        await chrome.tabs.update(tabId, { muted: false } as chrome.tabs.UpdateProperties)
        break;
    }
    await fetchData()
    try {
      // tab may have been closed by the time we get here
      setViewTab(await chrome.tabs.get(tabId))
    } catch (e) {
      console.error(e)
      setViewTab(null)
    }
  }

  function handleTabMouseEvent(tab: chrome.tabs.Tab|null) {
    setViewTab(tab);
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='mx-auto flex flex-wrap gap-2'>
        {wins.map((win, index) => {
          // win.id may be undefined, use index for key
          return <Window key={index} win={win} groups={groups} handleClickTabMenu={
            (tabId: number | undefined, action: TabMenuAction) => void (async () => {
              await handleClickTabMenu(tabId, action)
            })()}
            handleTabMouseEvent={handleTabMouseEvent}/>
        })}
      </div>
      <div className='grow'></div>
      {viewTab && <TabInfo tab={viewTab}/>}
    </div>
  )
}

export default TabKeeper
