---
order: 11
---

wq mustache
===========

wq mustache: Render a mustache template into static HTML.
Provided by [wq.app](https://wq.io/wq.app).

```shell
$ wq mustache --help

Usage: wq mustache [OPTIONS]

  Render a mustache template into static HTML.  The template context can be
  provided via a nexted object in wq.yml, or by pointing to a folder
  containing JSON or YAML files.  Similarly, the partials can be defined as
  a nested object in wq.yml or by a folder path.

  Example YAML configuration:

  mustache:
      template: "<html><body>{{>header}}{{>footer}}</body></html>"
      partials:
          header: "<h3>{{title}}</h3>"
          footer: "<a href='mailto:{{email}}'>{{email}}</a>"
      context:
          title: "Example"
          email: "email@example.com"
      output: index.html

  Example command line configuration:

  wq mustache --template tmpl.html --partials partials/ --context conf/

Options:
  --template TEXT  Path to template
  --partials TEXT  Path to partials
  --context TEXT   Path to context (JSON or YAML)
  --output PATH    Output filename
  --help           Show this message and exit.
```
