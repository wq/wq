wq/locate.js
=========

[wq/locate.js]

**wq/locate.js** is a simple wrap

## Locator widget

A common use case in many VGI, citizen science, and crowdsourcing applications is requesting location.

### Example

<div data-interactive id='locator-example'>
  <fieldset data-role="controlgroup" data-type="horizontal">
    <input type='radio' value='gps' id='loc-gps' name='mode'>
    <label for='loc-gps'>GPS</label>
    <input type='radio' value='interactive' id='loc-interactive' name='mode'>
    <label for='loc-interactive'>Interactive</label>
    <input type='radio' value='manual' id='loc-manual' name='mode'>
    <label for='loc-manual'>Manual</label>
  </fieldset>
  <div id='loc-map' style='height:300px;background:#ccc;border:1px solid black'></div>
  <div class='ui-grid-b'>
    <div class='ui-block-a ui-content'>
      Latitude
      <input id="loc-lat" type="number" step="0.0001">
    </div>
    <div class='ui-block-b ui-content'>
      Longitude
      <input id="loc-long" type="number" step="0.0001">
    </div>
    <div class='ui-block-c'>
      Accuracy (m)
      <input id="loc-acc" type="number" step="0.0001">
    </div>
  </div>
</div>

```javascript
define(['jquery', 'leaflet', 'wq/locate'], function($, L, locate) {

// Create Leaflet map
var map = L.map('map-div-id');

// Initialize basemaps & location ...

// Configure Locator
locate.Locator(map, {
    'latitude': $('#latitude'),
    'longitude': $('#longitude'),
    'accuracy': $('#accuracy'),
    'toggle': $('#toggle')
});

});
```

## locate()

You can also request a location programmatically with the lower level locate() function.  This function which provides a simple wrapper around Leaflet's `L.Map.locate()` API (but without requiring an existing map).

### Example

<div data-interactive id='simple-example'>
  <div class='ui-grid-b'>
    <div class='ui-block-a ui-content'>
      <button>Get Location</button>
    </div>
    <div class='ui-block-b ui-content'>
    </div>
    <div class='ui-block-c ui-content'>
      <p></p>
    </div>
  </div>
</div>

```javascript
define(['jquery', 'wq/locate'], function($, locate) {

locate.locate(success, error);

function success(evt) {
   var lat = evt.latlng.lat, lng = evt.latlng.lng;
   $('.output').html("Location: " + lat + ", " + lng);
}

function error(evt) {
   $('.output').html("Error retrieving location.");
}
});
```

### Advanced Options

Additional options...

[wq/locate.js]: https://github.com/wq/wq.app/blob/master/js/wq/locate.js
