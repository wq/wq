wq/chart.js
========
[wq/chart.js]

**wq/chart.js** is a [wq.app module] providing [reusable charts] powered by the excellent [d3] library.  Four basic chart types (scatter, timeSeries, boxplot, contour) are included, as well as the ability to create new chart types.

## Basic usage
The chart functions return a [configurable function] that can be called on an d3 selection that already has data bound to it.  By convention, the generated chart function is referred to as `plot` to differentiate it from the chart module.  However, any variable name can be used.

```javascript
var svg = d3.select('svg#chart');
var plot = chart.timeSeries()
    .width(800)
    .height(300);
svg.datum([dataset]).call(plot);
```
The `dataset` in the example above would typically be a JavaScript object of the form:
```javascript
{
  'id': 'temp-data',
  'label': 'Temperature',
  'units': 'C'
  'list': [
    {'date': '2013-09-26', 'value': 26},
    {'date': '2013-09-27', 'value': 23},
    // ...
  ]
}
```

<svg data-interactive style="width:700px;height:300px"></svg>

## Chart Options
The core chart generator ([chart.base()]) includes a number of built-in setup routines that are utilized by each of the four chart types.  All chart types inherit the base chart options, and some include additional options unique to each chart.  All options have reasonable defaults that can be re-configured using d3-style [getter/setter functions].

### Options
These options control basic chart formatting and layout.

| Option | Default | Purpose |
|--------|---------|---------|
| `plot.width(val)` | `700` | Sets the drawing width in pixels (including margins).  The `<svg>` object should generally have the same dimensions.
| `plot.height(val)` | `300`| Sets the drawing height in pixels (including margins).
| `plot.margins(obj)` | `{'left': 80, 'right': 10,`<br>`'top': 10, 'bottom': 30}` | Margins to leave between the actual plot and the edge of the SVG graphic.
| `plot.xscale(obj)` | auto | Domain of x values in the dataset.  If unset, will be automatically determined from the data and optionally "niced" to a round range.  If set, should be an object of the form `{'xmin': val, 'xmax': val}`.
| `plot.xscalefn(fn)` | `d3.scale.linear` | Actual d3 function to use to generate the scale.
| `plot.xnice(fn)` | `null` | Function to use to generate a nice scale.
| `plot.yscales(obj)` | auto | Domain(s) of y values in the dataset.  If unset, will be automatically determined from the data and niced to a round range.  If there are multiple datasets with different units, a separate yscale will be computed for each unit.  If set, should be an object of the form `{unit1: {'ymin': val, 'ymax': val}, unit2: {'ymin': val, 'ymax': val}`
| `plot.yscalefn(fn)` | `d3.scale.linear` | Actual d3 function to use to generate the y scale(s)

### Accessors
Accessors control how the data object is parsed.  Overriding the defaults makes it possible to chart data objects that may not be of the format shown above.

| Option | Default | Purpose |
|--------|---------|---------|
| `plot.id(fn(dataset))` | `dataset.id` | Unique identifier for the dataset as a whole.
| `plot.label(fn(dataset))` | `dataset.label` | Label to be shown in the legend.
| `plot.items(fn(dataset))` | `dataset.list` | Accessor for the actual data values to be plotted.
| `plot.yunits(fn(dataset))` | `dataset.units` | Units for the dataset y values (determines which y scale will be used).
| `plot.xunits(fn(dataset))` | `unset` | Units for the dataset x values.  Defined differently by each chart type.
| `plot.xvalue(fn(d))` | `unset` | Accessor for x values of individual data points.  Defined differently by each chart type.
| `plot.xmin(fn(dataset))` | `d3.min(items,xvalue)` | Function to determine minimum x value of the dataset.
| `plot.xmax(fn(dataset))` | `d3.max(items,xvalue)` | Function to determine maximum x value of the dataset.
| `plot.yvalue(fn(d))` | `unset` | Accessor for x values of individual data points.  Defined differently by each chart type.
| `plot.ymin(fn(dataset))` | `d3.min(items,yvalue)` | Function to determine minimum y value of the dataset.
| `plot.ymax(fn(dataset))` | `d3.max(items,yvalue)` | Function to determine maximum y value of the dataset.
 
## Scatter plots
[chart.scatter()] returns a function useful for drawing basic x-y scatterplots.

### Default Overrides
`scatter` defines and/or overrides the following base chart defaults:

| Option | scatter Default |
|--------|-----------------|
| `plot.xvalue(fn(d))` | `d.x` |
| `plot.xunits(fn(dataset))` | `dataset.xunits` |
| `plot.yvalue(fn(d))` | `d.y` |
| `plot.yunits(fn(dataset))` | `dataset.yunits` |
    
### Additional Options
Scatter extends the base chart with two new options:

| Option | Default | Purpose |
|--------|---------|---------|
| `plot.cscale(fn)` | `d3.scale.category20()` | Color scale to use (one color for each dataset)
| `plot.legend(obj)` | auto | Legend size and position (`'right'` or `'bottom'`).  If position is `'right'`, `size` refers to the width of the legend, while if position is `'bottom'`, `size` refers to the height.  The default is to place the legend on the bottom if there are 5 or fewer datasets, and on the right if there are more.

## Time series plots
[chart.timeSeries()] is a simple extension to `scatter` that assumes time as the x value.

### Default Overrides
`timeSeries` defines and/or overrides the following `scatter` chart defaults:

| Option | timeSeries Default |
|--------|--------------------|
| `plot.xvalue(fn(d))` | `timeFormat.parse(d.date)` |
| `plot.yvalue(fn(d))` | `d.value` |
| `plot.xscalefn(fn)` | `d3.time.scale` |
| `plot.xnice(fn)` | `d3.time.year` |
    
### Additional Options
Scatter extends the base chart with one new option:

| Option | Default | Purpose |
|--------|---------|---------|
| `plot.timeFormat(val)` | `"%Y-%m-%d"` | Format string (converted to function) to use to parse time values.

## Box & whisker plots

[chart.boxplot()] returns a function useful for rendering simple box-and-whisker plots.  (Note that the "whisker" part has yet to be implemented).  The quartile data for each box should be precomputed.  Currently `boxplot` expects each `dataset` to have the following format:

```javascript
{
  'id': 'temp-data',
  'label': 'Temperature',
  'units': 'C'
  'list': [
    {
      'year': "2013",
      'min': 3,
      'p25', 8
      'median': 17,
      'p75': 20,
      'max': 25
    }
    // ...
  ]
}
```

The x value (`year` in the above example) is used to define an ordinal scale where each item on the x axis corresponds to a box.  Thus, any text or numeric attribute can be defined as the x value, provided that the `xvalue` accesor is defined.

```javascript
var plot = chart.boxplot().xvalue(function(d) { return d.year });
```

The maximum, minimum, median, and 25th and 75th percentiles must be defined with the attribute names shown in the above example.  In the future the boxplot function will support custom accessors for these values as well.

## Custom Charts
The base chart provides "hooks" that allow for specifying the chart rendering process before, during, and after each dataset is rendered.  Each of the chart types above defines one or more of these functions.  They can also be used if you want to define a new chart type or significantly alter the behavior of one of the existing types.

| Option | Purpose |
|--------|---------|
| `plot.init(fn(datasets))` | Initial chart configuration.  If defined, the init function will be passed an array of all of the datasets.
| `plot.init(fn(dataset))` | Actual rendering routine for each dataset.
| `plot.wrapup(fn(datasets, opts))` | Wrapup routine, useful for drawing e.g. legends.  `opts` will be an object containing computed widths and heights for the actual chart inner and outer drawing areas.

To define your own chart function generator, you could do something like the following:

```javascript
function myChart() {
    var plot = chart.base()
        .render(render);

    function render(dataset) {
        var items = plot.items()(dataset);
        d3.select(this)
           .selectAll('g.data')
           .data(items)
           .append('g').attr('class', 'data')
           /* do something cool with d3 */
    }

    return plot;
}

var plot = myChart();
svg.datum([dataset]).call(plot);
```

[wq.app module]: http://wq.io/docs/app
[wq/chart.js]: https://github.com/wq/wq.app/blob/master/js/wq/chart.js
[d3]: http://d3js.org
[reusable charts]: http://bost.ocks.org/mike/chart/
[configurable function]: http://bost.ocks.org/mike/chart/#configuration
[getter/setter functions]: http://bost.ocks.org/mike/chart/#reconfiguration
[chart.base()]: https://github.com/wq/wq.app/blob/master/js/wq/chart.js#L21-L356
[chart.scatter()]: https://github.com/wq/wq.app/blob/master/js/wq/chart.js#L358-L498
[chart.timeSeries()]: https://github.com/wq/wq.app/blob/master/js/wq/chart.js#L500-L522
[chart.boxplot()]: https://github.com/wq/wq.app/blob/master/js/wq/chart.js#L556-L662
