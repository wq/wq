---
module: "@wq/material"
purpose: forms
---

# Fieldset

[@wq/material]'s `<Fieldset/>` [component] wraps a group of related fields (e.g. for an XLSForm "group").  Rather than overriding this component directly, it may be more useful to define [custom fieldsets for specific fields][fieldsets].  `<Fieldset/>` is usually used with [`<AutoSubform/>`][AutoSubform].  `<Fieldset/>` is analogous to `<fieldset>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Fieldset.js (@wq/material)][material-src]
 * [Fieldset.native.js (@wq/material)][material-native-src]

[component]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[fieldsets]: ../guides/organize-inputs-into-fieldsets.md
[AutoSubform]: ./AutoSubform.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Fieldset.js
[material-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/Fieldset.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material/src/components/Fieldset.native.js

