define(['d3', 'wq/chart', 'wq/pandas'],
function(d3, chart, pandas) {

function main($elems) {
    var name, $svg;
    for (name in charts) {
        var $svg = $elems.filter("[data-interactive='" + name + "']")
        charts[name](d3.select($svg[0]));
    }
}

var charts = {
    "top": function(svg) {
        var plot = chart.timeSeries()
            .id(function(dataset){ return dataset['site id'] })
            .label(function(dataset){ return dataset['site name'] })
            .height(400);
        pandas.get("/media/data/top.csv", function(data) {
            svg.datum(data).call(plot);
        });
    },
    "scatter": function(svg) {
        var xval = "Chromium (mg/L)";
        var yval = "Lead (mg/L)";
        var plot = chart.scatter()
            .drawPointsIf(function(dataset) { return true })
            .drawLinesIf(function(dataset) { return false })
            .label(function(dataset) { return xval + " vs. " + yval })
            .xvalue(function(d) { return d[xval] })
            .yvalue(function(d) { return d[yval] })
            .pointLabel(function(datasetId) {
                return function(d) {
                    return xval + ": " + d[xval] + ", " + yval + ": " + d[yval];
                }
            });

        pandas.get("/media/data/scatter.csv", function(data) {
            svg.datum(data).call(plot);
        });
    },
    "timeSeries": function(svg) {
        var plot = chart.timeSeries()
            .id(function(dataset){ return dataset['site id'] })
            .label(function(dataset){ return dataset['site name'] })
            .height(400);
        pandas.get("/media/data/series.csv", function(data) {
            svg.datum(data).call(plot);
        });
    },
    "boxplot": function(svg) {
        var plot = chart.boxplot()
            .id(function(dataset){ return dataset.site })
            .label(function(dataset){ return dataset.site })
            .xvalue(function(d){return d.year})
            .legend({'size': 80, 'position': 'right'});

        pandas.get("/media/data/boxplot.csv", function(data) {
            svg.datum(data).call(plot);
        });
    }
};

return main;

});
