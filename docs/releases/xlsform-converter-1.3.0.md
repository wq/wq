---
repo: xlsform-converter
date: 2022-04-05
---

# xlsconv 1.3.0

**xlsconv 1.3.0** brings support for the new React-based rendering system provided in [wq 1.3](./wq-1.3.0.md), as well as a number of bug fixes:

 * Ensure support for multiple geometry fields ([#2](https://github.com/wq/xlsform-converter/issues/2))
 * Ignore `__version__` metadata field ([#4](https://github.com/wq/xlsform-converter/issues/4))
 * Better default pluralization for repeat fields ([#5](https://github.com/wq/xlsform-converter/issues/5))
 * Use AST for code generation ([#7](https://github.com/wq/xlsform-converter/issues/7))
 * Register models with [Django Data Wizard](https://django-data-wizard.wq.io) ([`3a9ae09`](https://github.com/wq/xlsform-converter/commit/3a9ae09))
 * Support `group` types via [wq_fieldsets configuration](../guides/organize-inputs-into-fieldsets.md) ([`0d085f5`](https://github.com/wq/xlsform-converter/commit/0d085f5))

In addition, [pyxform 1.8.0](https://github.com/XLSForm/pyxform/releases/tag/v1.8.0) now supports openpyxl and xlrd 2.0.
