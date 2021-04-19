---
permalink: /wq.db/
title: wq.db (REST API)
wq_config:
  name: wqdb
  url: wq.db
  order: 22
  section: API Reference
  icon_data: "M6,20A6,6 0 0,1 0,14C0,10.91 2.34,8.36 5.35,8.04C6.6,5.64 9.11,4 12,4C15.63,4 18.66,6.58 19.35,10C21.95,10.19 24,12.36 24,15A5,5 0 0,1 19,20H6M18.5,12H18A1,1 0 0,1 17,11V10A2,2 0 0,0 15,8H13.5V10H15V11A2,2 0 0,0 17,13A2,2 0 0,0 15,15V16H13.5V18H15A2,2 0 0,0 17,16V15A1,1 0 0,1 18,14H18.5V12M5.5,12V14H6A1,1 0 0,1 7,15V16A2,2 0 0,0 9,18H10.5V16H9V15A2,2 0 0,0 7,13A2,2 0 0,0 9,11V10H10.5V8H9A2,2 0 0,0 7,10V11A1,1 0 0,1 6,12H5.5Z"
---

![wq.db](https://wq.io/images/wq.db.svg)

**wq.db** is a collection of Python modules for building robust, flexible schemas and REST APIs for use in creating field data collection apps and (more generally) mobile-first websites with progressive enhancement.  wq.db is the backend component of [wq] and is geared primarily for use with [wq.app], though it can be used separately.  wq.db is built on the [Django] platform.

[**wq.db on GitHub**](https://github.com/wq/wq.db)

## Installation

### Support Matrix

wq.db 1.3 is tested with Python >= 3.6 and Django >= 2.2.

&nbsp;      | Python | Django | Django REST Framework
------------|--------|--------|-----------------------
**wq.db 1.2** | 3.4 &ndash; 3.8 | 1.11, 2.x, 3.0, 3.1 | 3.9 &ndash; 3.12
**wq.db 1.3** | 3.6 &ndash; 3.9 | 2.x, 3.0, 3.1 | 3.11 &ndash; 3.12
**wq.db 2.0 (Future)** | 3.6+ | 2.2+ | 3.11+



```bash

# Recommended: create virtual environment
# python3 -m venv venv
# . venv/bin/activate

# Install entire wq suite (recommended)
python3 -m pip install wq

# Install only wq.db
python3 -m pip install wq.db
```

See [the documentation][setup] for more information.

## API

### [wq.db.rest][rest]
Extends [Django REST Framework] with model-based views and serializers that facilitate creating an integrated [website, REST API, and mobile app][url-structure].  The core of the library is an admin-like [ModelRouter] that connects REST urls to registered models, and provides a descriptive [configuration object] for consumption by [@wq/app].  wq.db.rest also includes a GeoJSON serializer/renderer.

### [wq.db.patterns][patterns]
A collection of abstract models and serializers for use in constructing advanced [design patterns][patterns] including [nested forms], [EAV structures][EAV], and [natural keys].

[wq]: ../index.md
[wq.app]: ../wq.app/index.md
[Django]: https://www.djangoproject.com/
[setup]: ../overview/setup.md

[rest]: ./rest.md
[Django REST Framework]: http://django-rest-framework.org
[url-structure]: ./url-structure.md
[ModelRouter]: ./router.md
[configuration object]: ../config.md
[@wq/app]: ../@wq/app.md

[patterns]: ./patterns.md
[nested forms]: ../guides/implement-repeating-nested-forms.md
[EAV]: ../guides/eav-vs-relational.md
[natural keys]: https://github.com/wq/django-natural-keys
