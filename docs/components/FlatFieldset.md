---
module: "@wq/material"
purpose: forms
---

# FlatFieldset

[@wq/material]'s `<FlatFieldset/>` [component] is an alternate [`Fieldset`][Fieldset] that can be used when a group of fields does not warrant another level of visual nesting.  For example, a [Geo input][Geo] that is already [nested within a parent fieldset][fieldsets] can be defined with `inset: false` to prevent an additional visual border around the fieldset.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [FlatFieldset.js (@wq/material)][material-src]
 * [FlatFieldset.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Fieldset]: ./Fieldset.md
[Geo]: ../inputs/Geo.md
[fieldsets]: ../guides/organize-inputs-into-fieldsets.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/FlatFieldset.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FlatFieldset.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/FlatFieldset.native.js
