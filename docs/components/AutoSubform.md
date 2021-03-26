---
module: "@wq/react"
purpose: forms
---

# AutoSubform

@wq/react's `<AutoSubform/>` [component] generates a [`<Fieldset/>`][Fieldset] containing [`<AutoInput/>`][AutoInput]s for each of the fields in the specified group from the [form configuration][config]).  `<AutoSubform/>` is primarily used with [`<AutoForm/>`][AutoForm], and should never be overridden.  Instead, you can configure a custom [fieldset][fieldsets] and register it as the "appearance" for the group.

## Source

The source code for `<AutoSubform/>` is available here:

 * [AutoSubform.js (@wq/react)][react-src]

The [@wq/react] implementation automatically determines which actual components to render, so there is no alternate [@wq/material] or native version.

[component]: ./index.md
[Fieldset]: ./Fieldset.md
[AutoInput]: ./AutoInput.md
[AutoForm]: ./AutoForm.md
[config]: ../config.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md

[fieldsets]: ../guides/organize-inputs-into-fieldsets.md 

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/AutoSubform.js
