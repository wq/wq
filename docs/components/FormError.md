---
module: "@wq/material"
purpose: forms
---

# FormError

wq's `<FormError/>` [component] displays any top-level form errors.  (Field-level errors are displayed within each [input component][inputs]).  It is generally not necessary to override `<FormError/>`.

## Source

The [@wq/react] source code for `<FormError/>` is available here:

 * [FormError.js (@wq/react)][react-src]

This base implementation is extended by [@wq/material] to integrate with [@material-ui/core] and [react-native-paper]:

 * [FormError.js (@wq/material)][material-src]
 * [FormError.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[inputs]: ../inputs/index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md

[@material-ui/core]: https://material-ui.com/
[react-native-paper]: https://callstack.github.io/react-native-paper/

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/FormError.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FormError.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FormError.native.js
