---
module: "@wq/map"
purpose: tables
---

# PropertyTable

[@wq/map]'s `<PropertyTable/>` [component][index] generates a [`<Table/>`][Table] with a row for each field in the [form configuration][config]  corresponding to the current [route][@wq/router].  `<PropertyTable/>` is primarily used with the [DefaultDetail] view, and can be overridden to customize that view.

## Source

[@wq/react] provides a default implementation that is overridden when using [@wq/map].

 * [PropertyTable.js (@wq/react)][react-src]
 * [PropertyTable.js (@wq/map)][map-src]



[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/map]: ../@wq/map.md
[@wq/router]: ../@wq/router.md
[DefaultDetail]: ../views/DefaultDetail.md
[Table]: ./Table.md
[config]: ../config.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/PropertyTable.js
[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/PropertyTable.js
