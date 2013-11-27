define(['d3', 'wq/chart', './chart.js-data'],
function(d3, chart, data) {

function main($elems) {
    var svg = d3.select($elems[0]);
    var plot = chart.timeSeries();
    svg.datum([data]).call(plot);
}

return main;

});
