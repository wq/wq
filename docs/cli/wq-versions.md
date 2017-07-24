---
order: 16
---

wq versions
===========

wq versions: List installed modules and dependencies.
Provided by [wq.core](https://wq.io/wq.core).

```shell
$ wq versions --help

Usage: wq versions [OPTIONS] [LIBRARIES]...

  List installed modules and dependencies.  Specify one or more packages to
  show their dependencies instead of wq's.  (Useful for generating a
  requirements.txt when pip freeze returns extraneous system packages.)

Options:
  --output TEXT  Output filename
  --help         Show this message and exit.
```
