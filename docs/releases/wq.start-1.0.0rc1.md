---
repo: wq.start
date: 2017-04-05
---

# wq.start 1.0.0 RC1

**wq.start 1.0.0 RC1** brings the [wq django template 1.0.0 RC1] and a number of other improvements.

### `wq start`

The `wq start` command now requires a domain name (via the `-d` flag).  This is used to generate the default Apache configuration, and is also reversed to create an application identifier for PhoneGap Build.  (The identifier can be overridden with the `-i` flag).  `wq start` now requires Django 1.10 or newer, though once an application is generated with `wq start` it can still be used with Django 1.8. (wq/wq-django-template#4, a40ee66)

### `wq addform`

`wq addform` now attempts to automatically add the generated app to `INSTALLED_APPS`, then run and apply the requisite migrations.  It is even possible to change the XLSForm, and then run `wq addform` again to update and migrate an existing model.  Confirmation will be requested before each dangerous action (unless `-f` is specified). (#3, e64ebf5, 29d8b08)

### Various Improvements
 * Ensure the HTML output of `wq maketemplates` and `wq addform` is  more or less the same (7a73670; see the release notes for [wq.db 1.0.0 RC1])
 * Avoid extra `.git` in PyPI package (#4)
 * List wq start version in generated settings.py

[wq django template 1.0.0 RC1]: ./wq-django-template-1.0.0rc1.md
[wq.db 1.0.0 RC1]: ./wq.db-1.0.0rc1.md