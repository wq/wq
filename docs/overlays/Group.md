---
module: "@wq/map"
---

# Group

@wq/map's `<Group/>` [overlay component][overlay] treats a group of related layers as a single overlay.  The configuration for the group should specify a `layers` array containing one or more overlay configurations.

## Source

The default `Group` implementation is just a `React.Fragment`, as defined in [`<AutoOverlay/>`][AutoOverlay].  If an explicit Group component is registered it will be used instead.

[basemap]: ./index.md
[AutoOverlay]: ../components/AutoOverlay.md
