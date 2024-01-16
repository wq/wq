---
repo: wq.create
date: 2020-09-29
---

# wq.start 1.3 alpha

**wq.start 1.3 alpha** is a preview of the next version of wq.start, as part of the [wq 1.3 alpha](./wq-1.3.0a1.md) release.  Most of the the changes are described in the release notes for [wq-django-template 1.3 alpha](./wq-django-template-1.3.0a1.md).  In addition, the following commands have changed ([`c68524f`](https://github.com/wq/wq.create/commit/c68524f)):

 * `wq start` no longer accepts the `--with-pgb` or `--app-id` options, as PhoneGap Build support is deprecated (see [wq/wq.app#121](https://github.com/wq/wq.app/issues/121)).
 * `wq start --with-npm` now calls `npx create-react-app [name] --template @wq` internally.  Thus, the `--skip-npm-install` option is no longer supported.
 * `wq addform` still works to generate a Django app from an XLSForm, but it will not generate corresponding Mustache templates unless the project was created with wq.start 1.2 or earlier.
 * `wq maketemplates` is deprecated and will be removed in wq.start 2.0.

While new projects created with `wq start` no longer use these features, wq.app will continue to support them until version 2.0.  The compatibility table is as follows:

Projects generated with... | ...are compatible with
--|--
wq.start 1.2 | wq.app 1.2 & 1.3
wq.start 1.3 | wq.app 1.3 & 2.0 (future)
