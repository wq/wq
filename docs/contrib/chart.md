wq.db: chart
============

[wq.db.contrib.chart]

The **chart** module in [wq.db] provides a REST-ful web API that facilitates analysis of [vera] timeseries data.  Chart is an extension of [Django REST Pandas] with additional support for URL-based queryset filtering and box plot charting.  The name `chart` reflects the fact that the module is a natural backend component for [wq/chart.js].  However, chart can also be used as a spreadsheet export tool using the [format features] provided by Django REST Pandas.

At this time, the chart module is geared primarily towards use with the [vera.EventResult] model.  Support for arbitrary timeseries models is planned.

## Views

The chart module currently provides three main views, corresponding to the three main chart types provided in [wq/chart.js].

### TimeSeriesView
Provides a rest service for plotting one or more vera time series datasets (e.g. comparing multiple sites or multiple parameters at the same site).  The output is similar to the vanilla [PandasView] except that the table is pivoted so that the timestamps are on the left and each subsequent column is a dataset.  Intended for use with `chart.timeSeries()` in wq/chart.js.

### ScatterView
Provides a rest service for comparing data for two parameters against each other, assuming that the x axis will be one parameter and the y axis the other.  Only event timestamps where both parameters are present will be included in the output dataset.  Intended for use with `chart.scatter()` in wq/chart.js.

### BoxPlotView
Generates boxplot statistics for use with `chart.boxplot()` in wq/chart.js.  The statistics can be computed for the dataset(s) as a whole, or subdivided by year or month.  This view relies on `matplotlib.cbook.boxplot_stats()`, which is available in [matplotlib] 1.4.

## Filtering

The chart module includes a very flexible URL-based filtering mechanism that leverages the [identify] pattern.  Any relevant `IdentifiedModel` can be used to filter the `EventResult` set.  The chart views will take an arbitrary list of URL slugs and attempt to resolve them to `IdentifiedModels`.  For example, a URL of the form:

`http://website/chart/site1/param1/param2/timeseries.csv`

Will return two timeseries datasets, corresponding to each of two parameters measured at site1.  Similarly, a URL of the form:

`http://website/chart/site1/site2/param1/boxplot.csv`

will return boxplot data for the same parameter at two different sites.  Any `IdentifiedModel` can be used as long as there is a function on the view explaining how to apply that filter to the queryset.  For example, the built-in filters for site in parameter are defined like this:

```python
class ChartView(PandasView)
    # ...
    
    def filter_by_site(self, qs, ids):
        return qs.filter(event_site__in=ids)

    def filter_by_parameter(self, qs, ids):
        return qs.filter(result_type__in=ids)
    
    # ...
```

[wq.db.contrib.chart]: https://github.com/wq/wq.db/blob/master/contrib/chart
[wq.db]: http://wq.io/wq.db
[vera]: http://wq.io/vera
[vera.EventResult]: http://wq.io/vera
[wq/chart.js]: http://wq.io/docs/chart-js
[Django REST Pandas]: https://github.com/wq/django-rest-pandas
[format features]: https://github.com/wq/django-rest-pandas#supported-formats
[PandasView]: https://github.com/wq/django-rest-pandas#usage
[matplotlib]: https://github.com/matplotlib/matplotlib
[identify]: http://wq.io/docs/identify
