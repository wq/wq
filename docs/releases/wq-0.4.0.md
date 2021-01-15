---
repo: wq
date: 2013-12-11
---

# wq 0.4.0

Major update to [wq](http://wq.io), with various API and project layout improvements since [0.3.1](./wq-0.3.1.md).  There are a number of backwards-incompatible changes in all three submodules.  See the submodule release notes for details:
- [wq.app 0.5.0](./wq.app-0.5.0.md)
- [wq.db 0.4.0](./wq.db-0.4.0.md)
- [wq.io 0.4.0](./itertable-0.4.0.md)

To simplify the [Getting Started](http://wq.io/docs/setup) workflow, the [wq PyPI package](https://pypi.python.org/pypi/wq) also now includes a copy of the [django-wq-template](https://github.com/wq/django-wq-template) and a `wq-start` command.

``` bash
# new way
wq-start <projectname>

# old way
django-admin.py startproject <projectname> \
  --template https://github.com/wq/django-wq-template/archive/master.zip \
  --extension py,json,conf,html,sh,js
```
