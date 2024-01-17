---
module: "@wq/material"
purpose: forms
---

# SubmitButton

[@wq/material]'s `<SubmitButton/>` [component][index] is a variant of [`<Button/>`][Button] with different default styling and integration with the wrapping [`<Form/>`][Form].  Use this component rather than `<Button type="submit">` to ensure native support.  `<SubmitButton/>` is analogous to `<button type="submit">` in HTML.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [SubmitButton.js (@wq/material-web)][material-web-src]
 * [SubmitButton.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[Button]: ./Button.md
[Form]: ./Form.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/SubmitButton.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/SubmitButton.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/SubmitButton.js
