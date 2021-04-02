---
repo: wq.db
date: 2018-06-12
---

# wq.db 1.1.0

**wq.db 1.1.0** brings support for Django 2.0 and Django REST Framework 3.8, while dropping support for Django <1.11 and DRF 3.6.

This release also removes a bunch of rarely used functionality to improve maintainability:

 * wq.db.patterns.annotate
 * wq.db.patterns.file
 * wq.db.patterns.locate
 * wq.db.patterns.mark
 * wq.db.patterns.relate
 * wq.db.contrib.search
 * social auth integration in [wq.db.rest.auth](../wq.db/auth.md)

Most of these use cases can be better served with domain-specific models using the newer [design patterns API](../guides/implement-repeating-nested-forms.md).  However, some may be recreated as standalone packages if needed.

In addition, Python 2.7 support is no longer tested.  It may still work for existing projects using Django 1.11.

This release fixes #71, #72, #73, #74, & #75, and makes #24, #40, & #63 obsolete.
