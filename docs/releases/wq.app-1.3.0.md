---
repo: wq.app
date: 2022-04-05
---

# wq.app 1.3

**wq.app 1.3.0** is the first stable release of the wq.app 1.3 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 1.3](./wq-1.3.0.md) when upgrading.

This release stabilizes the new UI introduced in [wq.app 1.3 alpha](./wq.app-1.3.0a1.md), with a particular focus on improving mapping & React Native/Expo support.

> Note: While wq.app's React Native / Expo support is already being used in production apps, not all components supported by wq.app's web build have working native equivalents.  Complete native support and documentation will be provided by wq.app 2.0.

All changes by [@sheppard](https://github.com/sheppard).

## Changes since wq.app 1.3 beta

[@wq/map](../@wq/map.md) & [@wq/map-gl](../@wq/map-gl.md)
  * Restore and improve identify/popup support ([`59d3884`](https://github.com/wq/wq.app/commit/59d3884))
  * Restore and improve autoZoom support ([#57](https://github.com/wq/wq.app/issues/57))
  * Improve support for [preserving map instances](../components/StickyMap.md) during route transitions ([`8519953`](https://github.com/wq/wq.app/commit/8519953), [`0b21dc3`](https://github.com/wq/wq.app/commit/0b21dc3), [`bd3a734`](https://github.com/wq/wq.app/commit/bd3a734), [`5c78516`](https://github.com/wq/wq.app/commit/5c78516), [`a524064`](https://github.com/wq/wq.app/commit/a524064))
  * Improve customization support for Geo tools ([`cdabda6`](https://github.com/wq/wq.app/commit/cdabda6), [`d848cec`](https://github.com/wq/wq.app/commit/d848cec), [`761d453`](https://github.com/wq/wq.app/commit/761d453), [`00d494e`](https://github.com/wq/wq.app/commit/00d494e))
  * Preserve overlay visibility state across application reloads ([`4215bf6`](https://github.com/wq/wq.app/commit/4215bf6))
  * Support custom zoom logic; remove bounds state ([`b2ea732`](https://github.com/wq/wq.app/commit/b2ea732))
  * Include components as named exports ([`6b54e18`](https://github.com/wq/wq.app/commit/6b54e18))
  * Improve backwards compatibility with Leaflet-based wq/map.js ([`29ec39b`](https://github.com/wq/wq.app/commit/29ec39b), [`ca1e4da`](https://github.com/wq/wq.app/commit/ca1e4da), [`550801a`](https://github.com/wq/wq.app/commit/550801a))

React Native / Expo Support
   * Improve basemap support ([`1fb706d`](https://github.com/wq/wq.app/commit/1fb706d), [`ef2be89`](https://github.com/wq/wq.app/commit/ef2be89))
   * Geopoint & Geolocation support ([`5dad061`](https://github.com/wq/wq.app/commit/5dad061), [`4bafaf0`](https://github.com/wq/wq.app/commit/4bafaf0), [`ef2be89`](https://github.com/wq/wq.app/commit/ef2be89))
   * Improve date handling ([`6639972`](https://github.com/wq/wq.app/commit/6639972), [`ef2be89`](https://github.com/wq/wq.app/commit/ef2be89))

[@wq/react](../@wq/react.md) & [@wq/material](../@wq/material.md)
  * Improve ability to customize form children and root element ([`3488e15`](https://github.com/wq/wq.app/commit/3488e15), [`2ab7757`](https://github.com/wq/wq.app/commit/2ab7757))
  * Default numeric fields to null ([`40d35a3`](https://github.com/wq/wq.app/commit/40d35a3))
  * Improve label handling for [Select](../inputs/Select.md) choices ([`f7c5f18`](https://github.com/wq/wq.app/commit/f7c5f18), [`130c883`](https://github.com/wq/wq.app/commit/130c883))
  * Increase maximum file size to 100MB in [File](../inputs/File.md) and [Image](../inputs/Image.md) ([`adb004e`](https://github.com/wq/wq.app/commit/adb004e))
  * Return outbox item to submitForm() ([`c810d65`](https://github.com/wq/wq.app/commit/c810d65))
 * Move component registry out of module config ([`756473f`](https://github.com/wq/wq.app/commit/756473f))
 * Make [`ExpandableListItem`](../components/ExpandableListItem.md) controllable ([`364e006`](https://github.com/wq/wq.app/commit/364e006))
 * Support choice, image, and file inputs in [`PropertyTable`](../components/PropertyTable.md) ([`2ec27cd`](https://github.com/wq/wq.app/commit/2ec27cd))

[@wq/model](../@wq/model.md) & [@wq/router](../@wq/router.md)
 - New `cache="autoupdate"` mode ([`bf502ce`](https://github.com/wq/wq.app/commit/bf502ce))
 - Skip prefetch if `cache="none"` ([`c948db1`](https://github.com/wq/wq.app/commit/c948db1))
 - Process limit parameter for [`Pagination`](../components/Pagination.md) ([`bbda61c`](https://github.com/wq/wq.app/commit/bbda61c))
 - Looser comparison for string numbers in filters ([`1378a1e`](https://github.com/wq/wq.app/commit/1378a1e))
 - Show synced items in main [`OutboxList`](../views/OutboxList.md) ([`c2585fd`](https://github.com/wq/wq.app/commit/c2585fd))
 - Handle empty variables during startup ([`1e24fac`](https://github.com/wq/wq.app/commit/1e24fac))

##  Other changes since wq.app 1.2.0

* [Changes in Alpha](./wq.app-1.3.0a1.md)
  * Replace AMD / RequireJS with ES Modules
  * Replace jQuery Mobile + Mustache with React + Material UI
  * Replace Leaflet with Mapbox GL
  * Replace Application Cache with Service Worker
  * Replace PhoneGap Build with Installable PWA and React Native + Expo
  * Maintain copies of deprecated libraries for compatibility with older projects (will remove in 2.0)
 
* [Changes in Alpha 2](./wq.app-1.3.0a2.md)
  - Fix authentication and sync issues in Alpha ([#124](https://github.com/wq/wq.app/issues/124), [#125](https://github.com/wq/wq.app/issues/125))
  - Improve [`Map`](../components/Map.md) ref handling in React Native
  - Improve support for deployment at non-root URL
  - Stand-alone [`PropertyTable`](../components/PropertyTable.md) component
 
* [Changes in Beta](./wq.app-1.3.0b1.md)
  * [@wq/map](../@wq/map.md) & [@wq/map-gl](../@wq/map-gl.md)
       - **Breaking change**: Change map bounds coordinates from the Leaflet-style [lat, lng] to the more standard [lng, lat]
       - Geolocation support tools for [Geo](../inputs/Geo.md) input ([#126](https://github.com/wq/wq.app/issues/126))
       - [StickyMap](../components/StickyMap.md) component to preserve map state when offscreen
       - Renamed @wq/mapbox to [@wq/map-gl](../@wq/map-gl.md) to make it easier to switch out map libraries in the future ([#128](https://github.com/wq/wq.app/issues/128)).
  * [@wq/react](../@wq/react.md) & [@wq/material](../@wq/material.md)
      - Restore and improve [`File`](../inputs/File.md) support ([wq/wq#50](https://github.com/wq/wq/issues/50), [wq/wq.db#23](https://github.com/wq/wq.db/issues/23))
      - Improve props handling for [Input](../inputs/Input.md), [Checkbox](../inputs/Checkbox.md), and [Select](../inputs/Select.md) inputs.
      - Improve internal representation of dates ([#127](https://github.com/wq/wq.app/issues/127)) and nested forms
      - Introduce new [`validate()`](../plugins/validate.md) plugin type
      - Support anonymous top-level [fieldset](../guides/organize-inputs-into-fieldsets.md)
      - Various new and improved React [components](../components/index.md) and [hooks](../hooks/index.md)
  * [@wq/model](../@wq/model.md) & [@wq/router](../@wq/router.md)
      - Replicate Django `ordering` for locally cached ORM records
      - Improve data loading spinner ([#61](https://github.com/wq/wq.app/issues/61), [#103](https://github.com/wq/wq.app/issues/103))
  * Build System
      - Make [**wq.js**](../wq.md) re-export various third party modules for use with [@wq/rollup-plugin](../@wq/rollup-plugin.md)
      - Deprecate several CLI commands that are no longer needed; move the remainder to [wq.build](../wq.build/index.md).
