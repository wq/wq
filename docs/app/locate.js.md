wq/locate.js
=========

[wq/locate.js]

**wq/locate.js** provides utilities for requesting the user's latitude and longitude, a common use case in many VGI, citizen science, and crowdsourcing applications.  Two utilities are provided:

  * The `locate.Locator` widget utilizes Leaflet and form `<input>`s to facilitate multiple ways of providing location information (e.g. GPS or a map click).
  * The `locate.locate()` function is a lower-level function for directly obtaining GPS coordinates.

## Locator widget

The Locator widget provides three modes for entering location information:

 * `gps`: Request position using device GPS or network location, if available.  Also returns GPS "accuracy" in meters.  To get more accurate measurements, the `gps` mode of the Locator widget continually polls location until the form is saved or a different mode is selected.
 * `interactive`: Allow user to click the map directly.  Accuracy is computed based on zoom level.
 * `manual`: Allow user to manually enter their latitude and longitude.

The entered coordinates are automatically displayed on a Leaflet map.  "Accuracy" is represented as a circle with the radius of the accuracy.

> **Pro-Tip: Save Accuracy In Your Database!**
>
> The accuracy number is a critical part of the location information - so don't discard it and only save the latitude and longitude.  Remember that accuracy is fundamentally different than precision: just because a GPS device returns latitude and longitude specified out to 9 decimal places, does not mean the user is actually at that exact location.  In fact, the inital measurement returned by many consumer GPS devices will often be "precise" but inaccurate, perhaps by several kilometers.  The accuracy measurement is thus an imperfect, but useful metric for evaluating the location information.  Keeping the GPS on for as long as possible is one way to get more accurate measurements, but it is still important to save the information in the database for future reference.
>
> Similarly, having a user tap the map to specify their location is practically guaranteed to provide inaccurate results unless they zoom in first.  For this reason, the `interactive` mode approximates an accuracy measurement based on zoom level (accuracy = 2 pixels of screen space converted to meters based on the zoom level).  Accuracy can serve as a reminder to the user to zoom in, or even to enforce a minimum level of accuracy in your form processing logic.

The Locator widget accepts two arguments: a Leaflet map object, and a mapping of jQuery-wrapped fields to use for setting and storing location information.  The expected fields are:

 * `toggle`: A set of radio buttons (or a select menu) that will change the widget mode.  The values for each option should be one or more the modes listed above.
 * `latitude`: A text input that will recieve (or provide) the latitude
 * `longitude`: A text input that will recieve (or provide) the longitude
 * `accuracy`: A text input that will recieve the computed accuracy

In addition to automatically updating the form inputs, the locator provides an `onupdate()` hook for custom handling of entered locations.

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
  <p id="loc-message"></p>
</div>

#### JS

```javascript
define(['jquery', 'leaflet', 'wq/locate'], function($, L, locate) {

// Create Leaflet map
var map = L.map('map-div-id');

// Initialize basemaps & location ...

// Configure Locator
var locator = locate.locator(map, {
    'toggle': $('input[name=mode]'),
    'latitude': $('input[name=latitude]'),
    'longitude': $('input[name=longitude]'),
    'accuracy': $('input[name=accuracy]')
});
// Equivalent:
// var locator = new locate.Locator(map, {...});

// Custom handler for location updates
locator.onupdate = function(loc, accuracy) {
    if (accuracy > 1000) {
        $('#message').html(
            "Note: your location accuracy appears to be off by more than 1km."
        );
    } else {
        $('#message').html("");
    }
}

});
```

#### HTML

```xml
<fieldset data-role="controlgroup" data-type="horizontal">
  <input type='radio' value='gps' id='loc-gps' name='mode'>
  <label for='loc-gps'>GPS</label>
  <input type='radio' value='interactive' id='loc-interactive' name='mode'>
  <label for='loc-interactive'>Interactive</label>
  <input type='radio' value='manual' id='loc-manual' name='mode'>
  <label for='loc-manual'>Manual</label>
</fieldset>
<div id='map-div-id'></div>
<div class='ui-grid-b'>
  <div class='ui-block-a ui-content'>
    Latitude
    <input name="latitude" type="number" step="0.0001">
  </div>
  <div class='ui-block-b ui-content'>
    Longitude
    <input name="longitude" type="number" step="0.0001">
  </div>
  <div class='ui-block-c'>
    Accuracy (m)
    <input name="accuracy" type="number" step="0.0001">
  </div>
</div>
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
