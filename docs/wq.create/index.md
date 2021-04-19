---
permalink: /wq.create/
title: wq.create
wq_config:
  name: wqcreate
  url: wq.create
  show_in_index: false
---

![wq.create](https://wq.io/images/wq.create.svg)

**wq.create** (formerly wq.start) provides a simple command-line interface (`wq create`) for starting a new project with the [wq framework], with [wq.app] for the front end and [wq.db] as the backend.  wq.create also provides a `wq addform` command that can generate and configure new Django apps from an [XLSForm](http://xlsform.org) definition.

[**wq.create on GitHub**](https://github.com/wq/wq.create)

### Installation

```bash
# Recommended: create virtual environment
# python3 -m venv venv
# . venv/bin/activate
python3 -m pip install wq

wq create <projectname> [directory]
cd <projectname>/db
wq addform ~/my-odk-form.xlsx
```

See the [Getting Started] docs for more information.

### API

 * [`wq create <projectname> [directory]`][create]: Create a new Django project from the [wq Django template] and (optionally) the [@wq Create React App template][@wq/cra-template]
 * [`wq addform ~/my-odk-form.xlsx`][addform]: Create a new Django app from the provided XLSForm (uses [xlsform-converter])

[wq framework]: ../index.md
[wq.app]: ../wq.app/index.md
[wq.db]: ../wq.db/index.md
[wq Django template]: https://github.com/wq/wq-django-template
[@wq/cra-template]: ../@wq/cra-template.md
[xlsform-converter]: https://github.com/wq/xlsform-converter
[Getting Started]: ../overview/setup.md

[create]: ./create.md
[addform]: ./addform.md
