import { useState, useEffect } from 'react'
import Window from '@/components/Window'
import { TabGroups } from '@/type'

function TabKeeper() {
  const [wins, setWins] = useState<chrome.windows.Window[]>([])
  const [groups, setGroups] = useState<TabGroups>({})
  useEffect(() => {
    const fetchData = async function() {
      const groups: TabGroups = {}
      const wins = await chrome.windows.getAll({
        populate: true, // populates tabs property
        windowTypes: ['normal'],
      });
      console.log(wins);
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
    fetchData().catch(console.error)
  }, [setWins, setGroups])

  return (
    <>
      <div className='mx-auto flex flex-wrap gap-2'>
        {wins.map((win, index) => {
          // win.id may be undefined, use index for key
          return <Window key={index} win={win} groups={groups}/>
        })}
      </div>
    </>
  )
}

export default TabKeeper