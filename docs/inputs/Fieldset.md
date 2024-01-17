---
module: "@wq/material"
purpose: forms
---

# Fieldset

[@wq/material]'s `<Fieldset/>` [input component][index] wraps a group of related fields (e.g. for an XLSForm "group").  Rather than overriding this component directly, it may be more useful to define [custom fieldsets for specific fields][fieldsets].  `<Fieldset/>` is usually used with [`<AutoSubform/>`][AutoSubform].  `<Fieldset/>` is analogous to `<fieldset>` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Fieldset.js (@wq/material-web)][material-web-src]
 * [Fieldset.js (@wq/material-native)][material-native-src]

> The @wq/material-native implementation simply renders its children.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[AutoSubform]: ../components/AutoSubform.md
[fieldsets]: ../guides/organize-inputs-into-fieldsets.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/Fieldset.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/inputs/Fieldset.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/inputs/Fieldset.js
