---
module: "@wq/map"
purpose: maps
---

# AutoOverlay

@wq/map's `<AutoOverlay/>` [component] selects the appropriate [overlay] component based on the [layer configuration][@wq/map].

## Source

The source code for `<AutoOverlay/>` is available here:

 * [AutoOverlay.js (@wq/map)][map-src]

The [@wq/map] implementation automatically determines which actual overlay to render, so there is no alternate [@wq/mapbox] or native version.

[component]: ./index.md
[overlay]: ../overlays/index.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md
[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/AutoOverlay.js
