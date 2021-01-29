---
module: wq.create
---

@wq/cra-template
================

This is the [Create React App][create-react-app] template for projects utilizing the [wq framework].  It uses [@wq/app] and [@wq/material] to generate a configuration-driven interface for collecting and managing geospatial field data.   This template is meant to be used together with [wq.start].  See wq's [Getting Started] docs for more information.

Note that the root `ReactDOM.render()` call and all Redux initialization are handled automatically by [@wq/react] and [@wq/store], respectively.  It is not necessary to explicitly define any React components, except to override the default UI.  See the [@wq/react component documentation][react-components] for more details.

## Usage

This template can be leveraged directly via the `--template` argument to [create-react-app]:

```bash
npx create-react-app my-app --template @wq
```

However, if you plan to use the full wq stack (including the wq.db Django backend), it may be more convenient to use the [wq start][wq.start] command to initalize the project.

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, wq.start, etc.)
wq start --with-npm
```

See the [Create React App documentation][create-react-app] for more information on the available NPM scripts.

[wq framework]: http://wq.io/
[@wq/app]: https://wq.io/docs/app-js
[@wq/material]: https://github.com/wq/wq.app/tree/master/packages/material
[wq.start]: https://wq.io/wq.start
[@wq/react]: https://github.com/wq/wq.app/tree/master/packages/react
[react-components]: https://github.com/wq/wq.app/tree/master/packages/react#components
[@wq/store]: https://github.com/wq/wq.app/tree/master/packages/store
[Getting Started]: https://wq.io/docs/setup
[create-react-app]: https://facebook.github.io/create-react-app/docs/getting-started
