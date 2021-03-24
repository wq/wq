---
wq_config:
  name: wq
  url: wq
  show_in_index: false
---

# wq package and wq.js

The wq metapackage can be installed via PyPI, npm, or CDN, though the purpose is slightly different in each case.

 - The [wq PyPI package] is just a placeholder with dependencies on [wq.app], [wq.build], [wq.create], and [wq.db].
 - The [wq npm package] has dependencies on [@wq/app], [@wq/material], and [@wq/mapbox], as well as a compiled wq.js containing all three libraries and their dependencies.

The primary purpose of including wq.js in the npm package is to facilitate CDN usage, i.e.. via `import wq from https://unpkg.com/wq`.

The [wq.app] PyPI package also contains a copy of wq.js.  The two versions are functionally equivalent, though built differently.  wq.app's wq.js is built directly from the packages/ directory in the repository, while wq's npm version is built from the released [@wq/app] on npm.

[wq PyPI package]: https://pypi.org/project/wq
[wq npm package]: https://npmjs.com/package/wq
[wq.app]: ./wq.app/index.md
[wq.build]: ./wq.build/index.md
[wq.create]: ./wq.create/index.md
[wq.db]: ./wq.db/index.md
[@wq/app]: ./@wq/app.md
[@wq/material]: ./@wq/material.md
[@wq/mapbox]: ./@wq/mapbox.md
