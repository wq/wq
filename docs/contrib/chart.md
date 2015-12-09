wq.db: chart
============

[wq.db.contrib.chart]

As of [wq.db] 0.8.3, the core functionality that **wq.db: chart** provided has been refactored into other general purpose modules:

 * The ability to transform Pandas dataframes for use as time series, scatter, and box plot charts has been moved to [Django REST Pandas] and is available in DRP 0.4.0.
 * The ability to filter querysets based on any number of identifiers has been moved to [wq.db.patterns.identify]. 

For backwards compatibility and demonstration purposes, [wq.db.contrib.chart] still exists in the wq.db codebase, but it will be removed in wq.db 1.0.

[wq.db.contrib.chart]: https://github.com/wq/wq.db/blob/master/contrib/chart
[wq.db]: https://wq.io/wq.db
[Django REST Pandas]: https://github.com/wq/django-rest-pandas
[wq.db.patterns.identify]: https://wq.io/docs/identify
