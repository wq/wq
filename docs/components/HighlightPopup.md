---
module: "@wq/map-gl"
purpose: maps
---

# HighlightPopup

[@wq/map-gl]'s `<HighlightPopup/>` [component][index] is used to render information about the highlighted feature on the map.  @wq/map-gl's implementation automatically renders an in-map Popup on larger screens and a bottom Drawer on smaller screens.

## Source

While [@wq/map] defines a [placeholder implementation][map-src], [@wq/map-gl]'s version is more useful as reference:

 * [HighlightPopup.js (@wq/map-gl-web)][map-gl-web-src]

> There is currently no implementation of this component for @wq/map-gl-native.

[index]: ./index.md
[@wq/map]: ../@wq/map.md
[@wq/map-gl]: ../@wq/map-gl.md
[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/HighlightPopup.js
[map-gl-web-src]: https://github.com/wq/wq.app/blob/main/packages/map-gl-web/src/components/HighlightPopup.js
