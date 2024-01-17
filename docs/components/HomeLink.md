---
module: "@wq/material"
purpose: navigation
---

# HomeLink

[@wq/material]'s `<HomeLink/>` [component][index] displays a link to the index page with a "Home" icon.  It is only used in [`<Breadcrumbs/>`][Breadcrumbs] but is defined separately to make it easier to override.  `<HomeLink/>` is analogous to `<a href="/">` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [HomeLink.js (@wq/material-web)][material-web-src]
 * [HomeLink.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation is currently just a placeholder.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Breadcrumbs]: ./Breadcrumbs.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/HomeLink.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/HomeLink.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/HomeLink.js
