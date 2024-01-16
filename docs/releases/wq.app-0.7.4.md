---
repo: wq.app
date: 2015-04-20
---

# wq.app 0.7.4

**wq.app 0.7.4** brings a couple of minor changes to [wq/app.js](../wq.app/index.md) for forward compatibility with [wq.db 0.8.0](./wq.db-0.8.0.md).  This version of wq.app is still compatible with wq.db 0.7.x.

Changes:
- Added `{{csrf_token}}` context variable in addition to existing `{{csrftoken}}` (the latter will be removed in wq.app 0.8.0).
- Added `{{@index}}` context variable to facilitate rendering inputs with array subscripts (see [wq/wq.db#33](https://github.com/wq/wq.db/issues/33))
