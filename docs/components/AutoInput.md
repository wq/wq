---
module: "@wq/react"
purpose: forms
---

# AutoInput

[@wq/react]'s `<AutoInput/>` [component][index] selects the appropriate [input component][inputs] based on the provided props, which are passed from the [form configuration][config]).  `<AutoInput/>` is primarily used with [`<AutoForm/>`][AutoForm], and should never be overridden.  Instead, you can configure custom [input types][custom-input], [fieldsets], and or [nested repeat groups][nested-forms] for the fields you want to customize.

## Source

The source code for `<AutoInput/>` is available here:

 * [AutoInput.js (@wq/react)][react-src]

This component should not generally need to be overridden directly.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[AutoForm]: ./AutoForm.md
[config]: ../config.md
[custom-input]: ../guides/define-a-custom-input-type.md
[fieldsets]: ../guides/organize-inputs-into-fieldsets.md
[inputs]: ../inputs/index.md
[nested-forms]: ../guides/implement-repeating-nested-forms.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/AutoInput.js
