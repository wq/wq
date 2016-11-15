define(['wq/photos', 'leaflet', 'wq/map', 'leaflet.draw'],
function(photos, L, map) {

L.Icon.Default.imagePath = "/css/lib/images";

return main;

function main($elems) {
    photos.run('doc', 'detail', 'field-types');
    makeMap($elems.filter('#point-map')[0], 'marker');
    makeMap($elems.filter('#linestring-map')[0], 'polyline');
    makeMap($elems.filter('#polygon-map')[0], 'polygon');
}

function makeMap(elem, type) {
    var m = L.map(elem).setView([45, -93.25], 8);
    var basemaps = map.createBasemaps();
    var basemap = basemaps[Object.keys(basemaps)[0]];
    basemap.addTo(m);
    var opts = {
        'circle': false,
        'marker': false,
        'polyline': false,
        'polygon': false,
        'rectangle': false
    };
    opts[type] = {};
    new L.Control.Draw({
        'draw': opts,
        'edit': {'featureGroup': new L.FeatureGroup()}
    }).addTo(m);
}

return main;

});
