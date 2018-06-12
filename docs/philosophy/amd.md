---
order: 6
deprecated: true
---

AMD
===

When wq was first created, there were a number of competing proposals for JavaScript module systems.  Now that the dust has settled, it is clear that the community is coalescing around ES6 modules (import/export syntax) as the most robust and future-proof solution.

For wq, the following applies:

 * wq.app 1.1 and earlier are AMD-only (RequireJS)
 * wq.app 2.0 and beyond will be implemented as ES6 modules, but potentially ship with an AMD option (see [#84])

[#84]: https://github.com/wq/wq.app/issues/84
