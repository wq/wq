---
repo: wq.app
date: 2014-06-16
---

# wq.app 0.6.0

This release provides a number of minor improvements to wq.app 0.5.1.

### New Modules
- **[wq/progress.js](https://django-data-wizard.wq.io/@wq/progress-element)**:  A tool for updating an HTML5 `<progress>` bar with updates from an AJAX rest service (e.g. a [dbio](https://django-data-wizard.wq.io/) Celery task)

### API improvements
- **[wq/app.js](../@wq/app.md)**:
  - Support for multiple foreign keys pointing to the same model (#16)
  - Customizable error message when JSON fetch fails (#19)

### Other Changes
- Various minor bugfixes
