---
repo: wq.create
date: 2022-04-05
tag: latest
tag_color: primary
---

# wq.create 1.3.0

**wq.create 1.3.0** is the first stable release of the wq.create 1.3 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 1.3](./wq-1.3.0.md) when upgrading.  In particular, note that:

Projects generated with... | ...are compatible with
-- | --
wq.start 1.2 | wq.app 1.2 & 1.3
wq.create 1.3 | wq.app 1.3 & 2.0 (future)

All changes by @sheppard.

## Changes since wq.create 1.3 beta

 * Update to [wq-django-template 1.3.0](./wq-django-template-1.3.0.md)
    * Ensure Windows support for `wq create` command (wq/wq-django-template#20)
 *  Improve npm integration ([@wq/cra-template](../@wq/cra-template.md))
     * Pin `react-scripts` to v4 to work around ESM import issues (wq/wq#58).  CRA v5 support will be added in a future release of wq.app (wq/wq.app#130)
     * Use server-generated config as-is (wq/wq#54)
 * Support generating `wizard.py` file to register new models with [Django Data Wizard](https://django-data-wizard.wq.io/) (f263137)

## Other changes since wq.start 1.2.1
  * [Changes in Alpha](./wq.create-1.3.0a1.md)
     * Update to [wq-django-template 1.3 alpha](./wq-django-template-1.3.0a1.md)
        * Deprecate `wq maketemplates` command
        * Remove `--with-pgb` and `--app-id` options to `wq start`
      * New [@wq/cra-template](../@wq/cra-template.md) npm package
  * [Changes in Beta](./wq.create-1.3.0b1.md)
    * Rename package from `wq.start` to `wq.create`
    * Allow specifying site title via `wq create`
    * New [@wq/rollup-plugin](../@wq/rollup-plugin.md) npm package
