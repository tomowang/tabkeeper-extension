import Tab from "./Tab"

export default function TabGroup({tabs, group} : {tabs: chrome.tabs.Tab[], group: chrome.tabGroups.TabGroup}) {
  return(
    <div>
      <h1>TabGroup {group.title}</h1>
      <div>
      {tabs.map(tab => {
        return <Tab key={tab.id} tab={tab}></Tab>
      })}
      </div>
    </div>
  )
}
