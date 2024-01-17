---
module: "@wq/react"
purpose: forms
---

# AutoSubform

[@wq/react]'s `<AutoSubform/>` [component][index] generates a [`<Fieldset/>`][Fieldset] containing [`<AutoInput/>`][AutoInput]s for each of the fields in the specified group from the [form configuration][config]).  `<AutoSubform/>` is primarily used with [`<AutoForm/>`][AutoForm], and should never be overridden.  Instead, you can configure a custom [fieldset][fieldsets] and register it as the "appearance" for the group.

## Source

The source code for `<AutoSubform/>` is available here:

 * [AutoSubform.js (@wq/react)][react-src]

This component should not generally need to be overridden directly.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[AutoForm]: ./AutoForm.md
[AutoInput]: ./AutoInput.md
[Fieldset]: ../inputs/Fieldset.md
[config]: ../config.md
[fieldsets]: ../guides/organize-inputs-into-fieldsets.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/AutoSubform.js
