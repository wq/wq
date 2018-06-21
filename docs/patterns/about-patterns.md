---
order: 1
---

About wq.db's Design Patterns
===============

[wq.db.patterns]

To promote long term sustainability in data management projects, [wq.db] includes a design pattern framework that facilitates the creation of flexible database layouts.

The design patterns generally follow a schema similar to the [Entity-Attribute-Value (EAV)] data model.  EAV-style data models are part/icularly useful for building field data collection apps where the parameters being collected may change over time.  To add new parameter definitions, a project administrator can use a web interface (add rows), instead of needing to have a developer change the database schema (add columns).

> For an in-depth discussion of EAV and the related [ERAV] data model, see [Capturing Quality: Retaining Provenance for Curated Volunteer Monitoring Data](https://andrewsheppard.net/research/provenance-volunteer-monitoring/). The [vera] project provides an implementation of ERAV, which has better support than EAV for time series and tracking multiple versions of data.

The design patterns framework is provided via [wq.db.patterns].  See [Advanced Patterns] for more information.

## Included Generic Patterns

In [wq.db 1.0] and earlier, `wq.db.patterns` also included several generic EAV-style patterns out of the box.  However, we found domain-specific models (like [vera]) invariably tend to be more useful in real-world applications.  Thus, with the exception of [wq.db.patterns.identify], all of the generic patterns have been removed as of wq.db 1.1.  Some of these may be resurrected as standalone libraries if needed.

model | entity base class | attribute model | value model | description
------|--------|-----------|-------|-------------
[wq.db.patterns.identify] | `IdentifiedModel` | `Authority` | `Identifier` | Track entity identifiers assigned by multiple third party authorities

[wq.db.patterns]: https://github.com/wq/wq.db/blob/master/patterns
[wq.db]: https://wq.io/wq.db
[wq.db 1.0]: https://wq.io/1.0/docs/about-patterns
[Entity-Attribute-Value (EAV)]: https://wq.io/docs/eav-vs-relational
[vera]: https://wq.io/vera
[ERAV]: https://wq.io/docs/erav
[wq.db.patterns.identify]: https://wq.io/docs/identify
[Advanced Patterns]: https://wq.io/docs/nested-forms
