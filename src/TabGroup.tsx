import Tab from "./Tab"

export default function TabGroup({tabs, group} : {tabs: chrome.tabs.Tab[], group: chrome.tabGroups.TabGroup}) {
  return(
    <div title={group.title} className={"border-2 rounded shadow-sm p-1 color-" + group.color}>
      {tabs.map(tab => {
        return <Tab key={tab.id} tab={tab}></Tab>
      })}
    </div>
  )
}
