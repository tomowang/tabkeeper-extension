import Tab from "./Tab"

export default function TabGroup({tabs, group} : {tabs: chrome.tabs.Tab[], group: chrome.tabGroups.TabGroup}) {
  return(
    <div title={group.title} className={`flex flex-wrap gap-0.5 border-2 rounded shadow-sm p-0.5 color-${group.color}`}>
      {tabs.map(tab => {
        return <Tab key={tab.id} tab={tab}></Tab>
      })}
    </div>
  )
}
