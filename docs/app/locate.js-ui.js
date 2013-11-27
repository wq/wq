define(['leaflet', 'wq/locate', 'wq/map'],
function(L, locate, map) {

function main($elems) {
    var m = L.map($elems[0]).setView([45, -93.25], 8);
    var basemaps = map.createBaseMaps();
    basemaps['Street'].addTo(m);
}

return main;

});
