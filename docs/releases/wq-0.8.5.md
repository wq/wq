---
repo: wq
date: 2016-01-29
---

# wq 0.8.5

**wq 0.8.5** is the culmination of a number of improvements made to [wq.app](./wq.app-0.8.1.md), [wq.core](./wq.build-0.8.1.md), [wq.db](./wq.db-0.8.2.md), and [wq.start](./wq-django-template-0.8.3.md) since the release of [wq 0.8.0](./wq-0.8.0.md).  The wq 0.8.5 release is largely a formality, since installing any version of wq 0.8.x will automatically include the latest 0.8.x versions of each submodule.  However, wq 0.8.5 marks a significant milestone: it will be the last version of wq and its submodules before 1.0!

The submodule release notes describe the changes made in each since wq 0.8.0:
- [wq.app 0.8.1](./wq.app-0.8.1.md) introduced a new [plugin infrastructure](../@wq/app.md) and built-in `Leaflet.draw` editing, while 0.8.2 brought a number of improvements to the [wq/chart.js](https://django-rest-pandas.wq.io/@wq/chart) API.
- [wq.core 0.8.1](./wq.build-0.8.1.md) brought a minor bug fix. 
- [wq.db 0.8.2](./wq.db-0.8.2.md) brought a new `edit.geojson` backend for wq.app's editing tool, 0.8.3 marked the full integration of the chart module into [Django REST Pandas core](https://django-rest-pandas.wq.io), and 0.8.4 and 0.8.5 brought a number of minor bug fixes.
- [wq.start 0.8.3](./wq-django-template-0.8.3.md) brought a more useful default app and better integration with `./manage.py runserver`, while 0.8.2 and 0.8.4 brought minor fixes.

Work on wq 1.0 is already [well underway](https://github.com/wq/wq/issues/22), with a number of exciting changes in the works.  That said, if you are new to wq, we recommend sticking with version 0.8.5 and avoiding the `master` versions of each submodule until they are ready for release.
