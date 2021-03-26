---
repo: wq.app
date: 2015-06-16
---

# wq.app 0.8.0

**wq.app 0.8.0** brings a long-overdue [overhaul](https://github.com/wq/wq.app/issues/20) of [wq/store.js](../@wq/store.md) to clean up technical debt and bring it up-to-date with modern browser capabilities.  This release also introduces a more extensible [click](https://click.pocoo.org/)-based `wq` CLI.

## API Changes
- [wq/store.js](../@wq/store.md) overhaul (#20, #48)
  - Use [localForage](https://mozilla.github.io/localForage) instead of `localStorage` to handle offline data storage (#20).  This brings the option of using `IndexedDB` in browsers that support it.
  - Switch to an almost entirely asynchronous API (#17), using promises (#5) which are provided with `localForage`.
  - Split `getList()` and related functionality into a separate module, [wq/model.js](../@wq/model.md) (#20).  Also split outbox features into separate [wq/outbox.js](../@wq/outbox.md) module.
  - rename `unsavedItems()` and `obitem.saved` to `unsyncedItems()` and `obitem.synced` (#27)
- [wq/app.js](../@wq/app.md) + wq/store.js
  - enable saving of Blobs (i.e. user-contributed photos) in the outbox until network is available (#22)
  - make `backgroundSync` the default, unify `postsave` and `postsubmit` into a single method, and simplify method signatures
  - use current auth data when syncing outbox (#49)
- [wq/pages.js](../@wq/router.md)
  - rename to `wq/router.js` (#26)
  - parts of the internal implementation (related to injecting rendered HTML into the DOM) have been moved to [wq/template.js](https://github.com/sheppard/django-mustache).
- [wq/map.js](../@wq/outbox.md):
  - Require bounds instead of center+zoom for default extent (#44)
- [wq/photos.js](../wq.app/index.md):
  -  Use `URL.createObjectURL` rather than `FileReader` for image previews. (4b05b5a070206ba8c72e3d5ee51a6e28d0b50adf)
- [wq build](../wq.build/cli.md):
  - update to use new [click](https://click.pocoo.org/)-powered [wq.core](https://github.com/wq/wq.core) API (#39)
  - Remove automatic search for old `app.build.json` (#29)
- General API Cleanup
  - simplify `init()` usage in [wq/app.js](../@wq/app.md), [wq/store.js](../@wq/store.md), [wq/pages.js](../@wq/router.md), [wq/template.js](https://github.com/sheppard/django-mustache) (#28)
  - use namespace for data- properties (#42)
  - Code style: enforce curly braces over one-line conditionals
  - Add `{{rt}}` and `{{svc}}` as template variable aliases for `{{router_info.base_url}}` and `{{app_config.store.service}}`, respectively (c500ceec8257917f910ca07e81384914dac40d78)

## Upgrade Notes

If you are installing wq.app for the first time, you do not need to worry about the notes in this section.
- The core `wq` CLI was previously part of wq.app, but is now in a separate package, [wq.core](https://github.com/wq/wq.core).  If you are upgrading an existing wq.app installation, we recommend uninstalling and re-installing wq.app.  If you don't do this, the upgrade will likely install wq.core before upgrading wq.app, which will cause the new `wq` executable to be wiped out while uninstalling the old wq.app.  If this happens, you may see an error like the following: `bash: /usr/local/bin/wq: No such file or directory`.
  The fix is to uninstall both wq.core and wq.app and then install wq.app again.
- If you are using [wq/store.js](../@wq/store.md) directly, note that the API has changed significantly since previous versions.  In particular, be sure to read up on the new [wq/model.js](../@wq/model.md) and [wq/outbox.js](../@wq/outbox.md) modules.  Also, if you are using [wq/store.js](../@wq/store.md) together with [wq/app.js](../@wq/app.md), you may want to take advantage of the new built-in `app.models` object that will contain model API instances for all models listed in the [wq configuration](../config.md).
- If you are using [wq/app.js](../@wq/app.md), [wq/pages.js](../@wq/router.md), [wq/store.js](../@wq/store.md), or [wq/template.js](https://github.com/sheppard/django-mustache), note that the configuration structure has been changed so that each module takes a single `init()` configuration argument.  See the respective module documentation pages for details.
- Make sure you have a file called `wq.yml` or specify a filename when running the `wq build` process.  JSON is YAML, so if you have an existing `app.build.json` you should be able to rename it to `wq.yml` and use it as-is.
- Update your templates to reference all wq-specific attributes as e.g. `data-wq-json` rather than `data-json`.
