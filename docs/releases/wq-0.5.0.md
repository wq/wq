---
repo: wq
date: 2014-02-09
---

# wq 0.5.0 "Charted Waters"

[wq](../index.md) 0.5.0, or the "Charted Waters" release, extends version [0.4.0](./wq-0.4.0.md) with a number of improved capabilities for managing and analyzing time series data.  This is exemplified most clearly in the improvements to [wq.app](../wq.app/index.md)'s [chart.js](https://github.com/wq/django-rest-pandas) and the addition of a corresponding [chart](https://github.com/wq/django-rest-pandas) module in [wq.db](../wq.db/index.md).  There are also a number of related enhancements to the organization and performance of [wq.db](../wq.db/index.md)'s [vera](https://github.com/powered-by-wq/vera) module.  See the submodule release notes for details:
- [wq.app 0.5.1](./wq.app-0.5.1.md)
- [wq.db 0.5.0](./wq.db-0.5.0.md)
- [wq.io 0.4.2](./itertable-0.4.2.md)
- [django-wq-template 0.5.0](https://github.com/wq/django-wq-template/releases/v0.5.0)

In addition, some functionality has been split out into separate general purpose Python modules:
- [Django REST Pandas](https://github.com/wq/django-rest-pandas) - A REST API for [Pandas](https://pandas.pydata.org) dataframes, which forms the basis of the new `chart` module
- [Swapper](https://github.com/wq/django-swappable-models) - A Django swappable models impementation extracted from `wq.db.patterns`
