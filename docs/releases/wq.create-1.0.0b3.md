---
repo: wq.create
date: 2016-11-08
---

# wq.start 1.0 beta 3

**wq.start 1.0.0b3** brings a few Django compatibility fixes and the following improvements to [xlsconv](https://github.com/wq/xlsconv)-powered template generator (`wq maketemplates`).
- Better handling of `group` and `repeat` question types (i.e. nested serializers with or without `many=True`)
- Always set `has_geo` if `map` is defined in the page configuration.
- Only generate templates for registered modes (`list`, `detail`, & `edit` by default)
