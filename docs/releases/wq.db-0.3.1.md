---
repo: wq.db
date: 2013-10-28
---

# wq.db 0.3.1

### API improvements
- Simple pages added via `app.router.add_page` in [wq.db.rest](http://wq.io/docs/rest) now have the page configuration used as the [template context](http://wq.io/docs/templates). (#3)
- Support for returning a detail page other than the one for model that was just saved (wq/wq.app#9).
- Enable support for `PATCH` updates

### Other
- Various minor bug fixes
