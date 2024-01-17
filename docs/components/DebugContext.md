---
module: "@wq/react"
purpose: layout
---

# DebugContext

[@wq/react]'s `<DebugContext/>` [component][index] generates a [`<FormatJson/>`][FormatJson] with the content of the current [`useRenderContext()`][useRenderContext].  `<DebugContext/>` is primarily used with the [Default] view.  In general it makes more sense to explicitly [register a custom view][components-plugin] rather than override `<DebugContext/>`.

## Source

The source code for `<DebugContext/>` is available here:

 * [DebugContext.js (@wq/react)][react-src]

This component should not generally need to be overridden directly.

[index]: ./index.md
[@wq/react]: ../@wq/react.md
[Default]: ../views/Default.md
[FormatJson]: ./FormatJson.md
[components-plugin]: ../plugins/components.md
[useRenderContext]: ../hooks/useRenderContext.md
[react-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/components/DebugContext.js
