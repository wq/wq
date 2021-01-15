---
repo: wq-django-template
date: 2016-09-02
---

# wq-django-template 1.0 beta

**wq-django-template 1.0.0b1** is the beta release of the upcoming 1.0 Django template for wq.  This version brings a couple of minor improvements and a source code reorganization:

### New Features
- Incorporated placeholder app icons for use with the "Add to Homescreen" feature on modern devices (#1)
- Integrate new `wq/patterns.js` module for nested forms (see [wq.app 1.0 beta release notes](./wq.app-1.0.0b1.md))

### Source Code Reorganization
- Moved the master Django and mustache templates to the [xlsform-converter](https://github.com/wq/xlsform-converter) repository (see the [xlsconv 0.2.0 release notes](./xlsform-converter-0.2.0.md)).
- Moved the `wq start` Python tools to a separate repository, [wq.start](https://wq.io/wq.start).  Subsequent releases of `wq.start` will appear in that repository's [releases page](https://github.com/wq/wq.start/releases).  This repository now only contains the wq Django template, as indicated by its name.
