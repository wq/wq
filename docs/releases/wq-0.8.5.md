---
repo: wq
date: 2016-01-29
---

# wq 0.8.5

**wq 0.8.5** is the culmination of a number of improvements made to [wq.app](https://github.com/wq/wq.app/releases), [wq.core](https://github.com/wq/wq.core/releases), [wq.db](https://github.com/wq/wq.db/releases), and [wq.start](https://github.com/wq/wq.start/releases) since the release of [wq 0.8.0](./wq-0.8.0.md).  The wq 0.8.5 release is largely a formality, since installing any version of wq 0.8.x will automatically include the latest 0.8.x versions of each submodule.  However, wq 0.8.5 marks a significant milestone: it will be the last version of wq and its submodules before 1.0!

The submodule release notes describe the changes made in each since wq 0.8.0:
- [wq.app](https://github.com/wq/wq.app/releases) 0.8.1 introduced a new [plugin infrastructure](https://wq.io/docs/app-js) and built-in `Leaflet.draw` editing, while 0.8.2 brought a number of improvements to the [wq/chart.js](https://wq.io/docs/chart-js) API.
- [wq.core](https://github.com/wq/wq.core/releases) 0.8.1 brought a minor bug fix. 
- [wq.db](https://github.com/wq/wq.db/releases) 0.8.2 brought a new `edit.geojson` backend for wq.app's editing tool, 0.8.3 marked the full integration of the chart module into [Django REST Pandas core](https://github.com/wq/django-rest-pandas), and 0.8.4 and 0.8.5 brought a number of minor bug fixes.
- [wq.start](https://github.com/wq/wq.start/releases) 0.8.3 brought a more useful default app and better integration with `./manage.py runserver`, while 0.8.2 and 0.8.4 brought minor fixes.

Work on wq 1.0 is already [well underway](https://github.com/wq/wq/issues/22), with a number of exciting changes in the works.  That said, if you are new to wq, we recommend sticking with version 0.8.5 and avoiding the `master` versions of each submodule until they are ready for release.
