---
permalink: /wq.db/
wq_config:
  name: wqdb
  url: wq.db
  order: 26
  section: API Reference
  icon_data: "M6,20A6,6 0 0,1 0,14C0,10.91 2.34,8.36 5.35,8.04C6.6,5.64 9.11,4 12,4C15.63,4 18.66,6.58 19.35,10C21.95,10.19 24,12.36 24,15A5,5 0 0,1 19,20H6M18.5,12H18A1,1 0 0,1 17,11V10A2,2 0 0,0 15,8H13.5V10H15V11A2,2 0 0,0 17,13A2,2 0 0,0 15,15V16H13.5V18H15A2,2 0 0,0 17,16V15A1,1 0 0,1 18,14H18.5V12M5.5,12V14H6A1,1 0 0,1 7,15V16A2,2 0 0,0 9,18H10.5V16H9V15A2,2 0 0,0 7,13A2,2 0 0,0 9,11V10H10.5V8H9A2,2 0 0,0 7,10V11A1,1 0 0,1 6,12H5.5Z"
---

# wq.db (REST API)

[![wq.db](https://raw.github.com/wq/wq/master/images/256/wq.db.png)](https://wq.io/wq.db)

[wq.db](https://wq.io/wq.db) is a collection of Python modules for building robust, flexible schemas and REST APIs for use in creating field data collection apps and (more generally) mobile-first websites with progressive enhancement.  wq.db is the backend component of [wq] and is geared primarily for use with [wq.app], though it can be used separately.  wq.db is built on the [Django] platform.


[![Latest PyPI Release](https://img.shields.io/pypi/v/wq.db.svg)](https://pypi.org/project/wq.db)
[![Release Notes](https://img.shields.io/github/release/wq/wq.db.svg)](https://github.com/wq/wq.db/releases)
[![Documentation](https://img.shields.io/badge/Docs-1.2-blue.svg)](https://wq.io/wq.db)
[![License](https://img.shields.io/pypi/l/wq.db.svg)](https://wq.io/license)
[![GitHub Stars](https://img.shields.io/github/stars/wq/wq.db.svg)](https://github.com/wq/wq.db/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/wq/wq.db.svg)](https://github.com/wq/wq.db/network)
[![GitHub Issues](https://img.shields.io/github/issues/wq/wq.db.svg)](https://github.com/wq/wq.db/issues)

[![Travis Build Status](https://img.shields.io/travis/wq/wq.db/master.svg)](https://travis-ci.org/wq/wq.db)
[![Python Support](https://img.shields.io/pypi/pyversions/wq.db.svg)](https://pypi.org/project/wq.db)
[![Django Support](https://img.shields.io/pypi/djversions/wq.db.svg)](https://pypi.org/project/wq.db)

#### Support Matrix

wq.db is compatible with Python >= 3.4 and Django >= 1.11.

&nbsp;      | Python | Django | Django REST Framework
------------|--------|--------|-----------------------
**wq.db 1.0** | 2.7, 3.4 &ndash; 3.6 | 1.8, 1.10, 1.11 | 3.6
**wq.db 1.1** | 2.7*, 3.4 &ndash; 3.7 | 1.11, 2.0, 2.1 | 3.9
**wq.db 1.2 & 1.3** | 3.4 &ndash; 3.8 | 1.11, 2.x, 3.0, 3.1 | 3.9, 3.10, 3.11
**wq.db 2.0 (Future)** | 3.5+ | 2.2+ | 3.11+

&#42; Python 2.7 support is no longer tested, but is known to work in wq.db 1.1 and earlier.

## Getting Started

```bash

# Recommended: create virtual environment
# python3 -m venv venv
# . venv/bin/activate

# Install entire wq suite (recommended)
python3 -m pip install wq

# Install only wq.db
python3 -m pip install wq.db
```

See [the documentation] for more information.

## Features

### [wq.db.rest][rest]
Extends [Django REST Framework] with model-based views and serializers that facilitate creating an integrated [website, REST API, and mobile app][url-structure].  The core of the library is an admin-like [ModelRouter] that connects REST urls to registered models, and provides a descriptive [configuration object] for consumption by [@wq/app].  wq.db.rest also includes a GeoJSON serializer/renderer.

### [wq.db.patterns][patterns]
A collection of abstract models and serializers for use in constructing advanced [design patterns][patterns] including [nested forms], [EAV structures][EAV], and [natural keys].  Includes [wq.db.patterns.identify][identify], an installable Django app module to help manage third-party entity identifers.

[wq]: https://wq.io
[wq.app]: https://wq.io/wq.app
[Django]: https://www.djangoproject.com/
[the documentation]: https://wq.io/docs/

[rest]: ./about-rest.md
[Django REST Framework]: http://django-rest-framework.org
[url-structure]: https://wq.io/docs/url-structure
[ModelRouter]: ./router.md
[configuration object]: ../config.md
[@wq/app]: ../@wq/app.md

[patterns]: https://wq.io/docs/about-patterns
[nested forms]: https://wq.io/docs/nested-forms
[EAV]: https://wq.io/docs/eav-vs-relational
[natural keys]: https://github.com/wq/django-natural-keys
[identify]: https://wq.io/docs/identify
