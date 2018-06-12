---
order: 16
---

wq start
========

wq start: Start a new project with wq.app and wq.db.
Provided by [wq.start](https://wq.io/wq.start).

```shell
$ wq start --help

Usage: wq start [OPTIONS] PROJECT_NAME [DESTINATION]

  Start a new project with wq.app and wq.db.  A new Django project will be
  created from a wq-specific template.  After running this command, you may
  want to do the following:

      sudo chown www-data media/
      cd app
      wq init

  See https://wq.io/docs/setup for more tips on getting started with wq.

Options:
  -d, --domain TEXT  Web domain (e.g. example.wq.io)  [required]
  -i, --app-id TEXT  Application ID (e.g. io.wq.example)
  --help             Show this message and exit.
```
