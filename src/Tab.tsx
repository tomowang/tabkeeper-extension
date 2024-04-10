export default function Tab({tab, className = ''}: {tab: chrome.tabs.Tab, className?: string}) {
  return <div title={tab.title} className={`border rounded flex items-center ${className}`}>
    <img src={tab.favIconUrl} className="rounded-t w-8 h-8" />
  </div>
}
