---
order: 12
---

wq/locate.js
=========

[wq/locate.js]

**wq/locate.js** provides utilities for requesting the user's latitude and longitude, a common use case in many VGI, citizen science, and crowdsourcing applications.

## API

`wq/locate.js` is typically imported via [AMD] as `locate`, though any local variable name can be used.

```javascript
// myapp.js
define(['wq/locate', ...], function(locate, ...) {
    locate.locate(...);
});
```

The locate module provides the following methods and properties:

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
> The accuracy number is a critical part of the location information - so don't discard it and only save the latitude and longitude.  Remember that accuracy is fundamentally different than precision: just because a GPS device returns latitude and longitude specified out to 9 decimal places, does not mean the user is actually at that exact location.  In fact, the initial measurement returned by many consumer GPS devices will often be "precise" but inaccurate, perhaps by several kilometers.  The accuracy measurement is thus an imperfect, but useful metric for evaluating the location information.  Keeping the GPS on for as long as possible is one way to get more accurate measurements, but it is still important to save the information in the database for future reference.
>
> Similarly, having a user tap the map to specify their location is practically guaranteed to provide inaccurate results unless they zoom in first.  For this reason, the `interactive` mode approximates an accuracy measurement based on zoom level (accuracy = 2 pixels of screen space converted to meters based on the zoom level).  Accuracy can serve as a reminder to the user to zoom in, or even to enforce a minimum level of accuracy in your form processing logic.

The Locator widget accepts up to three arguments: a Leaflet map object, a mapping of jQuery-wrapped `fields` to use for setting and storing location information, and an optional `config` object.  The expected `fields` are:

 * `toggle`: A set of radio buttons (or a select menu) that will change the widget mode.  The values for each option should be one or more the modes listed above.
 * `latitude`: A text input that will receive (or provide) the latitude
 * `longitude`: A text input that will receive (or provide) the longitude
 * `accuracy`: A text input that will receive the computed accuracy

If specified, the locator `config` option should have up to three callback functions that will be executed at various points in the process:

 * `onSetMode(mode)`: Called whenever the locator mode changes, e.g. in response to the user clicking the `toggle` button.
 * `onUpdate(location, accuracy)`: Called when ever a new location is determined.
 * `onError(event)`: Called when GPS lookup fails.

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

var fields = {
    'toggle': $('input[name=mode]'),
    'latitude': $('input[name=latitude]'),
    'longitude': $('input[name=longitude]'),
    'accuracy': $('input[name=accuracy]')
};

var config = {
    // Custom handler for location updates
    'onUpdate': function(loc, accuracy) {
        if (accuracy > 1000) {
            $('#message').html(
                "Note: your location accuracy appears to be off by more than 1km."
            );
        } else {
            $('#message').html("");
        }
    }
}

var locator = locate.locator(map, fields, config);
// Equivalent:
// var locator = new locate.Locator(map, fields, options);


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

// Request location once & show result
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

`locate.locate()` takes up to 5 arguments:

 - a `success` callback
 - an `error` callback
 - `highAccuracy` boolean, equivalent to `opts.enableHighAccuracy` with a 1 min `timeout`.  Default is `false`.
 - `watch` boolean, triggers `watchPosition`, and also returns an object with a `stop()` method (see below).  Default is `false`.
 - `opts` object, which will be updated per the preceding arguments and then passed on to [L.Map.locate()]

> **Pro-Tip: Use `watchPosition` for better results!**
>
> When requesting the user's location in a web app, it's generally better to use `watchPosition` by setting `watch = true`, even when you only need a single point and not a GPS trace.  The reason for this is that the first result returned by the GPS may be inaccurate, and the longer the GPS is on, the more time it has to lock on to the satellites.  If you take this approach, be sure to set up your success callback to handle being called more than once.

To use `locate.locate()` with an existing map (e.g. in conjunction with `opts.setView`), call `locate.init()` before calling `locate.locate()`.

```javascript
define(['jquery', 'leaflet', 'wq/locate'], function($, L, locate) {

// Bind locate to existing map
var m = L.map(...);
locate.init(m);

// Enable watchPosition & other options; save reference to result
var gps = locate.locate(success, error, true, true, {'setView': true});

function success(evt) {
    if (evt.accuracy < 1000) {
        gps.stop(); // Stop watchPosition
    }
    // ...
});
```

[wq/locate.js]: https://github.com/wq/wq.app/blob/master/js/wq/locate.js
[AMD]: https://wq.io/docs/amd
[L.Map.locate()]: http://leafletjs.com/reference.html#map-locate-options
