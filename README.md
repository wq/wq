<p align="center">
  <a href="https://wq.io">
    <img src="https://wq.io/images/wq.svg" alt="wq">
  </a>
</p>

<p align="center">
  <a href="https://wq.io"><strong>wq</strong></a> is a modular framework for field data collection and surveys via offline-capable mobile web apps.
</p>

## Getting Started

wq can be installed via GitHub, Docker, PyPI, NPM, or a `<script>` tag via CDN.  See [the documentation](https://wq.io/overview/setup) for more information on getting started.


### Dev Container (recommended)

1. Go to <https://github.com/wq/wq-docker-template>
2. Select "Use this template" -> "Create a new repository"
3. Open the dev container via [GitHub Codespaces][codespaces] or [Docker Desktop][docker]

[codespaces]: https://wq.io/guides/setup-wq-with-github-codespaces
[docker]: https://wq.io/guides/setup-wq-with-docker-desktop

### Docker Base Image

```bash
docker run ghcr.io/wq/base:main
```

### Python

```bash
python3 -m venv venv
. venv/bin/activate
python -m pip install wq
wq create myproject
```

### Node

```bash
npm init @wq myproject
```

### CDN
```html
<script type="module">
    import wq from 'https://unpkg.com/wq';
    wq.init({});
</script>
```

## Features

wq is made up of the following submodules, which are maintained as separate packages.

 Module                    | Github              | PyPI             | npm       | Description
---------------------------|---------------------|------------------|-----------|---------
[![wq][wq.svg]][wq/wq]     | [wq/wq][gh/wq]      | [wq][py/wq]      | [wq]      | Top level package (specifies submodules as dependencies)
[![wq.app][a.svg]][wq/a]   | [wq/wq.app][gh/a]   | [wq.app][py/a]   | [@wq/app] | A JavaScript+Python library for building robust offline-capable HTML5 data entry apps.
[![wq.build][b.svg]][wq/b]  | [wq/wq.build][gh/b]  | [wq.build][py/b]  |           | wq command line interface.
[![wq.create][c.svg]][wq/c] | [wq/wq.create][gh/c] | [wq.create][py/c] |           | Project template and scaffolding tools.
[![wq.db][d.svg]][wq/d]    | [wq/wq.db][gh/d]    | [wq.db][py/d]    |           | Django REST framework extension with design patterns for CRUD APIs.

[wq.svg]: https://wq.io/images/icons/wq.svg
[a.svg]: https://wq.io/images/icons/wq.app.svg
[b.svg]: https://wq.io/images/icons/wq.build.svg
[c.svg]: https://wq.io/images/icons/wq.create.svg
[d.svg]: https://wq.io/images/icons/wq.db.svg

[wq/wq]: https://wq.io/
[wq/a]: https://wq.io/wq.app/
[wq/b]: https://wq.io/wq.build/
[wq/c]: https://wq.io/wq.create/
[wq/d]: https://wq.io/wq.db/

[py/wq]: https://pypi.org/project/wq
[py/a]: https://pypi.org/project/wq.app
[py/b]: https://pypi.org/project/wq.build
[py/c]: https://pypi.org/project/wq.create
[py/d]: https://pypi.org/project/wq.db

[gh/wq]: https://github.com/wq/wq
[gh/a]: https://github.com/wq/wq.app
[gh/b]: https://github.com/wq/wq.build
[gh/c]: https://github.com/wq/wq.create
[gh/d]: https://github.com/wq/wq.db

[wq]: https://npmjs.com/package/wq
[@wq/app]: https://npmjs.com/package/@wq/app
