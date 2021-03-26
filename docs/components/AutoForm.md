---
module: "@wq/react"
purpose: forms
---

# AutoForm

@wq/react's `<AutoForm/>` [component] generates a [`<Form/>`][Form] containing [`<AutoInput/>`][AutoInput]s for each field in the [form configuration][config]  corresponding to the current [route][@wq/router].  `<AutoForm/>` is primarily used with the [DefaultEdit] view, and should almost never be overridden directly.  Instead, it usually makes more sense to configure custom [input types][custom-input], [fieldsets], and or [nested repeat groups][nested-forms] for the fields you want to customize.

## Source

The source code for `<AutoForm/>` is available here:

 * [AutoForm.js (@wq/react)][react-src]

The [@wq/react] implementation leverages [`useComponents()`][useComponents] and [`<AutoInput/>`][AutoInput]  to facilitate customization, so there is no alternate [@wq/material] or native version.

[component]: ./index.md
[Form]: ./Form.md
[AutoInput]: ./AutoInput.md
[config]: ../config.md
[@wq/router]: ../@wq/router.md
[DefaultEdit]: ../views/DefaultEdit.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[useComponents]: ../hooks/useComponents.md

[custom-input]: ../guides/define-a-custom-input-type.md
[fieldsets]: ../guides/organize-inputs-into-fieldsets.md 
[nested-forms]: ../guides/implement-repeating-nested-forms.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/AutoForm.js
