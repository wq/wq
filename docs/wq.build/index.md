---
permalink: /wq.build/
title: wq.build
wq_config:
   name: wqbuild
   url: wq.build
   show_in_index: false
---

![wq.build](https://wq.io/images/wq.build.svg)

**wq.build** (fomerly wq.core) provides the core `wq` command line application for use by [wq.app] and other modules in the [wq framework].

[![Latest PyPI Release](https://img.shields.io/pypi/v/wq.build.svg)](https://pypi.org/project/wq.build)
[![Release Notes](https://img.shields.io/github/release/wq/wq.build.svg)](https://github.com/wq/wq.build/releases)
[![License](https://img.shields.io/pypi/l/wq.build.svg)][license]
[![GitHub Stars](https://img.shields.io/github/stars/wq/wq.build.svg)](https://github.com/wq/wq.build/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/wq/wq.build.svg)](https://github.com/wq/wq.build/network)
[![GitHub Issues](https://img.shields.io/github/issues/wq/wq.build.svg)](https://github.com/wq/wq.build/issues)

[![Tests](https://github.com/wq/wq.build/actions/workflows/test.yml/badge.svg)](https://github.com/wq/wq.build/actions/workflows/test.yml)

## Getting Started

```bash
# Recommended: create virtual environment
# python3 -m venv venv
# . venv/bin/activate

# Install entire wq suite (recommended)
python3 -m pip install wq

# Install only wq.build
python3 -m pip install wq.build
```

## Command Line Reference

```bash
wq --help
```

See [the documentation][setup] for more information.

[wq framework]: ../index.md
[setup]: ../overviews/setup.md
[license]: ../license.md
