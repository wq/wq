---
repo: xlsform-converter
date: 2016-08-26
---

# xlsconv 0.2.0

**xlsconv 0.2.0** brings a couple of new features:
- Support for non-repeat, nested groups
- Integrated a number of additional default templates from [wq.start](../wq.create/index.md):

#### Django App Templates
- `models.py` (existed in 0.1.0)
- `rest.py` (for use with [`wq.db.rest`](../wq.db/rest.md))
- `admin.py` (for use with [`django.contrib.admin`](https://docs.djangoproject.com/en/1.10/ref/contrib/admin/))
- `serializers.py` (for use with `wq.db.rest`)

#### Mustache Templates (for use with [wq](https://github.com/sheppard/django-mustache))
- `edit.html` (replaces `form.html` from 0.1.0)
- `detail.html`
- `list.html`
- `popup.html` (for use with [wq/map.js](../@wq/map.md))
