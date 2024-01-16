---
repo: wq.app
date: 2023-08-25
---

# wq.app 2.0 alpha 2

**wq.app 2.0 alpha 2** is the second preview of the next version of wq.app, as part of the [wq 2.0 alpha 2](./wq-2.0.0a2.md) release.  This release improves the usage of [@mui](https://github.com/mui)/material imports in [**wq.js**](../wq.md), provides react-native-paper equivalents for all of @wq/material's [Input Types](../inputs/index.md), and updates maplibre-react-native support in [@wq/map-gl-native](../@wq/map-gl-native.md).

All changes by [@sheppard](https://github.com/sheppard).

### [@wq/material-web](../@wq/material-web.md) & [wq.js](../wq.md)
 * Update [**wq.js**](../wq.md) to export additional components from [@mui](https://github.com/mui)/material, including `ImageList` and `ToggleButtonGroup` ([`a12809f`](https://github.com/wq/wq.app/commit/a12809f))
    * As always, use `import { ImageList } from "[@mui](https://github.com/mui)/material"` in combination with [@wq/rollup-plugin](../@wq/rollup-plugin.md) to take advantage of these exports.  If you would like to import one of the remaining components not exported by **wq.js**, use the full path (e.g. `import Stack from "[@mui](https://github.com/mui)/material/Stack"`) to ensure the import is ignored by the @wq/rollup-plugin.
 * Fix tree shaking for mui-file-dropdown ([`d2aa481`](https://github.com/wq/wq.app/commit/d2aa481)).  This dependency was causing all of `import * "[@mui](https://github.com/mui)/material"` to be included in **wq.js** even though not everything was being used or re-exported.  Adjusting the import reduced the size of wq.js by over 50%.
 * Update **wq.js** to export [@mui](https://github.com/mui)/material/utils, including createSvgIcon ([`8feb269`](https://github.com/wq/wq.app/commit/8feb269)).  This facilitates using @wq/rollup-plugin with modules that import custom icons from [@mui](https://github.com/mui)/icons-material.  Only the unique icon data will be included in each built plugin file, rather than duplicating createSvgIcon since that is already included in wq.js.
 * Ensure data attributes from formik-mui are propagated correctly to options in [Select](../inputs/Select.md) ([`1beec6f`](https://github.com/wq/wq.app/commit/1beec6f), [`06fcbbb`](https://github.com/wq/wq.app/commit/06fcbbb))

### [@wq/material-native](../@wq/material-native.md)
 * Implement react-native-paper versions of [File](../inputs/File.md), [Toggle](../inputs/Toggle.md), and [Radio](../inputs/Radio.md) inputs ([`69c05a7`](https://github.com/wq/wq.app/commit/69c05a7))
 * Ensure all input types display hints and error messages as appropriate ([`69c05a7`](https://github.com/wq/wq.app/commit/69c05a7))
 * Implement side panel and tab components to improve mapping UI ([`69c05a7`](https://github.com/wq/wq.app/commit/69c05a7), [`7d69e39`](https://github.com/wq/wq.app/commit/7d69e39))

### [@wq/map-gl-web](../@wq/map-gl-web.md)
 * Use react-map-gl's Popup for highlighted features on larger screens, while preserving the panel-style popup for mobile ([`21f5966`](https://github.com/wq/wq.app/commit/21f5966)).

### [@wq/map-gl-native](../@wq/map-gl-native.md)
 * Switch from [@rnmapbox](https://github.com/rnmapbox)/maps to [@maplibre](https://github.com/maplibre)/maplibre-react-native ([`ee19186`](https://github.com/wq/wq.app/commit/ee19186))
 * Update map state hooks to match improvements to @wq/map-gl-web in wq.app v2.0.0a1 ([`0881093`](https://github.com/wq/wq.app/commit/0881093), [`69c05a7`](https://github.com/wq/wq.app/commit/69c05a7))
