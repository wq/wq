---
module: "@wq/material"
purpose: navigation
---

# Breadcrumbs

[@wq/material]'s `<Breadcrumbs/>` [component][index] uses the [useBreadcrumbs() hook][useBreadcrumbs] to provide link trail e.g. Home -> List -> Detail -> Edit.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Breadcrumbs.js (@wq/material-web)][material-web-src]
 * [Breadcrumbs.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation is currently just a placeholder.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[useBreadcrumbs]: ../hooks/useBreadcrumbs.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Breadcrumbs.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/Breadcrumbs.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/Breadcrumbs.js
