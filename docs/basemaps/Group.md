---
module: "@wq/map"
---

# Group

@wq/map's `<Group/>` [basemap component][basemap] treats a group of related layers as a single basemap.  The configuration for the group should specify a `layers` array containing one or more basemap layer configurations.

## Source

The default `Group` implementation is just a `React.Fragment`, as defined in [`<AutoBasemap/>`][AutoBasemap].  If an explicit Group component is registered it will be used instead.

[basemap]: ./index.md
[AutoBasemap]: ../components/AutoBasemap.md
