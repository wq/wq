---
repo: wq
date: 2016-03-23
---

# wq 1.0 alpha

**wq 1.0.0a1** is an alpha release of the upcoming [1.0 version](https://github.com/wq/wq/issues/22) of [wq](https://wq.io).

wq 1.0 brings a number of exciting enhancements.  In particular, you may be interested in the new automated Mustache template generation tool provided by [wq.start](./wq.start-1.0.0a1.md).  The tool makes it possible to [create new data collection apps](https://wq.io/1.0/docs/setup) automatically from an [XLSForm](https://github.com/wq/xlsform-converter) definition, without needing to write any HTML by hand (though you'll probably want to customize it anyway).

See the submodule release notes for details:
- [wq.app 1.0.0a2](./wq.app-1.0.0a2.md)
- [wq.core 1.0.0a1](./wq.core-1.0.0a1.md)
- [wq.db 1.0.0a1](./wq.db-1.0.0a1.md)
- [wq.io 1.0.0a1](./itertable-1.0.0a1.md)
- [wq.start 1.0.0a1](./wq.start-1.0.0a1.md)

A number of new packages were also created for this release:
- [django-mustache](https://github.com/wq/django-mustache) (extracted from wq.db)
- [django-natural-keys](https://github.com/wq/django-natural-keys) (extracted from wq.db)
- [html-json-forms](https://github.com/wq/html-json-forms) (extracted from wq.db)
- [xlsform-converter (xlsconv)](https://github.com/wq/xlsform-converter) (for use with wq.start)
