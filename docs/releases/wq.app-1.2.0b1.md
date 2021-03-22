---
repo: wq.app
date: 2019-10-07
---

# wq.app 1.2 beta

**wq.app 1.2.0b1** is the beta version of the upcoming wq.app 1.2 release.  In addition to the [major changes introduced in **wq.app 1.2 alpha**](./wq.app-1.2.0b1.md), wq.app 1.2 beta includes the following updates:

## New Features

Thanks to @tomaszn for feedback on the design of many of these features.

 * If the current URL contains the temporary ID of an unsynced record (e.g. `"outbox-123"`), automatically navigate to the new URL once synced (#98, #99)
 * New `filter_fields` and `filter_ignore` configuration options for [@wq/model](../@wq/model.md).  If a URL parameter is not found in`form`, `functions`, or `filter_fields`, it will be ignored when filtering list views (#88).
 * Simplified `onsync(item)` plugin hook, called after each outbox item is synced to the server (#96)
 * Better management of URL params during pagination (778631c, c2b5ab0)


## Removed Features

To clean up the API and prepare for a future migration away from jQuery Mobile (#111), this release removes several older hooks and events, as noted in the updated [@wq/app documentation](../@wq/app.md) and below.

name | type | suggested migration path
-----|------|-------------------------
`onsave(item, result)` | Plugin Hook | Use an `onsync()` hook instead.  The server result will be available as `item.result`.
`saveerror(item, reason, $form)` | Config Hook | Use an `onsync()` hook instead.  The error will be available as `item.error`.
`showOutboxErrors()` | Config Hook | Use an `onsync()` and/or `run()` plugin hook instead.
`postsave()` | Config Hook | Use a `postsaveurl()` plugin hook instead.
`presync()` / `postsync()` | Config Hook | Use the template context as needed for UI customizations.  Pages displaying outbox contents are automatically re-rendered after each sync.
`"login"`, `"logout"` | jQuery events | Use the template context as needed for UI customizations.  As of wq.app 1.2, all pages (including server-rendered pages) are automatically re-rendered on the client if the login state changes.
`config.transitions.save` | jQuery Mobile transition | This was a wq.app-specific configurable transition and has no effect in 1.2.  The `default` and `dialog` transitions remain configurable, but it is recommended to leave them as `"none"`.

In addition to the above, note that the `ui` option passed to jQuery Mobile navigation events is no longer used, as [Redux First Router](https://github.com/faceyspacey/redux-first-router) now handles all navigation.  Among other things, this means that setting `data-transition` or `data-direction` on an `<a href>` no longer has any effect.

## Bug Fixes
 * Confirm rare sync timing issue no longer exists in @wq/outbox (#102)
 * Fix issues with refresh logic (c738019) and sync navigation logic (b42d152)
 * Bind `this` to plugin for `reducer()` and `render()` plugin hooks (e94ebd6)
