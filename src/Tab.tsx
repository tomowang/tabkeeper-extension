export default function Tab({tab}: {tab: chrome.tabs.Tab}) {
  return <div>
    {tab.title}
    {tab.url}
  </div>
}
