---
repo: wq.db
date: 2014-07-08
---

# wq.db 0.6.1

This release provides additional improvements to wq.db 0.6.0, particularly to the `wq.db.contrib.dbio` submodule.
- made auto_import a fully async task
- serialize import exceptions with `str()`
- hooks to filter and modify identified metadata
- use timezone-aware now() for `Report.entered`
