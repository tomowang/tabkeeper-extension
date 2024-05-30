import { useState, useEffect } from 'react'
import Window from '@/components/Window'
import { TabGroups, TabMenuAction } from '@/types'

function TabKeeper() {
  const [wins, setWins] = useState<chrome.windows.Window[]>([])
  const [groups, setGroups] = useState<TabGroups>({})
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
    }
    await fetchData()
  }

  return (
    <>
      <div className='mx-auto flex flex-wrap gap-2'>
        {wins.map((win, index) => {
          // win.id may be undefined, use index for key
          return <Window key={index} win={win} groups={groups} handleClickTabMenu={
            (tabId: number | undefined, action: TabMenuAction) => void (async () => {
              await handleClickTabMenu(tabId, action)
            })()}/>
        })}
      </div>
    </>
  )
}

export default TabKeeper
