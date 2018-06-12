---
order: 5
---

wq build
========

wq build: Compile and optimize an application.
Provided by [wq.app](https://wq.io/wq.app).

```shell
$ wq build --help

Usage: wq build [OPTIONS] VERSION

  Compile and optimize an application.

  Runs the following in order:
      wq init
      wq setversion
      wq collectjson (if configured)
      wq scss        (if configured)
      wq mustache    (if configured)
      wq optimize
      wq babel       (if configured)
      wq appcache    (if configured)

Options:
  --help  Show this message and exit.
```
