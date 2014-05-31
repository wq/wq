wq/locate.js
=========

[wq/locate.js]

## locate.locate()

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

## locate.Locator widget

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

[wq/locate.js]: https://github.com/wq/wq.app/blob/master/js/wq/locate.js
