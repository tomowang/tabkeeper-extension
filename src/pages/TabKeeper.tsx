import { useState, useEffect, useCallback } from 'react'
import Window from '@/components/Window'
import { ITab, IWindow, TabGroups, TabMenuAction } from '@/types'
import { Box, Flex, Spacer } from '@chakra-ui/react'
import ToolBar from '@/components/ToolBar'
import StatusBar from '@/components/StatusBar'

function TabKeeper() {
  const [wins, setWins] = useState<IWindow[]>([])
  const [groups, setGroups] = useState<TabGroups>({})
  const [viewTab, setViewTab] = useState<chrome.tabs.Tab|null>(null)
  const [search, setSearch] = useState<string>('')
  const [matchedSearch, setMatchedSearch] = useState<(number | undefined)[]>([])
  const fetchData = useCallback(async function() {
    const groups: TabGroups = {}
    const wins = await chrome.windows.getAll({
      populate: true, // populates tabs property
      windowTypes: ['normal'],
    });
    const tabGroups = await chrome.tabGroups.query({});
    tabGroups.forEach(group => {
      groups[group.id] = group;
    });
    const matchedSearch: (number | undefined)[] = [];
    const ws = wins.map(win => {
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
      const w: IWindow = {...win, tkTabs: []}
      if (win.tabs) {
        w.tkTabs = win.tabs?.map(tab => {
          const t: ITab = {...tab, ...{
            tkFilter: !!search,
            tkMatched: false,
            tkColor: 'yellow',
          }}
          if (search) {
            const regex = new RegExp(search, 'i')
            const title = tab.title?.toLowerCase()
            const url = tab.url?.toLowerCase()
            if (title?.match(regex) ?? url?.match(regex)) {
              t.tkMatched = true
              matchedSearch.push(tab.id)
            }
          }
          return t
        })
      }
      return w
    })
    setWins(ws)
    setGroups(groups)
    setMatchedSearch(matchedSearch)
  }, [search])
  useEffect(() => {
    fetchData().catch(console.error)
  }, [fetchData])

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
    <Flex direction='column' h='full' gap={2}>
      <ToolBar search={search} setSearch={setSearch}></ToolBar>
      <Flex wrap='wrap' mx='auto' gap={2}>
        {wins.map((win, index) => {
          // win.id may be undefined, use index for key
          return <Window key={index} win={win} groups={groups} handleClickTabMenu={
            (tabId: number | undefined, action: TabMenuAction) => void (async () => {
              await handleClickTabMenu(tabId, action)
            })()}
            handleTabMouseEvent={handleTabMouseEvent}/>
        })}
      </Flex>
      <Spacer/>
      <Box>
        <StatusBar search={search} matchedSearch={matchedSearch} tab={viewTab}/>
      </Box>
    </Flex>
  )
}

export default TabKeeper
