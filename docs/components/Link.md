---
module: "@wq/material"
purpose: navigation
---

# Link

[@wq/material]'s `<Link/>` [component][index] facilitates navigation between [@wq/router] routes.  `<Link/>` is formatted as a hyperlink, even when navigating to other app screens.  In many cases, [`<ButtonLink/>`][ButtonLink] or [`<ListItemLink/>`][ListItemLink] may be more useful.  `<Link/>` should rarely be overridden.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Link.js (@wq/material-web)][material-web-src]
 * [Link.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[@wq/router]: ../@wq/router.md
[ButtonLink]: ./ButtonLink.md
[ListItemLink]: ./ListItemLink.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Link.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/Link.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/Link.js
