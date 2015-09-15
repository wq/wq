---
order: 2
---

Getting Started
===============

The easiest way to install wq is via the [Python Package Index].  Any of [wq.app], [wq.db], or [wq.io] can be installed separately, or all three can be installed by simply installing the **wq** metapackage.  Either easy_install or pip should work.

> **Note:** wq is optimized for Python 3.  Python 2.7 is still supported for the time being, but should be considered deprecated.

```bash
pip3 install wq
```

## Installation

If you are using wq.app and wq.db together, you may find it useful to take advantage of the [Django wq template] via the `wq start` command.  You will need a WGSI-capable webserver like [Apache], and a database to host the application.  wq.db is generally used with [PostgreSQL] and [PostGIS], but any Django-supported database will work.

Installation instructions are available for each of the following operating systems:

### [Ubuntu Linux]
### [Windows]
### [Red Hat Enterprise Linux / CentOS]
### [OS X]

[Python Package Index]: https://pypi.python.org/pypi/wq
[wq.app]: https://wq.io/wq.app
[wq.db]: https://wq.io/wq.db
[wq.io]: https://wq.io/wq.io
[Apache]: http://httpd.apache.org/
[PostgreSQL]: http://www.postgresql.org/
[PostGIS]: http://postgis.net/
[Django wq template]: https://github.com/wq/django-wq-template
[Ubuntu Linux]: https://wq.io/docs/setup-ubuntu
[Windows]: https://wq.io/docs/setup-windows
[OS X]: https://wq.io/docs/setup-osx
[Red Hat Enterprise Linux / CentOS]: https://wq.io/docs/setup-redhat
