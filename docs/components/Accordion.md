---
module: "@wq/material"
purpose: lists
---

# Accordion

[@wq/material]'s `<Accordion/>` [component][index] implements expansion panels / accordions.  `<Accordion/>` supports `summary`, `children`, `open` and `onOpen` props, converting as needed for web and native libaries.  `<Accordion/>` is analogous to `<details>` in HTML.

> This component was named `ExpansionPanel` in earlier versions of wq.

## Source

While [@wq/react] defines a [placeholder implementation][react-src], [@wq/material]'s versions are more useful as reference:

 * [Accordion.js (@wq/material-web)][material-web-src]
 * [Accordion.js (@wq/material-native)][material-native-src]


[index]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/Accordion.js
[material-web-src]: https://github.com/wq/wq.app/blob/main/packages/material-web/src/components/Accordion.js
[material-native-src]: https://github.com/wq/wq.app/blob/main/packages/material-native/src/components/Accordion.js
