---
module: "@wq/react"
purpose: tables
---

# PropertyTable

@wq/react's `<PropertyTable/>` [component] generates a [`<Table/>`][Table] with a row for each field in the [form configuration][config]  corresponding to the current [route][@wq/router].  `<PropertyTable/>` is primarily used with the [DefaultDetail] view, and can be overridden to customize that view.

## Source

The source code for `<PropertyTable/>` is available here:

 * [PropertyTable.js (@wq/react)][react-src]

The [@wq/react] implementation leverages [`useComponents()`][useComponents] to facilitate customization, so there is no alternate [@wq/material] or native version.

[component]: ./index.md
[Table]: ./Table.md
[config]: ../wq-configuration-object.md
[@wq/router]: ../@wq/router.md
[DefaultDetail]: ../views/DefaultDetail.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[useComponents]: ../hooks/useComponents.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/PropertyTable.js
