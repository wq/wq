define(['leaflet', 'wq/locate', 'wq/map'],
function(L, locate, map) {

L.Icon.Default.imagePath = "/css/lib/images";

function main($elems) {
    simple($elems.filter('#simple-example'));
    locator($elems.filter('#locator-example'));
}

function simple($elems) {
    $elems.find('button').click(function() {
        locate.locate(success, error);
    });

    function success(evt) {
        var lat = evt.latlng.lat, lng = evt.latlng.lng;
        $elems.find('p').html("Location: " + lat + ", " + lng);
    }
    function error(evt) {
        $elems.find('p').html("Error retrieving location.");
    }
}

function locator($elems) {
    var m = L.map($elems.find('#loc-map')[0]).setView([45, -93.25], 8);
    var basemaps = map.createBasemaps();
    var basemap = basemaps[Object.keys(basemaps)[0]];
    basemap.addTo(m);
    var fields = {
       'latitude': $elems.find('#loc-lat'),
       'longitude': $elems.find('#loc-long'),
       'accuracy': $elems.find('#loc-acc'),
       'toggle': $elems.find('input[name=mode]')
    }
    var opts = {};
    opts.onUpdate = function(loc, accuracy) {
        if (accuracy > 1000) {
            $elems.find('#loc-message').html(
                "Note: your location accuracy appears to be off by more than 1km."
            );
        } else {
            $elems.find('#loc-message').html("");
        }
    };
    locate.locator(m, fields, opts);
}

return main;

});
