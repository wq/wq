---
order: 2
---

wq addform
==========

wq addform: Convert an XLSForm into a Django app for wq.
Provided by [wq.start](https://wq.io/wq.start).

```shell
$ wq addform --help

Usage: wq addform [OPTIONS] XLSFORM

  Convert an XLSForm into a Django app for wq.  Generates Python and
  mustache files including:

      db/[form_name]/models.py
      db/[form_name]/rest.py
      templates/[form_name]_detail.html
      templates/[form_name]_edit.html
      templates/[form_name]_list.html

Options:
  --input-dir PATH           Source / master templates
  --django-dir PATH          Root of Django project
  --template-dir PATH        Path to shared template directory
  --form-name TEXT           Name to use for Django app and template prefix
  --with-admin / --no-admin  Generate admin.py
  -f, --force                Answer yes to all prompts
  --help                     Show this message and exit.
```
