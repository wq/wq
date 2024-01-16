---
repo: wq.app
date: 2017-07-24
---

# wq.app 1.0.0

**wq.app 1.0.0** is finally here!  This is the first stable release of wq.app 1.0, which is now ready for production use. 

## Changes since wq.app 1.0.0 RC2

* [wq/model.js](../@wq/model.md)
  * Handle boolean filter fields ([#82](https://github.com/wq/wq.app/issues/82))
* [wq/app.js](../@wq/app.md)
  * Include last context in `postdelete` URL render ([#80](https://github.com/wq/wq.app/issues/80))
  * Test and fix various EAV filter use cases ([wq/wq.db#66](https://github.com/wq/wq.db/issues/66))
* [wq/map.js](../@wq/map.md) / [wq/locate.js](../inputs/Geo.md)
  * Remove `onshow` in favor of better [wq/app.js](../@wq/app.md) plugin support ([`d5f47f2`](https://github.com/wq/wq.app/commit/d5f47f2))
  * Detect and utilize [cordova-plugin-bluetooth-geolocation](https://github.com/heigeo/cordova-plugin-bluetooth-geolocation) in [wq/locate.js](../inputs/Geo.md) ([`1ad8d0d`](https://github.com/wq/wq.app/commit/1ad8d0d))
  * Other fixes ([`bf00503`](https://github.com/wq/wq.app/commit/bf00503), [`31ed208`](https://github.com/wq/wq.app/commit/31ed208))
* [Build tool](../wq.build/cli.md)
  * Add separate `splash` option to [wq phonegap](https://github.com/wq/wq.app/blob/v1.3.0/build/phonegap.py) ([`b5d5788`](https://github.com/wq/wq.app/commit/b5d5788))
  * Incorporate default CSS from wq.start template ([`061afec`](https://github.com/wq/wq.app/commit/061afec))

 * Incorporate [Code of Conduct](https://github.com/wq/wq.app/blob/main/CODE_OF_CONDUCT.md) and [Contributing Guidelines](https://github.com/wq/wq.app/blob/main/CONTRIBUTING.md)

##  Other changes since wq.app 0.8.2

* [Changes in Alpha 1](./wq.app-1.0.0a1.md)
  * Refactor patterns API ([#38](https://github.com/wq/wq.app/issues/38), [wq/wq.db#35](https://github.com/wq/wq.db/issues/35), [#56](https://github.com/wq/wq.app/issues/56))
  * Simplify plugin arguments ([#58](https://github.com/wq/wq.app/issues/58))
  * Test framework ([#13](https://github.com/wq/wq.app/issues/13))
* [Changes in Alpha 2](./wq.app-1.0.0a2.md)
  * Minor fix
* [Changes in Beta 1](./wq.app-1.0.0b1.md)
  * More [wq/app.js plugin hooks](../plugins/index.md) and support for custom rendering modes ([#30](https://github.com/wq/wq.app/issues/30), [#59](https://github.com/wq/wq.app/issues/59))
  * Add wq/patterns.js and wq/mapserv.js
  * Various updates
* [Changes in Beta 2](./wq.app-1.0.0b2.md)
  * Flatten [wq/map.js](../@wq/map.md) configuration
  * Improve handling of images, labels and foreign keys in [wq/outbox.js](../@wq/outbox.md)
  * Update to Leaflet 1.0 and d3.js 4.2
  * Add [wq/chartapp.js](https://django-rest-pandas.wq.io/@wq/chart)
  * Drop wq/appcache.js, wq/online.js, and wq/owl.js
  * Various plugin updates
* [Changes in RC 1](./wq.app-1.0.0rc1.md)
  * New [Pagination and Caching API](../config.md) ([#47](https://github.com/wq/wq.app/issues/47))
  * New [wq icons](../wq.build/icons.md) and [wq phonegap](https://github.com/wq/wq.app/blob/v1.3.0/build/phonegap.py) commands ([wq/wq-django-template#4](https://github.com/wq/wq-django-template/issues/4))
  * Improve support for deletion & offline editing ([#70](https://github.com/wq/wq.app/issues/70), [#72](https://github.com/wq/wq.app/issues/72), [#77](https://github.com/wq/wq.app/issues/77), [#78](https://github.com/wq/wq.app/issues/78), [#80](https://github.com/wq/wq.app/issues/80))
  * Various bug fixes & improvements
* [Changes in RC 2](./wq.app-1.0.0rc2.md)
  * Minor bug fixes & improvements
