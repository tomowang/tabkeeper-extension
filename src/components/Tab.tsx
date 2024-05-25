export default function Tab({tab}: {tab: chrome.tabs.Tab}) {
  return <div title={tab.title} className={"border rounded flex items-center p-1" + (tab.active ? " border-blue-600" : "")}>
    <img src={tab.favIconUrl} className={"w-5 h-5" + (tab.status === "unloaded" ? " rounded-full border-2 border-slate-500 border-dashed" : "")} />
  </div>
}
