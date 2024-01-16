---
repo: xlsform-converter
date: 2023-06-16
---

# xlsconv 2.0 alpha

**xlsconv 2.0 alpha** is a preview of the next major version of xlsconv.  This release includes a number of breaking changes for compatibility with [wq 2.0 alpha](./wq-2.0.0a1.md).    If you are only using xlsconv to generate `models.py` (and are not integrating with the wq framework), these changes should not affect you.

All changes by [@sheppard](https://github.com/sheppard).

### Breaking Changes
* Drop all support for wq's old jQuery Mobile / Mustache renderer and HTML templates ([`38b6869`](https://github.com/wq/xlsform-converter/commit/38b6869)).
  * xlsconv's `xls2html()`, `html_context()`, and `render()` methods have all been removed.
* Leverage the updated `wq.db.rest` API instead of the `wq.db.patterns` module, which was removed in [wq.db 2.0 alpha](./wq.db-2.0.0a1.md) ([`9f52275`](https://github.com/wq/xlsform-converter/commit/9f52275)).

### Other Fixes
 * Don't import grouped fields as a separate model class in `serializers.py` ([`48a3243`](https://github.com/wq/xlsform-converter/commit/48a3243))
 * Switch to `pyproject.toml` and test with latest Python versions ([`6a90a48`](https://github.com/wq/xlsform-converter/commit/6a90a48))
