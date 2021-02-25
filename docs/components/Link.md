---
module: "@wq/material"
purpose: navigation
---

# Link

wq's `<Link/>` [component] facilitates navigation between [@wq/router] routes.  `<Link/>` is formatted as a hyperlink, even when navigating to other app screens.  In many cases, [`<ButtonLink/>`][ButtonLink] or [`<ListItemLink/>`][ListItemLink] may be more useful.  `<Link/>` should rarely be overridden.

## Source

The [@wq/react] source code for `<Link/>` is available here:

 * [Link.js (@wq/react)][react-src]

This base implementation is extended by [@wq/material] to integrate with [@material-ui/core] and [react-native-paper]:

 * [Link.js (@wq/material)][material-src]
 * [Link.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[inputs]: ../inputs/index.md
[ButtonLink]: ./ButtonLink.md
[ListItemLink]: ./ListItemLink.md
[@wq/router]: ../@wq/router.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md

[@material-ui/core]: https://material-ui.com/
[react-native-paper]: https://callstack.github.io/react-native-paper/

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Link.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/Link.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/Link.native.js
