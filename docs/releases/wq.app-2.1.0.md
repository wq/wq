---
repo: wq.app
date: 2024-03-27
tag: latest
tag_color: primary
---

# wq.app 2.1

**wq.app 2.1.0** is the first release of the wq.app 2.1 series!  Be sure to check out the [latest documentation](../index.md) and the [release notes for wq 2.1](./wq-2.1.0.md) when upgrading.

All changes by [@sheppard](https://github.com/sheppard).

 * Fix default component lookup in [AutoSubformArray](../components/AutoSubformArray.md) ([`2cf4d59`](https://github.com/wq/wq.app/commit/2cf4d59))
 * Update [Index view](../views/Index.md) to support expandable sections in site map ([`2cf4d59`](https://github.com/wq/wq.app/commit/2cf4d59))
 * Detect wq.db's new MVT service and generate default styles for [VectorTile](../overlays/VectorTile.md) via new [useStyleProp](../hooks/useStyleProp.md) hook ([`8849220`](https://github.com/wq/wq.app/commit/8849220), [`68b4fc4`](https://github.com/wq/wq.app/commit/68b4fc4))
 * Improve support for [natural keys](https://github.com/wq/django-natural-keys) ([`f08d7fd`](https://github.com/wq/wq.app/commit/f08d7fd))
 * New [ForeignKeyLink](../components/ForeignKeyLink.md), [ManyToManyLink](../components/ManyToManyLink.md), and [RelatedLinks](../components/RelatedLinks.md) components for use in the [DefaultDetail view](../views/DefaultDetail.md) ([`f08d7fd`](https://github.com/wq/wq.app/commit/f08d7fd))
 * Load deferred geojson before editing ([`68b4fc4`](https://github.com/wq/wq.app/commit/68b4fc4))
