---
repo: wq
date: 2022-04-05
tag: latest
tag_color: primary
---

# wq 1.3.0

**wq 1.3.0** is the first stable release of the wq 1.3 series!  Be sure to check out the [latest documentation](../index.md) when upgrading. In particular, note that the changes introduced in [wq.app 1.3 alpha](./wq.app-1.3.0a1.md) are now the default and only supported option for new projects.  Specifically:

Deprecated | Replacement
-- | --
AMD / RequireJS | ES Modules
jQuery Mobile + Mustache | React + Material UI
Leaflet | Mapbox GL / Maplibre GL
Application Cache | Service Worker
PhoneGap Build | Installable PWA and/or React Native + Expo

The wq.app 1.3 package is designed to support backwards compatibility with projects generated with wq 1.2, including the deprecated functionality.  However, this support will be dropped completely in wq 2.0.

> Note: While the `wq appcache` and `wq phonegap` commands remain in wq.app 1.3, Application Cache and PhoneGap Build are no longer supported by the respective vendors.

See the submodule release notes for details about the changes since wq 1.3 beta.

* [wq.app 1.3.0](./wq.app-1.3.0.md)
* [wq.build 1.3.0](./wq.build-1.3.0.md) (formerly **wq.core**)
* [wq.create 1.3.0](./wq.create-1.3.0.md) (formerly **wq.start**)
* [wq.db 1.3.0](./wq.db-1.3.0.md)
