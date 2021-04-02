---
module: wq.create
---

@wq/cra-template
================

[@wq/cra-template][source]

This is the [Create React App][create-react-app] template for projects utilizing the [wq framework].  It uses [@wq/app] and [@wq/material] to generate a configuration-driven interface for collecting and managing geospatial field data.   This template is meant to be used together with [wq.create].  See wq's [Getting Started] docs for more information.

Note that the root `ReactDOM.render()` call and all Redux initialization are handled automatically by [@wq/react] and [@wq/store], respectively.  It is not necessary to explicitly define any React components, except to override the default UI.  See the [@wq/react component documentation][react-components] for more details.

## Usage

This template can be leveraged directly via the `--template` argument to [create-react-app]:

```bash
npx create-react-app my-app --template @wq
```

However, if you plan to use the full wq stack (including the wq.db Django backend), it may be more convenient to use the [wq create][wq.create] command to initalize the project.

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, wq.create, etc.)
wq create --with-npm
```

See the [Create React App documentation][create-react-app] for more information on the available NPM scripts.

[source]: https://github.com/wq/wq.create/tree/main/packages/cra-template
[wq framework]: ../index.md
[@wq/app]: ./app.md
[@wq/material]: ./material.md
[wq.create]: ../wq.create/index.md
[@wq/react]: ./react.md
[react-components]: ../components/index.md
[@wq/store]: ./store.md
[Getting Started]: ../overview/setup.md
[create-react-app]: https://facebook.github.io/create-react-app/docs/getting-started
