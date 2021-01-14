---
module: "@wq/react"
---

# useApp()

Returns the top level app object, which is exported by "@wq/app" and "./wq.js".

> Note that this hook is only meant to be used an escape hatch, when a more specific hook is not suitable.  Feel free to suggest new hooks that would allow you to reduce reliance on useApp().

```js
const wq = useApp();
wq.prefetchAll();
```
