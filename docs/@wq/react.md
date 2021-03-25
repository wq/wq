---
module: wq.app
---

@wq/react
========

[@wq/react][source]

**@wq/react** is a renderer plugin for [@wq/app] that seamlessly integrates with the [React] and [React Native] frameworks.  @wq/react provides a number of default [components] and [hooks] to facilitate rapid deployment of applications backed by @wq/app's storage, data model, routing, and syncing engines ([@wq/store], [@wq/model], [@wq/router], and [@wq/outbox], respectively.)

@wq/react is meant to be used with [@wq/material], which provides a collection of ready-to-use Material Design interface components.

## Installation

### wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

### @wq/react for npm

```bash
npm install @wq/material # install @wq/material and @wq/react and deps
# npm install @wq/react  # install only @wq/react and deps
```

## API

The [wq.js][wq] build provided by wq.app includes @wq/react and @wq/material by default.  So, you do not need to explicitly register @wq/react when using wq.app for PyPI.

When using @wq/app for npm, @wq/react should be registered as a plugin, either directly or indirectly via [@wq/material].

```javascript
import app from '@wq/app';
import material from '@wq/material';

app.use(material);  // Automatically registers @wq/react

app.init(...);
```

### Components

@wq/react registers a complete set of components corresponding to @wq/app's [data model][config] and [URL structure][url-structure].  The components are grouped into four categories:

plugin key | description
--|--
[components] | General components (List, Table, Button, etc.)
[icons] | Icon components
[inputs] | Form inputs
[views] | View components

Many of @wq/react's general components, and all of its icon and input components, are placeholders meant to be overridden by [@wq/material].  You can override both @wq/react and @wq/material's components by registering a [custom components plugin][components-plugin] with the corresponding key.

@wq/react also provides named exports of a some components for use in custom views.  In general, @wq/react provides named exports of components unique to @wq/react; those intended to be overridden by @wq/material are generally not provided as named exports.

### Hooks

@wq/react exports a number of [React hooks][hooks] that can be used to access various parts of the application state and plugin framework.

[source]: https://github.com/wq/wq.app/tree/main/packages/react

[@wq/app]: ./app.md
[@wq/store]: ./store.md
[@wq/model]: ./model.md
[@wq/router]: ./router.md
[@wq/outbox]: ./outbox.md
[@wq/material]: ./material.md
[wq]: ../wq.md

[config]: ../wq-configuration-object.md
[url-structure]: ../wq.db/url-structure.md
[components]: ../components/index.md
[icons]: ../components/icons.md
[inputs]: ../inputs/index.md
[views]: ../views/index.md
[hooks]: ../hooks/index.md
[components-plugin]: ../plugins/components.md

[React]: https://reactjs.org
[React Native]: https://reactnative.dev/
[Formik]: https://formik.org
[xlsform-appearance]: https://xlsform.org/en/#appearance
[React hooks]: https://reactjs.org/docs/hooks-overview.html
[Redux First Router]: https://github.com/faceyspacey/redux-first-router
