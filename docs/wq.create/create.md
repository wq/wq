wq create
=========

wq create: Start a new project with wq.app and wq.db.
Provided by [wq.create].

```shell
$ wq create --help

Usage: wq create [OPTIONS] [PROJECT_NAME] [DESTINATION]

  Start a new project with wq.app and wq.db.  A new Django project will be
  created from a wq-specific template.  Any options not specified via
  arguments will be prompted for instead.

  After running this command, you may want to do the following:

      sudo chown www-data media/
      ./deploy.sh 0.0.0

  See https://wq.io/overview/setup for more tips on getting started with wq.

Options:
  -d, --domain TEXT           Web domain (e.g. example.wq.io)
  -t, --title TEXT            Site title + App label
  --with-gis / --without-gis  Enable GeoDjango
  --with-npm / --without-npm  Enable NPM (& Create React App)
  --help                      Show this message and exit.
```

[wq.create]: ./index.md
