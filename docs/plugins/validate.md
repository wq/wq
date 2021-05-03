# validate(values, modelConf)

The `validate()` [plugin type] is called whenever a [`Form`][Form] is submitted to [@wq/outbox].  The return value should be an object mapping field names to errors, as in the [validate Formik prop][validate-prop].

The main difference with the Formik prop is that multiple `validate()` plugins can be registered in the same app, and they all will be executed for every form instance.  To restrict validation to a specific form, inspect the second argument which is a [modelConf object][@wq/model].   You can either:
 - return errors only if `modelConf.name` matches the model you are validating, or
 - inspect `modelConf.form` to automatically generate errors based on the field definitions.

The second option is obviously more flexible, and can help ensure the plugin is reusable across applications.  However, it can be more complicated to implement, especially if you need to process [nested form] definitions.  See the [default implementation of `required` validation][validate-example] in @wq/react for a completely generic example.

> Note that there is obviously some overlap between custom validation and [custom input types][custom-input].  In general, `validate()`plugins should be used for validation intended to appear as a red error message below the input.  On the other hand, custom input types are more appropriate for validation that transforms the user's input as it is typed, or that changes the form layout based on what is entered.

[plugin type]: ./index.md
[@wq/outbox]: ../@wq/outbox.md
[@wq/model]: ../@wq/model.md
[Form]: ../components/Form.md
[nested form]: ../guides/implement-repeating-nested-forms.md
[custom-input]: ../guides/define-a-custom-input-type.md

[validate-example]: https://github.com/wq/wq.app/blob/main/packages/react/src/validate.js

[validate-prop]: https://formik.org/docs/guides/validation#validate
