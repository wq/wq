---
order: 3
indent: true
---

wq/photos.js
======

[wq/photos.js]

**wq/photos.js** is a plugin for [wq/app.js] that integrates with the [PhoneGap Camera API] and shows previews for user-selected photos.

<div data-interactive id='photo-example'>
  <ul data-role="listview">
    <li class="ui-field-contain">
      <img src="/images/empty.png" id="preview">
      <label for="image">Photo</label>
      <input type="file" name="photos" id="image" data-wq-preview="preview">
    </li>
  </ul>
</div>

> Note: The wq/photos.js API was changed substantially in wq.app 0.8.1.  See [0.7 docs](https://wq.io/0.7/docs/other-modules) for information on the old usage.

### API
wq/photos.js is typically imported via AMD as `photos`, though any local variable name can be used.  `photos` provides three methods:

  * `photos.preview()` accepts the id of an `<img>` element and a `File` object to display.  `photos.preview()` is meant to be used with `<input type=file>` in web apps, and with `photos.take()` or `photos.pick()` in PhoneGap/Cordova apps.
  * `photos.take()` and `photos.pick()` are wrappers for PhoneGap/Cordova's [camera.getPicture()] API, meant to be used in hybrid apps where `<input type=file>` doesn't work (e.g. on older devices or [broken Android implementations]).

Both `photos.take()` and `photos.pick()` accept two arguments: the id of a form `<input>` (often `type=hidden`) and the id of an `<img>` tag to place the preview in.  `photos.take()` requests a new photo from the camera, while `photos.pick()` requests a previously captured photo from the user's albums.


If you are using [wq/app.js], you don't need to call these functions directly.  Instead, create your form elements with data-wq- attributes as shown below.

```javascript
define(['wq/app', 'wq/photos'], function(app, photos) {
    app.use(photos);
    app.init();
});
```

```xml
<img id=preview-image>

{{^native}}
<input type=file name=file data-wq-preview=preview-image>
{{/native}}

{{#native}}
<button data-wq-action=take data-wq-input=file>
  Take Picture
</button>
<button data-wq-action=pick data-wq-input=file>
  Choose Picture
</button>
<input id=filename type=hidden name=file
   data-wq-type=file data-wq-preview=preview-image>
{{/native}}
```

See the [Species Tracker template](https://github.com/powered-by-wq/species.wq.io/blob/master/templates/partials/new_photo.html) for a working example.

The wq/photos.js API can be accessed directly, as shown below.

```javascript
define(['jquery', 'wq/photos', ...], function($, photos, ...) {

$('input[type=file]').change(function() {
    photos.preview('preview-image', this.files[0])
});
$('button.take').click(function() {
    photos.take('filename', 'preview-image');
});
$('button.pick').click(function() {
    photos.pick('filename', 'preview-image');
});

});
```

[wq/photos.js]: https://github.com/wq/wq.app/blob/master/js/wq/photos.js
[PhoneGap Camera API]: https://www.npmjs.com/package/cordova-plugin-camera
[camera.getPicture()]: https://www.npmjs.com/package/cordova-plugin-camera
[broken Android implementations]: http://code.google.com/p/android/issues/detail?id=62220
