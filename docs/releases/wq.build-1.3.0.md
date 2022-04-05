---
repo: wq.build
date: 2022-04-05
tag: latest
tag_color: primary
---

# wq.build 1.3.0

**wq.build 1.3.0** is the first stable release of the wq.build 1.3 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 1.3](./wq-1.3.0.md) when upgrading.

All changes by @sheppard.

## Changes since wq.build 1.3 beta
* Streamlined `./manage.py deploy` command to improve Django workflow (#3, wq/wq#54, wq/wq-django-template#20)
* Update to newest `click` version (#2)
* Improve `wq icons` command (19ca175c781d2c33f3fc5b81e2ea7dc0c1b93569, 02fc7609761786de9bf04065ad35c68f9a892350)
* Improve `wq serviceworker` template (c9628355c82a780a6d35e1c53ee37088ba769647, 3527e7a31fd2181783c6378df1ad2c7ebff08f30)

## Other changes since wq.core 1.2.0
  * [Changes in Alpha](./wq.build-1.3.0a1.md)
     * Deprecate `wq versions` command
  * [Changes in Beta](./wq.build-1.3.0b1.md)
     * Rename package from `wq.core` to `wq.build`
     * Take over all non-deprecated build commands from [wq.app 1.3 beta](./wq.app-1.3.0b1.md)
