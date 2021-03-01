---
module: "@wq/material"
purpose: navigation
---

# HomeLink

[@wq/material]'s `<HomeLink/>` [component] displays a link to the index page with a "Home" icon.  It is only used in [`<Breadcrumbs/>`][Breadcrumbs] but is defined separately to make it easier to override.  `<HomeLink/>` is analogous to `<a href="/">` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [HomeLink.js (@wq/material)][material-src]
 * [HomeLink.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Breadcrumbs]: ./Breadcrumbs.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/HomeLink.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/HomeLink.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/HomeLink.native.js

