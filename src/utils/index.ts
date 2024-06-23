import { IconType } from "react-icons";
import { FaChrome, FaEdge, FaFlask, FaGear } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoMdApps } from "react-icons/io";
import {
  IoEarth,
  IoExtensionPuzzle,
  IoExtensionPuzzleOutline,
  IoStar,
} from "react-icons/io5";
import { MdDownload, MdTab } from "react-icons/md";
import { PiSmileySad, PiWallet } from "react-icons/pi";
import { BiBuilding } from "react-icons/bi";
import { RiKeyLine } from "react-icons/ri";

export function defaultdict<T>(fn: () => T): Record<string, T> {
  return new Proxy({} as Record<string, T>, {
    get(target, key: string) {
      if (key in target) {
        return target[key];
      } else {
        return (target[key] = fn());
      }
    },
  });
}

/**
 * urls can be got from chrome://chrome-urls/ and edge://edge-urls/
 */
const urlMappingRules = [
  {
    regex: /^chrome:\/\/(new-tab-page|newtab|whats-new|version)/i,
    icon: FaChrome,
  },
  {
    regex: /^(chrome|edge):\/\/apps/i,
    icon: IoMdApps,
  },
  {
    regex: /^(chrome:\/\/bookmarks)|(edge:\/\/favorites)/i,
    icon: IoStar,
  },
  {
    regex: /^(chrome|edge):\/\/(components|extensions)/i,
    icon: IoExtensionPuzzle,
  },
  {
    regex: /^chrome-extension:\/\/.*/i,
    icon: IoExtensionPuzzleOutline,
  },
  {
    regex: /^chrome:\/\/crashes/i,
    icon: PiSmileySad,
  },
  {
    regex: /^(chrome|edge):\/\/downloads/i,
    icon: MdDownload,
  },
  {
    regex: /^(chrome|edge):\/\/flags/i,
    icon: FaFlask,
  },
  {
    regex: /^(chrome|edge):\/\/settings/i,
    icon: FaGear,
  },
  {
    regex: /^(chrome|edge):\/\/history/i,
    icon: FaHistory,
  },
  {
    regex: /^chrome:\/\/management/i,
    icon: BiBuilding,
  },
  {
    regex: /^chrome:\/\/password-manager/i,
    icon: RiKeyLine,
  },
  {
    regex: /^edge:\/\/newtab/i,
    icon: MdTab,
  },
  {
    regex: /^edge:\/\/version/i,
    icon: FaEdge,
  },
  {
    regex: /^edge:\/\/wallet/i,
    icon: PiWallet,
  },
  {
    regex: /^chrome:\/\/.*/i,
    icon: IoEarth,
  },
  {
    regex: /^edge:\/\/.*/i,
    icon: FaRegFile,
  },
];

export function genFaviconFromURL(
  url?: string,
  favicon?: string
): string | IconType {
  // use favicon if it's not a chrome url or chrome extension url
  const regex = /^(chrome|edge)(-extension)?:\/\/(.*)/i;
  if (favicon && !regex.test(favicon)) {
    return favicon;
  }
  if (!url) {
    return FaChrome; // TODO: adjust default icon for edge
  }
  for (const rule of urlMappingRules) {
    if (rule.regex.test(url)) {
      return rule.icon;
    }
  }
  return url;
}
