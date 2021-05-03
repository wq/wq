---
repo: wq.create
date: 2019-10-07
---

# wq.start 1.2 beta

**wq.start 1.2.0b1** introduces a new command-line flag, `--with-npm/--without-npm`, that toggles an alternative project layout based on [Create React App (CRA)](https://create-react-app.dev/) (see wq/wq#44).  Other template changes are documented in the release notes for [wq-django-template 1.2 beta](./wq-django-template-1.2.0b1.md).

Since the number of potentially useful flags is increasing, the `wq start` command now includes an interactive mode that prompts for each choice if not provided explicitly.  Type `wq start` without any arguments to go through the full process.

```bash
# Interactive
> wq start
Project codename: myapp
Directory [./myapp/]:
Web domain [myapp.example.org]:
Application Bundle ID [org.example.myapp]:
Enable GIS? (Requires PostGIS or SpatialLite) [y/N]: y
Enable NPM / Create React App? (Requires Node.js) [y/N]: y

Project "myapp" created successfully in ./myapp/ with GIS and NPM support.
Run npm install now? [y/N]: y
^C

# One-line
> wq start myapp ./myapp -d myapp.example.org -i org.example.myapp --with-gis --with-npm --npm-install
```
