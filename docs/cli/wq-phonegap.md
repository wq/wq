---
order: 12
---

wq phonegap
===========

wq phonegap: Upload application to PhoneGap Build.
Provided by [wq.app](https://wq.io/wq.app).

```shell
$ wq phonegap --help

Usage: wq phonegap [OPTIONS] VERSION

  Upload application to PhoneGap Build.  Specifically,

  1. Create a working directory, if not present.
  2. Copy asset directory to working directory.
  3. (Optionally) Generate config.xml and index.html from mustache templates.
  4. Generate zip file.
  5. Request an authentication token from PhoneGap Build, if not present.
  6. Upload the zip file to PhoneGap build.
  7. Save the returned app ID for future builds.
  
  (Inspired by, but not dependent on, the `phonegap remote` api)

Options:
  --source PATH         Directory containing app assets
  --icon PATH           Source image for icons
  --splash PATH         Source image for splash screen (defaults to icon)
  --config-xml PATH     config.xml template
  --index-html PATH     index.html template
  --pgb-directory PATH  Temporary working directory (default .wq-pgb)
  --pgb-api TEXT        PhoneGap Build API URL
  --pgb-token-api TEXT  PhoneGap Build Token API URL
  --help                Show this message and exit.
```
