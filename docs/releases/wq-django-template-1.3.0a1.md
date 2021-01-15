---
repo: wq-django-template
date: 2020-09-29
tag: next
tag_color: secondary
---

# wq-django-template 1.3 alpha

**wq-django-template 1.3 alpha** is a preview of the next version of wq-django-template, as part of the [wq.start 1.3 alpha](./wq.start-1.3.0a1.md) release.    The `app/` folder in particular has been completely reorganized (c68524f):

 - For `wq start --without-npm`, the RequireJS build has been replaced with ES modules that can be deployed with `./manage.py collectstatic` (#6, #21, and wq/wq.app#111)
 - For `wq start --with-npm`, the Create React App template has moved to [@wq/cra-template](https://github.com/wq/wq.start/tree/master/packages/cra-template) in the wq.start repository.
 - The new [@wq/react](https://github.com/wq/wq.app/tree/master/packages/react) + [@wq/material](https://github.com/wq/wq.app/tree/master/packages/material) renderer is registered by default in both templates
 - Service workers are now supported, while PhoneGap Build and Application Cache support has been removed (wq/wq.app#63, wq/wq.app#107, wq/wq.app#121)