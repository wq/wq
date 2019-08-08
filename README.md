[![wq](https://raw.github.com/wq/wq/master/images/128/wq.png)](https://wq.io/)

[wq](https://wq.io) is a modular framework for citizen science field data collection via offline-capable mobile web apps.

## Getting Started

```bash
python3 -m venv venv
. venv/bin/activate
pip install wq
wq start -d myproject.example.com myproject
```
See [the documentation](https://wq.io/docs) for more information.
See <https://github.com/wq/wq/issues> to report any issues.

## Features

wq is made up of the following submodules, which are maintained as
separate packages.

 Module                    | PyPI             | Github              | Description
---------------------------|------------------|---------------------|---------
[![wq.app][a.png]][wq/a]   | [wq.app][py/a]   | [wq/wq.app][gh/a]   | A JavaScript+Python library for building robust offline-capable HTML5 data entry apps.
[![wq.core][c.png]][wq/c]  | [wq.core][py/c]  | [wq/wq.core][gh/c]  | wq command line interface.
[![wq.db][d.png]][wq/d]    | [wq.db][py/d]    | [wq/wq.db][gh/d]    | A collection of Django database models and REST framework to support design patterns common to data collection systems.
[![wq.io][i.png]][wq/i]    | [wq.io][py/i]    | [wq/wq.io][gh/i]    | A Python interoperability library for consuming and generating data resources in various formats.
[![wq.start][s.png]][wq/s] | [wq.start][py/s] | [wq/wq.start][gh/s] | Project template and scaffolding tools.

[a.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.app.png
[c.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.core.png
[d.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.db.png
[i.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.io.png
[s.png]: https://raw.githubusercontent.com/wq/wq/master/images/80/wq.start.png

[wq/a]: https://wq.io/wq.app
[wq/c]: https://wq.io/wq.core
[wq/d]: https://wq.io/wq.db
[wq/i]: https://wq.io/wq.io
[wq/s]: https://wq.io/wq.start

[py/a]: https://pypi.python.org/pypi/wq.app
[py/c]: https://pypi.python.org/pypi/wq.core
[py/d]: https://pypi.python.org/pypi/wq.db
[py/i]: https://pypi.python.org/pypi/wq.io
[py/s]: https://pypi.python.org/pypi/wq.start

[gh/a]: https://github.com/wq/wq.app
[gh/c]: https://github.com/wq/wq.core
[gh/d]: https://github.com/wq/wq.db
[gh/i]: https://github.com/wq/wq.io
[gh/s]: https://github.com/wq/wq.start
