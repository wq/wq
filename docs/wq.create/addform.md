wq addform
==========

wq addform: Convert an XLSForm into a Django app for wq.
Provided by [wq.create].

```shell
$ wq addform --help

Usage: wq addform [OPTIONS] XLSFORM

  Convert an XLSForm into a Django app for wq.  Generates Python and mustache
  files including:

      db/[form_name]/models.py
      db/[form_name]/rest.py
      templates/[form_name]_detail.html (if applicable)
      templates/[form_name]_edit.html (if applicable)
      templates/[form_name]_list.html (if applicable)

  Note that Mustache templates are only used for projects generated with
  wq.start 1.2 and earlier, which use the @wq/jquery-mobile renderer. Newer
  projects leverage the @wq/react + @wq/material renderer, which uses React
  components instead of Mustache templates.

Options:
  --input-dir PATH             Source / master templates
  --django-dir PATH            Root of Django project
  --template-dir PATH          Path to shared template directory
  --form-name TEXT             Name to use for Django app and template prefix
  --with-admin / --no-admin    Generate admin.py
  --with-wizard / --no-wizard  Generate wizard.py
  -f, --force                  Answer yes to all prompts
  --help                       Show this message and exit.
```

[wq.create]: ./index.md
