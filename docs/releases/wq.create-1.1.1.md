---
repo: wq.start
date: 2019-01-11
---

# wq.start 1.1.1

Together with [wq-django-template v1.1.1](./wq-django-template-1.1.1.md), **wq.start 1.1.1** incorporates the ability to disable GeoDjango (`django.contrib.gis`) which makes it easier to get started without having GDAL installed (see wq/wq#34).

To use the new feature, upgrade `wq.start` and run:

```bash
wq start --without-gis myproject
```
