import { useState, useEffect } from 'react'
import mock from './assets/mock.json'
import Window from './Window'
import { TabGroups } from './type'

function App() {
  const [wins, setWins] = useState<chrome.windows.Window[]>([])
  const [groups, setGroups] = useState<TabGroups>({})
  useEffect(() => {
    const fetchData = async function() {
      let wins: chrome.windows.Window[], tabGroups: chrome.tabGroups.TabGroup[];
      const groups: TabGroups = {}
      if (chrome?.windows) { // extension environment
        wins = await chrome.windows.getAll({
          populate: true, // populates tabs property
          windowTypes: ['normal'],
        });
        tabGroups = await chrome.tabGroups.query({});
      } else {
        ({wins, tabGroups} = mock as {wins: chrome.windows.Window[], tabGroups: chrome.tabGroups.TabGroup[]})
      }
      tabGroups.forEach(group => {
        groups[group.id] = group;
      });
      setWins(wins)
      setGroups(groups)
    }
    fetchData().catch(console.error)
  }, [setWins, setGroups])

  return (
    <>
      <div>
        {wins.map((win, index) => {
          // win.id may be undefined, use index for key
          return <Window key={index} win={win} groups={groups}/>
        })}
      </div>
    </>
  )
}

export default App
