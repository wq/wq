---
module: "@wq/material"
purpose: layout
---

# App

wq's `<App/>` [component] renders the [`<Header/>`][Header], [`<Footer/>`][Footer], and the [view component][views] corresponding to the current [route][@wq/router].  As the primary integration point with the rest of [@wq/app], `<App/>` should rarely if ever be overridden.  Instead, it may make sense sense to override [`<Container/>`][Container].

## Source

The source code for `<App/>` is available here:

 * [App.js (@wq/react)][react-src]

This base implementation is extended by (not replaced) by both [@wq/react] and [@wq/material], to integrate with [@mui/material], [react-native], and [react-native-paper]:

 * [App.js (@wq/material-web)][material-web-src]
 * [App.native.js (@wq/react)][react-native-src]
 * [App.js (@wq/material-native)][material-native-src]

[component]: ./index.md
[Header]: ./Header.md
[Footer]: ./Footer.md
[Container]: ./Container.md
[views]: ../views/index.md
[@wq/router]: ../@wq/router.md
[@wq/app]: ../@wq/app.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md

[@mui/material]: https://mui.com/material-ui
[react-native]: https://reactnative.dev/
[react-native-paper]: https://callstack.github.io/react-native-paper/

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/App.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/App.js
[react-native-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/App.native.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/App.js
