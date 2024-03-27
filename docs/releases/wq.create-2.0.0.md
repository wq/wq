---
repo: wq.create
date: 2023-11-08
---

# wq.create 2.0

**wq.create 2.0.0** is the first stable release of the wq.create 2.0 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 2.0](./wq-2.0.0.md) when upgrading.

All changes by [@sheppard](https://github.com/sheppard).

## Changes since wq.create 2.0 alpha 2
 * @wq/rollup-plugin:
    * Vite compatibility ([`50263bc`](https://github.com/wq/wq.create/commit/50263bc))
    * Detect and handle imports to wq plugins not included in wq.js (e.g. @wq/analyst and @wq/wizard) ([`50263bc`](https://github.com/wq/wq.create/commit/50263bc))

##  Other changes since wq.create 1.3.0

### [Changes in Alpha](./wq.create-2.0.0a1.md)
  * Remove `wq start` and `wq maketemplates` commands
  * Remove `--input-dir` and `--template-dir` options for `wq addform`
  * Improve project root detection
  * Update dependencies for wq-django-template, @wq/rollup-plugin, @wq/cra-template, and @wq/expo-template
  * Various code organization and formatting improvement
 
### [Changes in Alpha 2](./wq.create-2.0.0a2.md)
  * Update dependencies for @wq/rollup-plugin, @wq/cra-template, and @wq/expo-template
