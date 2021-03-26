---
module: "@wq/map"
---

# Empty

@wq/map's `<Empty/>` [overlay component][overlay] defines a non-rendered layer that essentially is just to provide a toggle-able entry in the legend.  An empty layer can be used with a custom component somewhere else in the tree that calls [`useMapState()`][useMapState] and renders accordingly.

## Source

The default `Empty` implementation is just `null`, as defined in [`<AutoOverlay/>`][AutoOverlay].  If an explicit Empty component is registered it will be used instead.

[overlay]: ./index.md
[useMapState]: ../hooks/useMapState.md
[AutoOverlay]: ../components/AutoOverlay.md
