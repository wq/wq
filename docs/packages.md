---
wq_config:
  name: packages
  url: packages
  order: 30
  section: Packages
  icon_data: "M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z"
---

# Packages

wq is made up of the following submodules, which are distributed as separate PyPI packages.  Some have corresponding top-level npm packages as well.  (Also see the full list of [@wq npm packages][@wq].)

 Module                     | Github               | PyPI              | npm              | Description
----------------------------|----------------------|-------------------|------------------|---------
[![wq][wq.png]][wq/wq]      | [wq/wq][gh/wq]       | [wq][py/wq]       | [wq][npm/wq]     | Top level package (specifies submodules as dependencies)
[![wq.app][a.png]][wq/a]    | [wq/wq.app][gh/a]    | [wq.app][py/a]    | [@wq/app][npm/a] | A JavaScript+Python library for building robust offline-capable HTML5 data entry apps.
[![wq.build][b.png]][wq/b]  | [wq/wq.build][gh/b]  | [wq.build][py/b]  |                  | wq command line interface.
[![wq.create][c.png]][wq/c] | [wq/wq.create][gh/c] | [wq.create][py/c] |                  | Project template and scaffolding tools.
[![wq.db][d.png]][wq/d]     | [wq/wq.db][gh/d]     | [wq.db][py/d]     |                  | Django REST framework extension with design patterns for CRUD APIs.

[wq.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.png
[a.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.app.png
[b.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.build.png
[c.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.create.png
[d.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.db.png

[@wq]: ./@wq/index.md
[wq/wq]: ./wq.md
[wq/a]: ./wq.app.md
[wq/b]: ./wq.build/index.md
[wq/c]: ./wq.create/index.md
[wq/d]: ./wq.db/index.md

[gh/wq]: https://github.com/wq/wq
[gh/a]: https://github.com/wq/wq.app
[gh/b]: https://github.com/wq/wq.build
[gh/c]: https://github.com/wq/wq.create
[gh/d]: https://github.com/wq/wq.db

[py/wq]: https://pypi.org/project/wq
[py/a]: https://pypi.org/project/wq.app
[py/b]: https://pypi.org/project/wq.build
[py/c]: https://pypi.org/project/wq.create
[py/d]: https://pypi.org/project/wq.db

[npm/wq]: https://npmjs.com/package/wq
[npm/app]: https://npmjs.com/package/@wq/app
