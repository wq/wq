---
repo: wq-django-template
date: 2020-09-29
---

# wq-django-template 1.3 alpha

**wq-django-template 1.3 alpha** is a preview of the next version of wq-django-template, as part of the [wq.start 1.3 alpha](./wq.create-1.3.0a1.md) release.    The `app/` folder in particular has been completely reorganized ([`c68524f`](https://github.com/wq/wq-django-template/commit/c68524f)):

 - For `wq start --without-npm`, the RequireJS build has been replaced with ES modules that can be deployed with `./manage.py collectstatic` ([#6](https://github.com/wq/wq-django-template/issues/6), [#21](https://github.com/wq/wq-django-template/issues/21), and [wq/wq.app#111](https://github.com/wq/wq.app/issues/111))
 - For `wq start --with-npm`, the Create React App template has moved to [@wq/cra-template](../@wq/cra-template.md) in the wq.start repository.
 - The new [@wq/react](../@wq/react.md) + [@wq/material](../@wq/material.md) renderer is registered by default in both templates
 - Service workers are now supported, while PhoneGap Build and Application Cache support has been removed ([wq/wq.app#63](https://github.com/wq/wq.app/issues/63), [wq/wq.app#107](https://github.com/wq/wq.app/issues/107), [wq/wq.app#121](https://github.com/wq/wq.app/issues/121))
