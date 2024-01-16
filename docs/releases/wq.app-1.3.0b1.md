---
repo: wq.app
date: 2021-05-03
---

# wq.app 1.3 beta

**wq.app 1.3.0b1** is the beta release of the next version of [wq.app], as part of the [wq 1.3 beta](./wq-1.3.0b1.md).  This release brings a number of bug fixes & improvements to the [@wq/react] + [@wq/material] renderer introduced in [wq.app 1.3 alpha](./wq.app-1.3.0a1.md).    Be sure to check out the new [documentation site](../index.md) which includes live demos of many of the components in @wq/material.

#### Breaking Change

While most of the changes below extend and enhance existing behavior, note that there is a backwards-incompatible change in [@wq/map](../@wq/map.md).  Map bounds coordinates must now be specified using the standard [lng, lat] order, rather than the Leaflet-style [lat, lng] supported in older versions of wq ([`b11bcd3`](https://github.com/wq/wq.app/commit/b11bcd3)).  If you are upgrading from wq.app 1.3.0a1 or older, you will need to update your `config.map.bounds` setting.  This applies even if you are using the legacy [@wq/jquery-mobile](https://github.com/wq/wq.app/tree/v1.3.0/packages/jquery-mobile) renderer.

## Core Modules

### [@wq/app]
 * Restore support for file uploads ([wq/wq#50](https://github.com/wq/wq/issues/50))
 * Option to keep spinner open while prefetching data ([#61](https://github.com/wq/wq.app/issues/61), [#103](https://github.com/wq/wq.app/issues/103))
 * Improve parsing of nested objects and arrays ([`0fcea4d`](https://github.com/wq/wq.app/commit/0fcea4d), [`001394b`](https://github.com/wq/wq.app/commit/001394b))
 * Support anonymous top-level fieldset ([`001394b`](https://github.com/wq/wq.app/commit/001394b))
 
### [@wq/model]
 * Respect Django's `[model].Meta.ordering` for locally cached records ([`b909674`](https://github.com/wq/wq.app/commit/b909674))
 * Make `fetchUpdate()` work with the regular [wq.db list API](../wq.db/url-structure.md) ([`ec252f0`](https://github.com/wq/wq.app/commit/ec252f0), [`92927ca`](https://github.com/wq/wq.app/commit/92927ca))

### [@wq/router]
 * Update `document.title` during render ([`e5626bd`](https://github.com/wq/wq.app/commit/e5626bd))

### [@wq/outbox]
 * Implement support for a new [validate() plugin type](../plugins/validate.md), replacing the old `config.outbox.validate` option ([`387c8d5`](https://github.com/wq/wq.app/commit/387c8d5))
 * Improve parsing of nested objects and arrays ([`0fcea4d`](https://github.com/wq/wq.app/commit/0fcea4d), [`5002ac9`](https://github.com/wq/wq.app/commit/5002ac9))

## UI Plugins

### [@wq/react]

#### Component Improvements
 * [Form](../components/Form.md)
    * Detect and apply `background_sync` from the page config ([`0cefab5`](https://github.com/wq/wq.app/commit/0cefab5))
    * Pass form values to custom `onSubmit()` ([`115f027`](https://github.com/wq/wq.app/commit/115f027))
 * [AutoSubformArray](../components/AutoSubformArray.md)
    * Allow overriding [Fieldset](../components/Fieldset.md) and [FieldsetArray](../components/FieldsetArray.md) via XLSForm appearance on the serializer ([`0fcea4d`](https://github.com/wq/wq.app/commit/0fcea4d))
    * Default to [FileArray](../components/FileArray.md) when rendering nested forms with a single file field ([`0d9b99c`](https://github.com/wq/wq.app/commit/0d9b99c))
    * Memoize generated FieldsetArray wrapper component ([`d646c2c`](https://github.com/wq/wq.app/commit/d646c2c))
    * Improve parsing of nested objects and arrays ([`001394b`](https://github.com/wq/wq.app/commit/001394b), [`ca7dcbe`](https://github.com/wq/wq.app/commit/ca7dcbe), [`5a1a282`](https://github.com/wq/wq.app/commit/5a1a282))
 * [Breadcrumbs](../components/Breadcrumbs.md)
    * Accept `links` as a prop, to make it easier to override while keeping the same UI.  ([`a3b1970`](https://github.com/wq/wq.app/commit/a3b1970))
 * [PropertyTable](../components/PropertyTable.md)
   * Support anonymous root fieldset ([`c5e6bc2`](https://github.com/wq/wq.app/commit/c5e6bc2))
 * Other
    * Implement `required` for all field types ([`540bfad`](https://github.com/wq/wq.app/commit/540bfad), [`5002ac9`](https://github.com/wq/wq.app/commit/5002ac9), [`3aed0c1`](https://github.com/wq/wq.app/commit/3aed0c1))
    * Make [Fab](../components/Fab.md) and [HorizontalView](../components/HorizontalView.md) pass through arbitrary props to the underlying component ([`73e24ee`](https://github.com/wq/wq.app/commit/73e24ee), [`ca7dcbe`](https://github.com/wq/wq.app/commit/ca7dcbe)).

#### New & Improved Hooks
 * [useConfig()](../hooks/useConfig.md) ([`09319d8`](https://github.com/wq/wq.app/commit/09319d8))
 * [useIcon()](../hooks/useIcon.md) ([`e476bd3`](https://github.com/wq/wq.app/commit/e476bd3))
 * [useOutbox()](../hooks/useOutbox.md) ([`ca7dcbe`](https://github.com/wq/wq.app/commit/ca7dcbe))
 * [useSitemap()](../hooks/useSitemap.md) ([`47ef7a1`](https://github.com/wq/wq.app/commit/47ef7a1))
 * [useSiteTitle()](../hooks/useSiteTitle.md) ([`09319d8`](https://github.com/wq/wq.app/commit/09319d8))
 * [usePluginReducer()](../hooks/usePluginReducer.md) ([`e476bd3`](https://github.com/wq/wq.app/commit/e476bd3))
 * [useRouteInfo()](../hooks/useRouteInfo.md): accept route name as argument ([`a3b1970`](https://github.com/wq/wq.app/commit/a3b1970b))

### [@wq/material]

#### Form Input Improvements
 * Implement clearable [File](../inputs/File.md) and [Image](../inputs/Image.md) inputs ([wq/wq#50](https://github.com/wq/wq/issues/50); [wq/wq.db#23](https://github.com/wq/wq.db/issues/23))
 * Fix date storage for [Date & Time inputs](../inputs/DateTime.md).  Entered data will be stored in the outbox as a timezone-less string (like the HTML5 `<input type=date>`), rather than the `Date()` object used by the underlying UI libraries. ([#127](https://github.com/wq/wq.app/issues/127))
 * In [Input](../inputs/Input.md) and [Checkbox](../inputs/Checkbox.md), ensure the correct HTML5 input type and maxlength where applicable ([`aedc746`](https://github.com/wq/wq.app/commit/aedc746), [`7bfef38`](https://github.com/wq/wq.app/commit/7bfef38), [`b909674`](https://github.com/wq/wq.app/commit/b909674))
 * Show helper text / hints for [Geo](../inputs/Geo.md) & [Select](../inputs/Select.md) inputs ([`e3de0e5`](https://github.com/wq/wq.app/commit/e3de0e5))

#### New & Improved Components
 * [ExpandableListItem](../components/ExpandableListItem.md) ([`e8ade36`](https://github.com/wq/wq.app/commit/e8ade36))
 * [FlatFieldset](../components/FlatFieldset.md) ([`540bfad`](https://github.com/wq/wq.app/commit/540bfad))
 * [FooterContent](../components/FooterContent.md) ([`2f11e52`](https://github.com/wq/wq.app/commit/2f11e52))
 * [HomeLink](../components/HomeLink.md) ([`fa65da4`](https://github.com/wq/wq.app/commit/fa65da4))
 * [ListItem](../components/ListItem.md): support `secondaryAction` prop ([`7cf9aaf`](https://github.com/wq/wq.app/commit/7cf9aaf))

## Map Plugins
### [@wq/map]
 * **Breaking change:** Change map bounds coordinates from the Leaflet-style [lat, lng] to the more standard [lng, lat] ([`b11bcd3`](https://github.com/wq/wq.app/commit/b11bcd3)).  If you are upgrading from wq.app 1.2 or older, you will need to update your `config.map.bounds` setting.
 * [StickyMap](../components/StickyMap.md) component to preserve map state when offscreen ([`0fd7177`](https://github.com/wq/wq.app/commit/0fd7177))
 * Additional tools for adding/removing highlighted features to map state ([`0fd7177`](https://github.com/wq/wq.app/commit/0fd7177))
 * Improve [Geo input component](../inputs/Geo.md):
     * Replace wq/locate.js plugin with built-in geolocation support ([#126](https://github.com/wq/wq.app/issues/126))
     * Ensure hints and field errors are shown ([`e3de0e5`](https://github.com/wq/wq.app/commit/e3de0e5))
     * Customizable help text for draw tools ([`540bfad`](https://github.com/wq/wq.app/commit/540bfad))
     * Option to render within a [FlatFieldset](../components/FlatFieldset.md) instead of the default [Fieldset](../components/Fieldset.md) (e.g. when already within a [nested form](../guides/implement-repeating-nested-forms.md))

### [@wq/map-gl]
 * Renamed from @wq/mapbox to @wq/map-gl to make it easier to switch out map libraries in the future ([#128](https://github.com/wq/wq.app/issues/128)).
 * Don't show trash tool if geometry field is required ([`540bfad`](https://github.com/wq/wq.app/commit/540bfad))
 * [Basemap "components"](../basemaps/index.md) now have an `asBasemapStyle()` function to facilitate the Map-level `style` prop while maintaining the logic within the component source.  ([`6f5f1c4`](https://github.com/wq/wq.app/commit/6f5f1c4))

## [wq.js bundle][wq]
 * Generate [LICENSES.md](https://github.com/wq/wq.app/blob/main/LICENSES.md) to document the vendored third-party modules in the build ([`da4f7d5`](https://github.com/wq/wq.app/commit/da4f7d5))
 * Re-export select third-party modules for integration with [@wq/rollup-plugin]
 * Preserve function names for components and hooks in minified build ([`d06b814`](https://github.com/wq/wq.app/commit/d06b814))
 * Improve compatibility with (modern) browsers ([`5363e07`](https://github.com/wq/wq.app/commit/5363e07))

## CLI Changes
As part of the [changes to the build system](./wq.app-1.3.0a1.md), the following commands are are deprecated.  They will be removed in wq.app 2.0, together with the entire `wq.app.build` source tree:
 * `wq appcache`
 * `wq babel`
 * `wq build`
 * `wq init`
 * `wq mustache`
 * `wq optimize`
 * `wq phonegap`
 * `wq scss`

The following commands are not deprecated, but the implementations have moved from `wq.app.build` to [wq.build](./wq.build-1.3.0b1.md) ([`3f773a1`](https://github.com/wq/wq.app/commit/3f773a1)).
 * [`wq collectjson`](../wq.build/collectjson.md)
 * [`wq icons`](../wq.build/icons.md)
 * [`wq serviceworker`](../wq.build/serviceworker.md)
 * [`wq setversion`](../wq.build/setversion.md)

The deprecated commands are not needed for newer projects, so the associated dependencies are are now optional ([`e6f279b`](https://github.com/wq/wq.app/commit/e6f279b)).  Use `pip install wq.app[compat]` if you have a fresh install of wq.app 1.3.0 and need to use the old commands.  (Users upgrading from an older version of wq.app should already have the required dependencies installed.)

[wq.app]: ../wq.app/index.md
[wq]: ../wq.md
[@wq/app]: ../@wq/app.md
[@wq/store]: ../@wq/store.md
[@wq/model]: ../@wq/model.md
[@wq/router]: ../@wq/router.md
[@wq/outbox]: ../@wq/outbox.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[@wq/rollup-plugin]: ../@wq/rollup-plugin.md
