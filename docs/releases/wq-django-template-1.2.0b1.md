---
repo: wq-django-template
date: 2019-10-07
---

# wq-django-template 1.2 beta

**wq-django-template 1.2.0b1** includes an alternative project layout based on [Create React App (CRA)](https://create-react-app.dev/).  This makes it possible to leverage NPM to manage JavaScript dependencies, and CRA's Webpack/Babel configuration to build and debug the application.  See wq/wq#44 and the release notes for [wq.start 1.2 beta](./wq.start-1.2.0b1.md) for more information this feature.

## Other Changes
 * Add [project_name].sqlite3 to the `.gitignore` (#26 via @tubaman)
 * Update `SPATIALITE_LIBRARY_PATH` for Ubuntu 18.04 compatibility (ec124cc)
 * Update plugin hook usage for [wq.app 1.2 beta](./wq.app-1.2.0b1.md) (34cae67, d0792a6, 96244e3)
