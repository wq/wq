---
repo: wq.app
date: 2023-06-22
---

# wq.app 2.0 alpha

**wq.app 2.0 alpha** is a preview of the next version of wq.app, as part of the [wq 2.0 alpha](./wq-2.0.0a1.md) release.  The default interface has been upgraded to MUI v5 with MapLibre integration, and support for legacy jQuery Mobile & Leaflet projects has been completely removed.

All changes by [@sheppard](https://github.com/sheppard).

## Packaging & Ecosystem
A number of changes significantly improve integration with npm and other build tools, as well as Node itself.

 * All third-party packages have been updated to latest package versions.  In particular, `[@material-ui](https://github.com/material-ui)/core` (v4) has been upgraded to the latest `[@mui](https://github.com/mui)/material` (v5).  ([`9f9515c`](https://github.com/wq/wq.app/commit/9f9515c), [`b468228`](https://github.com/wq/wq.app/commit/b468228), [`28e79ce`](https://github.com/wq/wq.app/commit/28e79ce), [`4568600`](https://github.com/wq/wq.app/commit/4568600), [`6453db3`](https://github.com/wq/wq.app/commit/6453db3), [`84eb5b3`](https://github.com/wq/wq.app/commit/84eb5b3), [`2c635b4`](https://github.com/wq/wq.app/commit/2c635b4), [`79b28cf`](https://github.com/wq/wq.app/commit/79b28cf), [`2cd8832`](https://github.com/wq/wq.app/commit/2cd8832)).
 * All imports (including package-internal imports) are now ESM-compliant with `.js` extensions.  It is now possible to execute wq.app directly from Node. ([wq/wq#58](https://github.com/wq/wq/issues/58), [`34f07d9`](https://github.com/wq/wq.app/commit/34f07d9), [`c47b145`](https://github.com/wq/wq.app/commit/c47b145))
 * **@wq/material** has been split into separate implementation packages, **@wq/material-web** and **@wq/material-native**.  **@wq/material** automatically re-exports from **@wq/material-web** when running in e.g. Create React App, and from **@wq/material-native** when running in e.g. Expo.  This separation makes it possible to correctly specify the necessary dependencies for each implementation, while remaining compatible with the latest NPM package specifications.  Similarly, **@wq/map-gl** has been split into separate **@wq/map-gl-web** and **@wq/map-gl-native** packages; see below for details. ([wq/wq#59](https://github.com/wq/wq/issues/59), [`b21881a`](https://github.com/wq/wq.app/commit/b21881a), [`984d97a`](https://github.com/wq/wq.app/commit/984d97a)).

 * Support for wq 1.2-style AMD projects has been completely removed, as well as the **@wq/jquery-mobile** and **@wq/leaflet** npm packages.  These are maintained in the [1.3 branch](https://github.com/wq/wq.app/tree/1.3) if needed.  ([#111](https://github.com/wq/wq.app/issues/111), [`eb238c0`](https://github.com/wq/wq.app/commit/eb238c0), [`1bbbe37`](https://github.com/wq/wq.app/commit/1bbbe37), [`a6dc7bf`](https://github.com/wq/wq.app/commit/a6dc7bf), [`60cd668`](https://github.com/wq/wq.app/commit/60cd668))

 * Several improvements have been made to the wheel generation process.  ([`0225fc2`](https://github.com/wq/wq.app/commit/0225fc2), [`ad137bf`](https://github.com/wq/wq.app/commit/ad137bf), [`b2c946f`](https://github.com/wq/wq.app/commit/b2c946f))

### wq.js improvements

The pre-built [wq.js](../wq.md) script included in wq.app (and on npm) now exports several additional MUI components for use in plugins built with [@wq/rollup-plugin](../@wq/rollup-plugin.md).   Since these imports are processed at runtime, wq.js automatically warns if an export is not found ([`44ade26`](https://github.com/wq/wq.app/commit/44ade26), [`c39aa11`](https://github.com/wq/wq.app/commit/c39aa11), [`5f018b3`](https://github.com/wq/wq.app/commit/5f018b3)).
 
For example, @wq/rollup-plugin will transform this:
```javascript
import { FakeComponent } from "[@mui](https://github.com/mui)/material";
```
Into this:
```javascript
import { modules } from "./wq.js";
const { FakeComponent } = modules["[@mui](https://github.com/mui)/material"];
```

When this code is executed in the browser, wq.js will warn that it doesn't have that component (and return an empty component instead, to avoid completely breaking the UI.)  Note that some valid [@mui](https://github.com/mui)/material components are missing from wq.js and will return the same error - see [modules.js](https://github.com/wq/wq.app/blob/main/modules.js) for what's included.

Also note that the mapping engine is now shipped as a separate `.js` file and not baked into wq.js ([`31ad8b8`](https://github.com/wq/wq.app/commit/31ad8b8), see below).
 
### MapLibre Integration

Since MapBox is no longer open source, it has been replaced with MapLibre in the default wq.app configuration for both web and native ([#128](https://github.com/wq/wq.app/issues/128)).
 * **@wq/map-gl-web** now exports a `setEngine()` function that accepts the library object to use.  When installing **@wq/map-gl** and **@wq/map-gl-web** from npm, this must be called explicitly.  When installing wq.app from PyPI, the pre-built wq.js file already sets this to the output of `./maplibre-gl.js`, which is deployed in the same directory as wq.js ([`31ad8b8`](https://github.com/wq/wq.app/commit/31ad8b8), [`b468228`](https://github.com/wq/wq.app/commit/b468228)).
 * The React integration has been switched from react-mapbox-gl to react-map-gl.  The latter supports swapping the map engine for MapLibre, and also has built-in support for reusing map instances when components are replaced via navigation state changes.  The `StickyMap` component and associated offscreen component hacks have been removed in favor of this built-in support. ([`31ad8b8`](https://github.com/wq/wq.app/commit/31ad8b8), [`2cc0f40`](https://github.com/wq/wq.app/commit/2cc0f40), [`6215aa9`](https://github.com/wq/wq.app/commit/6215aa9)).
 * **@wq/map-gl-native** leverages **[@rnmapbox](https://github.com/rnmapbox)/maps**, which defaults to MapLibre Native by default.  See the [[@rnmapbox](https://github.com/rnmapbox)/maps documentation](https://github.com/rnmapbox/maps#supported-implementations) for information on how to override the default. ([`0deeb88`](https://github.com/wq/wq.app/commit/0deeb88))

## New & Updated Components

Several new components have been added to [the registry](../@wq/react.md) to provide a more complete UI out of the box.

### New Map Components

[AutoMap](../components/AutoMap.md) now supports displaying a MUI-styled toolbar with radio buttons for switching the basemap, switches for toggling overlay layers, and a simple legend for each overlay.  This support required the addition of several new component types, as shown below ([`0da45cd`](https://github.com/wq/wq.app/commit/0da45cd), [`361ea6c`](https://github.com/wq/wq.app/commit/361ea6c), [`c39aa11`](https://github.com/wq/wq.app/commit/c39aa11), [`2da4718`](https://github.com/wq/wq.app/commit/2da4718)).

Component | Description
--|--
[MapProvider](../components/MapProvider.md) | Top level component providing a context for referencing a nearby map object
[useMapInstance](../hooks/useMapInstance.md) | This hook existed before, but it now finds the map through the MapProvider context instead of the @wq/map redux state.
[MapLayers](../components/MapLayers.md) | Virtual node wrapping all `AutoBasemap` and `AutoOverlay` nodes.  The default is just a `Fragment`
[MapContainer](../components/MapContainer.md) | Layout node that contains both the `Map` component and the new `MapToolbar` [MapToolbar](../components/MapToolbar.md) | Basemap and overlay switcher built from the follwoing components. 
[SidePanel](../components/SidePanel.md) | Lightweight responsive drawer for embedding in e.g. map views.
[CheckboxButton](../components/CheckboxButton.md) | Checkbox for cases that don't require a [form input](../inputs/Checkbox.md)
[RadioButton](../components/RadioButton.md) | Radio button for cases that don't require a [form input](../inputs/Radio.md)
[Switch](../components/Switch.md) | Switch component
[Legend](../components/Legend.md) | Renders the legend for an individual overlay.  (Note that `MapToolbar` was named `Legend` in wq.app 1.3. ) 
[LegendIcon](../components/LegendIcon.md) | Legend Icon component

The conceptual component tree for a typical `AutoMap` layout is now as follows:

```jsx
<MapProvider>
  <AutoMap>
    <MapContainer>
      <MapToolbar>
        <BasemapToggle>
          <RadioButton />
        </BasemapToggle>
        <OverlayToggle>
          <Switch />
          <Legend>
            <LegendIcon />
          </Legend>
        </OverlayToggle>
      </MapToolbar>
      <Map>
        <MapInteraction />
        <MapAutoZoom />
        <MapIdentify />
        <MapLayers>
          <AutoBasemap>
            <Tile />
          </AutoBasemap>
          <AutoOverlay>
            <Geojson />
          </AutoOverlay>
        </MapLayers>
        <Highlight />
      </Map>
    </MapContainer>
  </AutoMap>
  <HighlightPopup />
</MapProvider>
```

These components can customized or disabled through [configuration](../config.md), through the [component registry](../components/index.md), and (in the case of `MapToolbar`) through props provided to `<AutoMap/>`.  Set `<AutoMap toolbar={<CustomToolbar/>} />`  to override the default, or `<AutoMap toolbar={false} />` to disable it. 

### New Layout Components

The default layout has been improved for both desktop and mobile devices, through the addition of a number of components.

Component | Description | Commit
--|--|--
[Logo](../components/Logo.md) | Site logo shown in app bar.  Set [config.logo](../config.md) to an image path, or [overrride the component](../plugins/components.md). | [`3a51fe7`](https://github.com/wq/wq.app/commit/3a51fe7)
[NavMenu](../views/NavMenu.md) | Responsive site navigation menu.  On small screens this will appear via [NavMenuPopup](../components/NavMenuPopup.md), while larger screens will use [NavMenuFixed](../components/NavMenuFixed.md).  `NavMenu` itself is registered as a [view component](../views/index.md) that is the same as [Index](../views/Index.md) by default but can be overridden. | [`d68754c`](https://github.com/wq/wq.app/commit/d68754c), [`7e9e157`](https://github.com/wq/wq.app/commit/7e9e157)
[TabGroup](../components/TabGroup.md) | Based on [@mui](https://github.com/mui)/materia's `Tabs`, but automatically renders the content for the selected tab.  Used in [@wq/map](../@wq/map.md)'s updated [DefaultList](../views/DefaultList.md) and [DefaultDetail](../views/DefaultDetail.md) to support a tabbed layout on small screens. | [`461add6`](https://github.com/wq/wq.app/commit/461add6)
[TabItem](../components/TabItem.md) | Based on [@mui](https://github.com/mui)/material's `Tab`, but with support for @wq/react's [icon registry](../icons.md). Accepts `children` which are conditionally rendered by `TabGroup` | [`461add6`](https://github.com/wq/wq.app/commit/461add6)
[BottomNavigation](../components/BottomNavigation.md) | [@mui](https://github.com/mui)/material's `BottomNavigation` | [`461add6`](https://github.com/wq/wq.app/commit/461add6)
[BottomNavigationAction](../components/BottomNavigationAction.md) | Based on [@mui](https://github.com/mui)/material's `BottomNavigationAction`, but with support for @wq/react's [icon registry](../icons.md). | [`461add6`](https://github.com/wq/wq.app/commit/461add6)
[TablePagination](../components/TablePagination.md) | [@mui](https://github.com/mui)/material's `TableNavigation` | [`cfd1993`](https://github.com/wq/wq.app/commit/cfd1993)
[TableContainer](../components/TableContainer.md) | [@mui](https://github.com/mui)/material's `TableContainer` | [`cfd1993`](https://github.com/wq/wq.app/commit/cfd1993)

### Updated Components

Component | Description | Commit
--|--|--
[Accordion](../components/Accordion.md) | Renamed from ExpansionPanel | [`9f9515c`](https://github.com/wq/wq.app/commit/9f9515c)
[PropertyTable](../components/PropertyTable.md) | Now renders nested fieldsets and arrays as sub-tables instead of JSON | [`d27b71d`](https://github.com/wq/wq.app/commit/d27b71d)
[OutboxList](../views/OutboxList.md) | Fix flex layout | [`7b1f09a`](https://github.com/wq/wq.app/commit/7b1f09a)
[IconButton](../components/IconButton.md) | Throw specific error if icon is missing, rather than waiting for React to fail | [`47cb370`](https://github.com/wq/wq.app/commit/47cb370)
[Select](../inputs/Select.md) | Improve formik-mui integration & also support native `<select>` | [`c39aa11`](https://github.com/wq/wq.app/commit/c39aa11), [`ffd813e`](https://github.com/wq/wq.app/commit/ffd813e), [`727231b`](https://github.com/wq/wq.app/commit/727231b)
[DateTime](../inputs/DateTime.md) | Remove custom date picker library in favor of `<input type="datetime-local">` | [`7b1f09a`](https://github.com/wq/wq.app/commit/7b1f09a), [`969f2fd`](https://github.com/wq/wq.app/commit/969f2fd)

## Data Model & Configration
 * Most foreign key logic has moved out of the legacy context generator into components and [@wq/model](../@wq/model.md) capabilities.  In particular, [ForeignKey](../inputs/ForeignKey.md) is now a separate input type that renders as `Select` after directly querying the ORM for available choices. ([#75](https://github.com/wq/wq.app/issues/75), [`ffd813e`](https://github.com/wq/wq.app/commit/ffd813e), [`b6d2877`](https://github.com/wq/wq.app/commit/b6d2877), [`a88f426`](https://github.com/wq/wq.app/commit/a88f426), [`8090833`](https://github.com/wq/wq.app/commit/8090833))
 * The mostly redundant `wq_config` object led to confusion, and has been removed ([wq/wq#54](https://github.com/wq/wq/issues/54), [`b453065`](https://github.com/wq/wq.app/commit/b453065))
 * Route templates (i.e. view components) can be specifed through configuration ([`d1c85ca`](https://github.com/wq/wq.app/commit/d1c85ca))
 * `page.defaults` now works for fields nested under fieldsets ([`49b1af2`](https://github.com/wq/wq.app/commit/49b1af2))
