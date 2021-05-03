---
repo: wq.build
date: 2021-05-03
tag: next
tag_color: secondary
---

# wq.build 1.3 beta

**wq.build 1.3.0b1** is the beta of the upcoming 1.3 version of wq.build (formerly wq.core).  The new module combines the wq core command as well as the (non-deprecated) commands from `wq.app.build` into a single module.  See the release notes for [wq.app 1.3 beta](./wq.app-1.3.0b1.md) for more details.

In general it makes sense to just install the [latest wq package](./wq-1.3.0b1.md), which specifies wq.build as a dependency.  The upgrade from wq 1.2 to 1.3 will generally just work, though the old wq.core package will remain installed.  This is generally harmless, but if you uninstall wq.core *after* upgrading, you may experience issues with the wq command.  If this happens, try uninstalling then reinstalling with these commands:

```
python3 -m pip uninstall wq.core wq.start
python3 -m pip uninstall wq.build
python3 -m pip install wq==1.3.0b1
```
