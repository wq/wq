---
repo: wq-django-template
date: 2017-04-05
---

# wq-django-template 1.0.0 RC1

**wq-django-template 1.0.0 RC1** brings a default PhoneGap Build configuration and various other improvements.

### PhoneGap / Cordova
 * `config.xml` and custom `index.html` for PhoneGap Build (#4, 65b49e6, 8ac0706)
 * Automatically generate various icon sizes & splash screens (#1, ee0bde6, 286b217, 6029c93)
 * JavaScript compatibility updates (0696ae5, ff62ca0)

### Other Improvements
 * Disable application cache by default (87606a6)
 * Support python3 venv by default (aed5473, 60eb459)
 * Rework pagination for common use cases (e089494, see wq/wq.app#47 and [Pagination and Caching](../config.md))
