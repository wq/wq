---
repo: wq-django-template
date: 2016-03-23
---

# wq.start 1.0 alpha

**wq.start 1.0.0a1** is an alpha release of the upcoming 1.0 version of [wq.start](../overview/setup.md).

Getting started with wq has traditionally been a bit of a learning curve, so we are working on making the a bit more friendly for new users.  The most significant change is [#18](https://github.com/wq/wq-django-template/issues/18), which brings a built-in tool to automatically generate usable Mustache templates for basic offline-capable data entry.  The new `wq maketemplates` command can automatically (re-)generate `*_list.html`, `*_detail.html`, and `*_edit.html`  templates for any models registered with `wq.db.rest`,  For convenience, `./deploy.sh` now calls this command by default.  The new `wq addform` can be used to convert an [XLSForm](https://xlsform.org) into a usable `models.py`, `rest.py`, and `serializers.py` in additon to the requisite mustache templates.

This release also brings compatibility with Django 1.9 ([#7](https://github.com/wq/wq-django-template/issues/7)) and the alpha versions of [wq.app](../wq.app/index.md) 1.0 and [wq.db](../wq.app/index.md) 1.0.
