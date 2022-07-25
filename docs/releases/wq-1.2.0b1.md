---
repo: wq
date: 2019-10-07
---

# wq 1.2 beta

**wq 1.2 beta** brings full support for using NPM to manage JavaScript dependencies (#44).  This builds on an overall [restructuring of wq.app](./wq.app-1.2.0a1.md) that also includes leveraging the [Redux ](https://redux.js.org/) ecosystem for the data layer.

See the submodule release notes for details:
- [wq.app 1.2 beta](./wq.app-1.2.0b1.md)
- [wq.core 1.2 beta](./wq.build-1.2.0b1.md)
- [wq.db 1.2 beta](./wq.db-1.2.0b1.md)
- [wq.start 1.2 beta](./wq.create-1.2.0b1.md)

The **wq.io** submodule has been renamed to [IterTable](https://django-data-wizard.wq.io/itertable/), a standalone data manipulation library.  The [IterTable 2.0 beta release notes](https://django-data-wizard.wq.io/releases/itertable-2.0.0b1) have more information on this name change.

> Note: This is the first release of wq to explicitly disable Python 2.7 support.  While individual submodules might still install on Python 2, this is not recommended or tested.  Python 2.7 will be EOL as of January 2020.
