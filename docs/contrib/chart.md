wq.db: chart
============

[wq.db.contrib.chart]

The **chart** module in [wq.db] provides a REST-ful web API that facilitates analysis of timeseries data.  Chart is an extension of [Django REST Pandas] with additional support for URL-based queryset filtering and box plot charting.  The name `chart` reflects the fact that the module is a natural backend component for [wq/chart.js].  However, chart can also be used as a spreadsheet export tool using the [format features] provided by Django REST Pandas.

The chart module was originally created for use with the [vera] `EventResult` model, but it can be used with any time series model with minimal configuration.

## Views

The chart module currently provides three main views, corresponding to the three main chart types provided in [wq/chart.js].

### TimeSeriesView
Provides a rest service for plotting one or more time series datasets (e.g. comparing multiple sites or multiple parameters at the same site).  The output is similar to the vanilla [PandasView] except that the table is pivoted so that the timestamps are on the left and each subsequent column is a dataset.  Intended for use with `chart.timeSeries()` in wq/chart.js.

### ScatterView
Provides a rest service for comparing data for two parameters against each other, assuming that the x axis will be one parameter and the y axis the other.  Only event timestamps where both parameters are present will be included in the output dataset.  Intended for use with `chart.scatter()` in wq/chart.js.

### BoxPlotView
Generates boxplot statistics for use with `chart.boxplot()` in wq/chart.js.  The statistics can be computed for the dataset(s) as a whole, or subdivided by year or month.  This view relies on `matplotlib.cbook.boxplot_stats()`, which is available in [matplotlib] 1.4.

## URL-based Filtering

The chart views include a very flexible URL-based filtering mechanism that leverages the [identify] pattern.  For example, a URL of the form:

`http://website/chart/site1/param1/param2/timeseries.csv`

might return two timeseries datasets, corresponding to each of two parameters measured at site1.  Similarly, a URL of the form:

`http://website/chart/site1/site2/param1/boxplot.csv`

might return boxplot data for the same parameter at two different sites.

### Model-specific Filters
Any relevant `IdentifiedModel` can be used to filter the queryset.  These models would generally be referenced via direct or indirect `ForeignKey` relationships from the time series model.  To perform the filtering, the URL will be split into slugs, which will be matched against the `Identifier` database to resolve them into model names and primary keys.

Once the model names and primary keys are identified, the chart views will search for functions of the form `filter_by_[model]()` defined on the view.  The filter functions should accept a queryset and a list of primary keys.  For example, filters for vera's `Site` and `Parameter` models are defined in [vera.views.ChartView] like this:

```python
from wq.db.contrib.chart import views as chart
class ChartView(chart.ChartView):
    # ...
    
    def filter_by_site(self, qs, ids):
        return qs.filter(event_site__in=ids)

    def filter_by_parameter(self, qs, ids):
        return qs.filter(result_type__in=ids)
    
    # ...
```

Any unrecognized identifiers in the URL will be passed as-is to the function `filter_by_extra(qs, slugs)`.  The default implementation of this function will simply ignore the unknown identifiers unless `ignore_extra = False` is set on the view.

### `urls.py` Configuration
To leverage the URL-based filters, you will want to configure your `urls.py` with something like the following.

```python
from django.conf.urls import patterns, include, url
from wq.db.contrib.chart.urls import make_urls

from myapp.views import TimeSeriesView, ScatterView, BoxPlotView
chart_urls = make_urls({
    'timeseries': TimeSeriesView,
    'scatter': ScatterView,
    'boxplot': BoxPlotView,
})

urlpatterns = patterns('',
    url(r'^chart', include(chart_urls))
)
```

Alternatively, you can register a single view by directly leveraging the `ids` regex defined by the chart module:

```python
from django.conf.urls import patterns, include, url
from wq.db.contrib.chart.urls import ids

from myapp.views import TimeSeriesView

urlpatterns = patterns('',
    url(r'^chart/' + ids + '/timeseries$', TimeSeriesView.as_view())
)
```

## Configuring the Serializer

The chart views are meant to be used with a special [ChartModelSerializer] class with additional details about the fields on the time series model.  The following attributes are defined:

 name | default | purpose
------|--------- | ------
`key_fields` | `["series", "date"]` | Fields on the time series that uniquely identify each individual event (an event is analogous to a row in a spreadsheet).
`parameter_fields` | `["parameter", "units"]` | The fields describing individual parameters/characteristics/attributes measured for each event (analogous to a columns in a spreadsheet).
`value_field` | `"value"` | The numeric field containing the actual series data (e.g individual cells in a spreadsheet).
`key_lookups` | `serializer.key_fields` | The sources of the key field data, if different than `key_fields`
`key_model` | `serializer.Meta.model` | The model containing the key fields, if different than the time series model (e.g if an [ERAV]-style data structure is being used)
`parameter_lookups` | `serializer.parameter_fields` | The sources of the parameter data, if different than `parameter_fields`
`value_lookup` | `serializer.value_field` | The source of the value data, if different than `value_field`.

See vera's [EventResultSerializer] for an example of how to customize `ChartSerializer`.  Be sure to set the `serializer_class` on your custom chart view as in [vera.views.ChartView].

[wq.db.contrib.chart]: https://github.com/wq/wq.db/blob/master/contrib/chart
[wq.db]: https://wq.io/wq.db
[vera]: https://wq.io/vera
[wq/chart.js]: https://wq.io/docs/chart-js
[Django REST Pandas]: https://github.com/wq/django-rest-pandas
[format features]: https://github.com/wq/django-rest-pandas#supported-formats
[PandasView]: https://github.com/wq/django-rest-pandas#usage
[matplotlib]: https://github.com/matplotlib/matplotlib
[identify]: https://wq.io/docs/identify
[vera.views.ChartView]: https://github.com/wq/vera/blob/master/vera/views.py
[ChartModelSerializer]: https://github.com/wq/wq.db/blob/master/contrib/chart/serializers.py
[PandasSerializer]: https://github.com/wq/django-rest-pandas/#implementation-notes
[ERAV]: https://wq.io/docs/erav
[EventResultSerializer]: https://github.com/wq/vera/blob/v0.7.0/vera/serializers.py#L74-L107
