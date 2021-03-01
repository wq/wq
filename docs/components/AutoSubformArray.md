---
module: "@wq/react"
purpose: forms
---

# AutoSubformArray

@wq/react's `<AutoSubformArray/>` [component] generates a [`<FieldsetArray/>`][FieldsetArray] containing [`<AutoSubform/>`][AutoSubform]s for the specified repeat group from the [form configuration][config]).  `<AutoSubformArray/>` is primarily used with [`<AutoForm/>`][AutoForm], and should never be overridden.  Instead, you can configure a custom [fieldset array][nested-forms] and register it as the "appearance" for the repeat group.  If no custom fieldset array is registered, `<AutoSubformArray/>` will usually render the default [`<FieldsetArray/>`][FieldsetArray].  The one exception is if the repeat group only has a single file or photo field - in that case, [`<FileArray/>`][FileArray] will be rendered instead.

## Source

The source code for `<AutoSubformArray/>` is available here:

 * [AutoSubformArray.js (@wq/react)][react-src]

The [@wq/react] implementation automatically determines which actual components to render, so there is no alternate [@wq/material] or native version.

[component]: ./index.md
[FieldsetArray]: ./FieldsetArray.md
[AutoSubform]: ./AutoSubform.md
[AutoForm]: ./AutoForm.md
[FileArray]: ./FileArray.md
[config]: ../wq-configuration-object.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md

[nested-forms]: ../guides/implement-repeating-nested-forms.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/AutoSubformArray.js
