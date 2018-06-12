---
deprecated: true
---

wq.db: chart
============

The core functionality that **wq.db: chart** provided has been refactored into other general purpose modules:

 * The ability to transform Pandas dataframes for use as time series, scatter, and box plot charts has been moved to [Django REST Pandas].
 * The ability to filter querysets based on any number of identifiers has been moved to [wq.db.patterns.identify]. 

[Django REST Pandas]: https://github.com/wq/django-rest-pandas
[wq.db.patterns.identify]: https://wq.io/docs/identify
