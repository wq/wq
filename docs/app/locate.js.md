---
order: 7
indent: true
---

wq/locate.js
=========

[wq/locate.js]

**wq/locate.js** is a [wq/app.js plugin] providing utilities for requesting the user's latitude and longitude, a common use case in many VGI, citizen science, and crowdsourcing applications.  wq/locate.js is designed to be used together with [wq/map.js].

## API

Once registered, the locate plugin populates form `<input>`s from a Leaflet map to facilitate multiple ways of providing location information (e.g. GPS or a map click).

```javascript
// myapp/main.js
define(['wq/app', 'wq/map', 'wq/locate', './config'],
function(app, map, locate, config) {

// In myapp/config.js or in wq.db.rest registration:
// config.locate = { ... };
// config.pages[page].map = { ... };
// config.pages[page].locate = true;

app.use(map);
app.use(locate); // Should be registered after map

app.init(config).then(function() {
    app.jqmInit();
    app.prefetchAll();
});

});
```

## Usage

The Locator widget provides three modes for entering location information:

 * `gps`: Request position using device GPS or network location, if available.  Also returns GPS "accuracy" in meters.  To get more accurate measurements, the `gps` mode of the Locator widget continually polls location until the form is saved or a different mode is selected.
 * `interactive`: Allow user to click the map directly.  Accuracy is computed based on zoom level.
 * `manual`: Allow user to manually enter their latitude and longitude.

The entered coordinates are automatically displayed on a Leaflet map.  "Accuracy" is represented as a circle with the radius of the accuracy.

> **Tip: Save Accuracy In Your Database!**
>
> The accuracy number is a critical part of the location information - so don't discard it and only save the latitude and longitude.  Remember that accuracy is fundamentally different than precision: just because a GPS device returns latitude and longitude specified out to 9 decimal places, does not mean the user is actually at that exact location.  In fact, the initial measurement returned by many consumer GPS devices will often be "precise" but inaccurate, perhaps by several kilometers.  The accuracy measurement is thus an imperfect, but useful metric for evaluating the location information.  Keeping the GPS on for as long as possible is one way to get more accurate measurements, but it is still important to save the information in the database for future reference.
>
> Similarly, having a user tap the map to specify their location is practically guaranteed to provide inaccurate results unless they zoom in first.  For this reason, the `interactive` mode approximates an accuracy measurement based on zoom level (accuracy = 2 pixels of screen space converted to meters based on the zoom level).  Accuracy can serve as a reminder to the user to zoom in, or even to enforce a minimum level of accuracy in your form processing logic.

The Locator widget expects the following fields to be defined in the form:

 * `toggle`: A set of radio buttons (or a select menu) that will change the widget mode.  The values for each option should be one or more the modes listed above.
 * `latitude`: A text input that will receive (or provide) the latitude
 * `longitude`: A text input that will receive (or provide) the longitude
 * `accuracy`: A text input that will receive the computed accuracy

If any of these fields are named differently in your application, define `config.locate.fieldNames` as follows:

```javascript
config.locate = {
    "fieldNames": {
        "toggle": "mode",
        "latitude": "lat",
        "longitude": "lng",
        "accuraccy": "accuracy"
    }
};
```

`config.locate` can also be used to register up to three callback functions that will be executed at various points in the process:

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
// myapp/main.js
define(['wq/app', 'wq/map', 'wq/locate', './config'],
function(app, map, locate, config) {

app.use(map);
app.use(locate);

config.locate = {
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

app.init(config).then(function() {
    app.jqmInit();
    app.prefetchAll();
});

});
```

#### HTML

```xml
<fieldset data-role="controlgroup" data-type="horizontal">
  <input type='radio' value='gps' id='loc-gps' name='toggle'>
  <label for='loc-gps'>GPS</label>
  <input type='radio' value='interactive' id='loc-interactive' name='toggle'>
  <label for='loc-interactive'>Interactive</label>
  <input type='radio' value='manual' id='loc-manual' name='toggle'>
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

> **Tip: Keep GPS running for better results!**
>
> When requesting the user's location in a web app, it's generally better to use `Geolocation.watchPosition()` than `Geolocation.getCurrentPosition()`, even when you only need a single point and not a GPS trace.  The reason for this is that the first result returned by the GPS may be inaccurate, and the longer the GPS is on, the more time it has to lock on to the satellites.  For this reason, wq/locate.js continues requesting the GPS location until the user saves the form and/or navigates to another page.  This is accomplished by setting `watch: true` in the underlying call to [L.Map.locate()].

[wq/locate.js]: https://github.com/wq/wq.app/blob/master/js/wq/locate.js
[wq/app.js plugin]: https://wq.io/docs/app-plugins
[wq/map.js]: https://wq.io/docs/map-js
[AMD]: https://wq.io/docs/amd
[L.Map.locate()]: http://leafletjs.com/reference.html#map-locate-options
