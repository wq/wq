---
module: "@wq/react"
purpose: forms
---

# Form

@wq/react's `<Form/>` [component] integrates [formik] with [@wq/outbox] (via [@wq/app]).  It is generally not necessary to override this component directly.  Instead, you may want to customize [`<FormRoot/>`][FormRoot].

> It is also possible to render `<Form/>` directly in a [custom view][components-plugin], with one or more [input components][inputs] as children.  That said, it is usually better to let [`<AutoForm/>`][AutoForm] generate the form layout automatically from the [wq configuration object][config].

## Source

The source code for `<Form/>` is available here:

 * [Form.js (@wq/react)][react-src]

The [@wq/react] implementation leverages [`useComponents()`][useComponents] to facilitate customization, so there is no alternate [@wq/material] or native version.

[component]: ./index.md
[formik]: https://formik.org
[@wq/outbox]: ../@wq/outbox.md
[@wq/app]: ../@wq/app.md
[FormRoot]: ./FormRoot.md
[inputs]: ../inputs/index.md
[AutoForm]: ./AutoForm.md
[config]: ../wq-configuration-object.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[useComponents]: ../hooks/useComponents.md
[components-plugin]: ../plugins/components.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Form.js
