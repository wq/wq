---
repo: wq.build
date: 2022-04-05
---

# wq.build 1.3.0

**wq.build 1.3.0** is the first stable release of the wq.build 1.3 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 1.3](./wq-1.3.0.md) when upgrading.

All changes by [@sheppard](https://github.com/sheppard).

## Changes since wq.build 1.3 beta
* Streamlined `./manage.py deploy` command to improve Django workflow ([#3](https://github.com/wq/wq.build/issues/3), [wq/wq#54](https://github.com/wq/wq/issues/54), [wq/wq-django-template#20](https://github.com/wq/wq-django-template/issues/20))
* Update to newest `click` version ([#2](https://github.com/wq/wq.build/issues/2))
* Improve `wq icons` command ([`19ca175`](https://github.com/wq/wq.build/commit/19ca175c781d2c33f3fc5b81e2ea7dc0c1b93569), [`02fc760`](https://github.com/wq/wq.build/commit/02fc7609761786de9bf04065ad35c68f9a892350))
* Improve `wq serviceworker` template ([`c962835`](https://github.com/wq/wq.build/commit/c9628355c82a780a6d35e1c53ee37088ba769647), [`3527e7a`](https://github.com/wq/wq.build/commit/3527e7a31fd2181783c6378df1ad2c7ebff08f30))

## Other changes since wq.core 1.2.0
  * [Changes in Alpha](./wq.build-1.3.0a1.md)
     * Deprecate `wq versions` command
  * [Changes in Beta](./wq.build-1.3.0b1.md)
     * Rename package from `wq.core` to `wq.build`
     * Take over all non-deprecated build commands from [wq.app 1.3 beta](./wq.app-1.3.0b1.md)
