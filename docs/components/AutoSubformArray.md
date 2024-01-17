---
module: "@wq/react"
purpose: forms
---

# AutoSubformArray

[@wq/react]'s `<AutoSubformArray/>` [component][index] generates a [`<FieldsetArray/>`][FieldsetArray] containing [`<AutoSubform/>`][AutoSubform]s for the specified repeat group from the [form configuration][config]).  `<AutoSubformArray/>` is primarily used with [`<AutoForm/>`][AutoForm], and should never be overridden.  Instead, you can configure a custom [fieldset array][nested-forms] and register it as the "appearance" for the repeat group.  If no custom fieldset array is registered, `<AutoSubformArray/>` will usually render the default [`<FieldsetArray/>`][FieldsetArray].  The one exception is if the repeat group only has a single file or photo field - in that case, [`<FileArray/>`][FileArray] will be rendered instead.

## Source

The source code for `<AutoSubformArray/>` is available here:

 * [AutoSubformArray.js (@wq/react)][react-src]

This component should not generally need to be overridden directly.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[AutoForm]: ./AutoForm.md
[AutoSubform]: ./AutoSubform.md
[FieldsetArray]: ../inputs/FieldsetArray.md
[FileArray]: ../inputs/FileArray.md
[config]: ../config.md
[nested-forms]: ../guides/implement-repeating-nested-forms.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/AutoSubformArray.js
