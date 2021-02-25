---
module: "@wq/react"
purpose: layout
---

# DebugContext

@wq/react's `<DebugContext/>` [component] generates a [`<FormatJson/>`][FormatJson] with the content of the current [`useRenderContext()`][useRenderContext].  `<DebugContext/>` is primarily used with the [Default] view.  In general it makes more sense to explicitly [register a custom view][components-plugin] rather than override `<DebugContext/>`.

## Source

The source code for `<DebugContext/>` is available here:

 * [DebugContext.js (@wq/react)][react-src]

The [@wq/react] implementation leverages [`useComponents()`][useComponents] to facilitate customization, so there is no alternate [@wq/material] or native version.

[component]: ./index.md
[FormatJson]: ./FormatJson.md
[useRenderContext]: ../hooks/useRenderContext.md
[Default]: ../views/Default.md
[components-plugin]: ../plugins/components.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[useComponents]: ../hooks/useComponents.md

[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/DebugContext.js
