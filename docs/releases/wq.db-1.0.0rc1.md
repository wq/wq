---
repo: wq.db
date: 2017-04-04
---

# wq.db 1.0.0 RC1

**wq.db 1.0.0 RC1** brings a number of enhancements to improve integration with wq.start and wq.app.

## wq 1.0 enhancements
 * New API to more directly configure the relationship between pagination and offline caching in wq.app ([wq/wq.app#47](https://github.com/wq/wq.app/issues/47), [`663bbda`](https://github.com/wq/wq.db/commit/663bbda)).  See [Pagination and Caching](../config.md) for more information.
 * Added support for pre-generating blank nested forms for attachments, which wq.app has supported for some time ([#61](https://github.com/wq/wq.db/issues/61)).
 * Improved the `form` sections of the generated [wq config object](../config.md) to better match the output of [xlsconv](https://github.com/wq/xlsform-converter).  The goal is to ensure that [wq.start](../wq.create/index.md)'s `wq addform` and `wq maketemplates` commands produce identical template output.  ([`237c07a`](https://github.com/wq/wq.db/commit/237c07a), [`7253f33`](https://github.com/wq/wq.db/commit/7253f33), [`4735982`](https://github.com/wq/wq.db/commit/4735982), [`e3dec4b`](https://github.com/wq/wq.db/commit/e3dec4b))

## Bug Fixes
 * Support fields with `blank=True` and `null=False` ([#58](https://github.com/wq/wq.db/issues/58))
 * Avoid 500 errors when performing field and nested configuration lookups ([`19e918a`](https://github.com/wq/wq.db/commit/19e918a), [`6df5f44`](https://github.com/wq/wq.db/commit/6df5f44), [#60](https://github.com/wq/wq.db/issues/60))
 * Third party compatibility fixes ([`1ba0360`](https://github.com/wq/wq.db/commit/1ba0360), [`ae9fd6a`](https://github.com/wq/wq.db/commit/ae9fd6a), [`388336d`](https://github.com/wq/wq.db/commit/388336d), [`b6ee2ac`](https://github.com/wq/wq.db/commit/b6ee2ac))
