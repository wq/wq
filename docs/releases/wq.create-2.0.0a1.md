---
repo: wq.create
date: 2023-06-22
---

# wq.create 2.0 alpha

**wq.create 2.0 alpha** is a preview of the next version of wq.create, as part of the [wq 2.0 alpha](./wq-2.0.0a1.md) release.  This release removes remaining support for projects created with wq 1.2 and earlier versions, while maintaining compatibility with wq 1.3.

All changes by [@sheppard](https://github.com/sheppard).

 * The legacy `wq start` and `wq maketemplates` commands have been removed ([`15fde40`](https://github.com/wq/wq.create/commit/15fde40)).
 * [wq addform](../wq.create/addform.md) no longer generates legacy mustache templates; the `--input-dir` and `--template-dir` options have been removed ([`db80271`](https://github.com/wq/wq.create/commit/db80271)).
   * See [xlsconv 2.0.0a1](./xlsform-converter-2.0.0a1.md)
 * wq addform tries harder to find the project root directory, and fails more gracefully when it does not ([`db80271`](https://github.com/wq/wq.create/commit/db80271)).
 * The project templates have been updated for compatibility with wq.db 2.0 alpha and wq.app 2.0 alpha.
   * [wq-django-template 2.0 alpha](./wq-django-template-2.0.0a1.md) ([`4bbe7bf`](https://github.com/wq/wq.create/commit/4bbe7bf), [`5470d93`](https://github.com/wq/wq.create/commit/5470d93), [`ca30615`](https://github.com/wq/wq.create/commit/ca30615), [`c96c34c`](https://github.com/wq/wq.create/commit/c96c34c), [`5dd091f`](https://github.com/wq/wq.create/commit/5dd091f))
   * **@wq/cra-template 2.0.0-alpha.1** ([wq/wq#58](https://github.com/wq/wq/issues/58), [wq/wq#59](https://github.com/wq/wq/issues/59), [`0cc0a0c`](https://github.com/wq/wq.create/commit/0cc0a0c), [`0117afb`](https://github.com/wq/wq.create/commit/0117afb))
   * **@wq/expo-template 2.0.0-alpha.0** ([`0cc0a0c`](https://github.com/wq/wq.create/commit/0cc0a0c))
   * **@wq/rollup-plugin 2.0.0-alpha.1** ([`ca0e80d`](https://github.com/wq/wq.create/commit/ca0e80d), [`c0b4bf8`](https://github.com/wq/wq.create/commit/c0b4bf8), [`3c559cf`](https://github.com/wq/wq.create/commit/3c559cf))
  * Various code organization and formatting improvements ([`17e2fca`](https://github.com/wq/wq.create/commit/17e2fca), [`6e3484b`](https://github.com/wq/wq.create/commit/6e3484b), [`4c80df2`](https://github.com/wq/wq.create/commit/4c80df2), [`0b6771b`](https://github.com/wq/wq.create/commit/0b6771b)).
