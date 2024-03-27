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
      db/[form_name]/serializers.py (if applicable)
      db/[form_name]/admin.py (if requested)
      db/[form_name]/wizard.py (if requested)

Options:
  --django-dir PATH            Root of Django project
  --form-name TEXT             Name to use for Django app package directory
  --with-admin / --no-admin    Generate admin.py
  --with-wizard / --no-wizard  Generate wizard.py
  -f, --force                  Answer yes to all prompts
  --help                       Show this message and exit.
```

[wq.create]: ./index.md
