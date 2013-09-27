chart.js
========
**[chart.js]** is an implementation of [reusable charts] powered by the excellent [d3] library.  Four basic chart types (scatter, timeSeries, boxplot, contour) are included, as well as the ability to create new chart types.

## Basic usage
The chart functions return a [configurable function] that can be called on an d3 selection that already has data bound to it.  By convention, the generated chart function is referred to as `plot` to differentiate it from the chart module.  However, any variable name can be used.

```javascript
var svg = d3.select('svg#chart');
var plot = chart.timeSeries()
    .width(800)
    .height(300);
svg.datum([data]).call(plot);
```
## Available Charts and Options
The [base chart] generator includes a number of built in setup routines that are utilized by each of the four chart types.  All chart types inherit the base chart options, and some include additional options unique to each chart.  All options have reasonable defaults that can be re-configured using d3-style [getter/setter functions].

### All Charts

| Option | Default | Purpose |
|--------|---------|---------|
| `plot.width(val)` | 700 | Sets the chart width in pixels.

### Chart Types


[chart.js]: https://github.com/wq/wq.app/blob/master/js/chart.js
[d3]: http://d3js.org
[reusable charts]: http://bost.ocks.org/mike/chart/
[configurable function]: http://bost.ocks.org/mike/chart/#configuration
[getter/setter functions]: http://bost.ocks.org/mike/chart/#reconfiguration
[base chart]: https://github.com/wq/wq.app/blob/master/js/chart.js#L21-L356