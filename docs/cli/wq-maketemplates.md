---
order: 9
---

wq maketemplates
================

wq maketemplates: Generate mustache templates for wq.db.rest.
Provided by [wq.start](https://wq.io/wq.start).

```shell
$ wq maketemplates --help

Usage: wq maketemplates [OPTIONS]

  Generate mustache templates for wq.db.rest.  Automatically discovers all
  registered models through ./manage.py dump_config.

      templates/[model_name]_detail.html
      templates/[model_name]_edit.html
      templates/[model_name]_list.html

Options:
  --input-dir PATH     Source / master templates
  --django-dir PATH    Root of Django project
  --template-dir PATH  Path to shared template directory
  -f, -overwrite       Replace existing templates
  --help               Show this message and exit.
```
