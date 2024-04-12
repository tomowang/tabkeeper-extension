const badgeColor = '#1B74E8'

chrome.runtime.onInstalled.addListener(() => {
  console.log('tabkeeper is installed');
  void onTabsUpdated()
});

async function onTabsUpdated() {
  const tabs = await chrome.tabs.query({})
  const length = tabs.length
  let text = '';
  if (length > 0) {
    text = length.toString()
  }
  await chrome.action.setBadgeText({ text })
  await chrome.action.setBadgeBackgroundColor({ color: badgeColor })
}

chrome.tabs.onCreated.addListener(() => {
  console.log('created')
  void onTabsUpdated()
})
chrome.tabs.onRemoved.addListener(() => {
  console.log('removed')
  void onTabsUpdated()
})
