## tabkeeper-extension

![GitHub Release](https://img.shields.io/github/v/release/tomowang/tabkeeper-extension)
![React](https://img.shields.io/badge/Made_with-React-blue)
![MIT license](https://img.shields.io/github/license/tomowang/tabkeeper-extension)
![GitHub Repo stars](https://img.shields.io/github/stars/tomowang/tabkeeper-extension)

[![Chrome Web Store](https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white)](https://chromewebstore.google.com/detail/tabkeeper-manages-tabs-an/difffcgldeegfdijdbjhnmchahphknch)
[![Microsoft Edge Addons](https://img.shields.io/badge/Microsoft_Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white)](https://microsoftedge.microsoft.com/addons/detail/tabkeeper-manages-tabs-/pkmemnbofihhbgeejnipajkjanjhjhkc)

Tabkeeper is a chrome/edge extension that helps you manage your tabs and tab groups.

![marquee](./store/promotional-marquee.png)

|             tab management              |               session box               |               auto group                |                 general                 |
| :-------------------------------------: | :-------------------------------------: | :-------------------------------------: | :-------------------------------------: |
| ![screenshot](./store/screenshot-1.png) | ![screenshot](./store/screenshot-2.png) | ![screenshot](./store/screenshot-3.png) | ![screenshot](./store/screenshot-4.png) |

Features:

-   Tabs and tab groups management
-   Save your tabs to session box and restore them later
-   Setup auto group rules that will group your tabs automatically

TODO

-   [ ] drag and drop for reordering/moving tabs
-   [ ] window operations: close, activate, minimize, etc.
-   [ ] performance optimization by debouncing
-   [ ] i18n

## Development

This project is created by command `pnpm create vite tabkeeper-extension`
with options `React` and `TypeScript`.

-   `pnpm install` to install dependencies
-   `pnpm dev` to start development server
-   Open <chrome://extensions> in chrome
-   Enable developer mode in chrome extension
-   Click `Load unpacked` and select `dist` folder

## License

[MIT](./LICENSE)

Logo fetched from [Tabs icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/tabs)
