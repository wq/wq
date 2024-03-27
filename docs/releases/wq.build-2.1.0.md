---
repo: wq.build
date: 2024-03-27
tag: latest
tag_color: primary
---

# wq.build 2.1

**wq.build 2.1.0** is the first release of the wq.build 2.1 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 2.1](./wq-2.1.0.md) when upgrading.

All changes by [@sheppard](https://github.com/sheppard).

In addition to confirming compatibility with Python 3.12 and Django 5.0 ([`5190f89`](https://github.com/wq/wq.build/commit/5190f89)), this release includes the following improvements:

 * Add `exclude` option to [wq serviceworker](../wq.build/serviceworker.md) ([`dd4f1c9`](https://github.com/wq/wq.build/commit/dd4f1c9))
 * Remove deprecated AMD output format from [wq collectjson](../wq.build/collectjson.md) and [wq setversion](../wq.build/setversion.md) ([`170db12`](https://github.com/wq/wq.build/commit/170db12))
 * In [./manage.py deploy](../wq.build/deploy.md), check for both `app/package.json` and `package.json` ([`e15de65`](https://github.com/wq/wq.build/commit/e15de65))
 * Various documentation updates ([`5953a95`](https://github.com/wq/wq.build/commit/5953a95), [`691ada2`](https://github.com/wq/wq.build/commit/691ada2), [`97080a4`](https://github.com/wq/wq.build/commit/97080a4))
