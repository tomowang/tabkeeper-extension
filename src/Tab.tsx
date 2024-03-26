export default function Tab({tab}: {tab: chrome.tabs.Tab}) {
  return <div title={tab.title} className="border rounded">
    <img src={tab.favIconUrl} className="rounded-t w-8 h-8" />
  </div>
}
