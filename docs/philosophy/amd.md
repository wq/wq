---
order: 6
deprecated: true
---

AMD
===

When wq was first created, there were a number of competing proposals for JavaScript module systems.  Now that the community is coalescing around ES6 modules (import/export syntax), it is time to migrate wq in that direction as well.  Specifically:

 * wq.app 1.1 and earlier are AMD-only (RequireJS)
 * wq.app 1.2 will still provide AMD modules, but support ES6 integration via npm
 * wq.app 1.3 will provide parallel AMD and ES6 options
 * wq.app 2.0 will only provide ES6 modules, but support AMD integration via npm
 
See [wq.app#111] for more information.

[wq.app#111]: https://github.com/wq/wq.app/issues/111
