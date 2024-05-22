import { TabGroups } from '../type'
import Tab from './Tab'
import TabGroup from './TabGroup'

// https://developer.chrome.com/docs/extensions/reference/tabGroups/#property-TAB_GROUP_ID_NONE
// chrome.tabGroups.TAB_GROUP_ID_NONE
const TAB_GROUP_ID_NONE = -1

/**
 * Renders tabs and tab groups for a given window.
 *
 * @param {chrome.windows.Window} win - The window object to render tabs for
 * @param {TabGroups} groups - Object containing tab groups information
 * @return {JSX.Element} The rendered tabs and tab groups in a <div> element
 */
function Window({win, groups}: {win: chrome.windows.Window, groups: TabGroups}) {
  let groupId: number = TAB_GROUP_ID_NONE

  const tabs = [];
  let group: chrome.tabs.Tab[] = [];
  win.tabs?.forEach(tab => {
    if (tab.groupId !== groupId) {
      if (group.length > 0) {
        tabs.push(<TabGroup key={groupId} tabs={group} group={groups[groupId]}/>);
        group = [];
      }
      if (tab.groupId === TAB_GROUP_ID_NONE) {
        tabs.push(<Tab key={tab.id} tab={tab} className='p-0.5'></Tab>)
      } else {
        group.push(tab);
      }
      groupId = tab.groupId;
    } else {
      if (tab.groupId === TAB_GROUP_ID_NONE) {
        tabs.push(<Tab key={tab.id} tab={tab} className='p-0.5'></Tab>)
      } else {
        group.push(tab);
      }
    }
  });
  if (group.length > 0) {
    tabs.push(<TabGroup key={groupId} tabs={group} group={groups[groupId]}/>);
  }

  return <div className='border rounded-md shadow m-2 p-4 flex flex-wrap gap-0.5'>
    {tabs}
  </div>
}

export default Window
