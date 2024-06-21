import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

const { version, author, description } = packageJson;
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest({
  manifest_version: 3,
  name: "TabKeeper - Manages Tabs and Tab Groups",
  short_name: "TabKeeper",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  description,
  permissions: ["storage", "tabs", "tabGroups"],
  author: `${author.name} <${author.email}>`,
  icons: {
    "16": "images/logo-16.png",
    "32": "images/logo-32.png",
    "128": "images/logo-128.png",
  },
  background: {
    service_worker: "src/background.ts",
  },
  action: {
    default_popup: "index.html#home",
  },
});
