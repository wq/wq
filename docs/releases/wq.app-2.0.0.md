---
repo: wq.app
date: 2023-11-02
---

# wq.app 2.0

**wq.app 2.0.0** is the first stable release of the wq.app 2.0 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 2.0](./wq-2.0.0.md) when upgrading.

This release updates the Material UI integration introduced in [wq.app 1.3](./wq.app-1.3.0.md), and also includes react-native compatible versions of all core components.  The old jQuery Mobile based renderer has been completely removed.

All changes by [@sheppard](https://github.com/sheppard).

## Changes since wq.app 2.0 alpha 2

### Breaking Changes
 * Custom fieldsets should now be registered like other `inputs`, rather than as generic `components` ([`18fa253`](https://github.com/wq/wq.app/commit/18fa253)).

### New Features
 * Support both v2 and v3 theme versions for react-native-paper.  Specify `theme.version` in your [@wq/material](../@wq/material.md) configuration to set the version used.  The default is 3, but you may want to set it to 2 if you are upgrading an existing react-native app from @wq/material 1.3.  ([`f3e823d`](https://github.com/wq/wq.app/commit/f3e823d))
 * To facilitate hot module reloading (like that provided with [Vite](https://vitejs.dev/)), there is a new [wq.dev.js](../wq.md) that includes the React development build ([`bc636a1`](https://github.com/wq/wq.app/commit/bc636a1))


### Bug Fixes & Enhancements
 * Improve `HighlightPopup` & `TabGroup` styles ([`48889d3`](https://github.com/wq/wq.app/commit/48889d3)) 
 * Fix `FileArray` state issue ([`71ff82f`](https://github.com/wq/wq.app/commit/71ff82f))
 * Improve memoization of `useRouteTitle()` and `useReverse()` ([`441caab`](https://github.com/wq/wq.app/commit/441caab),  [`265d8e2`](https://github.com/wq/wq.app/commit/265d8e2))
 * Improve object id lookup when applying delete through outbox ([`265d8e2`](https://github.com/wq/wq.app/commit/265d8e2))
 * Fix `Geo` & `Draw` state issues ([`441caab`](https://github.com/wq/wq.app/commit/441caab))
 * Fix type of default 404 template name ([`441caab`](https://github.com/wq/wq.app/commit/441caab))

##  Other changes since wq.app 1.3.0

### [Changes in Alpha](./wq.app-2.0.0a1.md)
  * Update third-party libraries to latest versions, following renames as needed
  * Remove @wq/jquery-mobile and @wq/leaflet
  * Split [@wq/material](../@wq/material.md) into separate @wq/material-web and @wq/material-native implementations.
  * Split [@wq/map-gl](../@wq/map-gl.md) into separate @wq/map-gl-web and @wq/map-gl-native implementations.
  * Replace MapBox with MapLibre
  * Introduce several new mapping and layout components
  * Improve data model
 
### [Changes in Alpha 2](./wq.app-2.0.0a2.md)
  * Reduce file size of [wq.js](../wq.md), while providing additional exports
  * Leverage in-map Popup on larger screens
  * Provide react-native equivalents of all input types
  * Update @wq/map-gl-native to use [@maplibre](https://github.com/maplibre)/maplibre-react-native and improve state management.
