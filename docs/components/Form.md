---
module: "@wq/react"
purpose: forms
---

# Form

[@wq/react]'s `<Form/>` [component][index] integrates [formik] with [@wq/outbox] (via [@wq/app]).  It is generally not necessary to override this component directly.  Instead, you may want to customize [`<FormRoot/>`][FormRoot].

> It is also possible to render `<Form/>` directly in a [custom view][components-plugin], with one or more [input components][inputs] as children.  That said, it is usually better to let [`<AutoForm/>`][AutoForm] generate the form layout automatically from the [wq configuration object][config].

## Source

The source code for `<Form/>` is available here:

 * [Form.js (@wq/react)][react-src]

This component should not generally need to be overridden directly.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/app]: ../@wq/app.md
[@wq/outbox]: ../@wq/outbox.md
[AutoForm]: ./AutoForm.md
[FormRoot]: ./FormRoot.md
[components-plugin]: ../plugins/components.md
[config]: ../config.md
[inputs]: ../inputs/index.md
[formik]: https://formik.org
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Form.js
