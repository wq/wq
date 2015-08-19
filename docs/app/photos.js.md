---
order: 3
indent: true
---

wq/photos.js
======

[wq/photos.js]

**wq/photos.js** is a plugin for [wq/app.js] that integrates with the [PhoneGap Camera API] and shows previews for user-selected photos.  Together with the file processing functions in [wq/app.js] and [wq/outbox.js], wq/photos.js provides a complete solution for allowing volunteers to capture and upload photos via your offline-capable web or mobile app.  Captured photos are saved in an outbox ([wq/outbox.js]) until they can be synchronized to the server.

<div data-interactive id='photo-example'>
  <ul data-role="listview">
    <li class="ui-field-contain">
      <img src="https://wq.io/images/empty.png" id="preview">
      <label for="image">Photo</label>
      <input type="file" name="photos" id="image" data-wq-preview="preview">
    </li>
  </ul>
</div>

> Note: The wq/photos.js API was changed substantially in wq.app 0.8.1.  See [0.7 docs](https://wq.io/0.7/docs/other-modules) for information on the old usage.

The [Species Tracker](https://species.wq.io) application provides a complete demonstration of the offline capabilities of wq/photos.js.

### API
wq/photos.js is typically imported via AMD as `photos`, though any local variable name can be used.  `photos` provides three methods:

  * `photos.preview()` accepts the id of an `<img>` element and a `File` object to display.  `photos.preview()` is meant to be used with `<input type=file>` in web apps, and with `photos.take()` or `photos.pick()` in PhoneGap/Cordova apps.
  * `photos.take()` and `photos.pick()` are wrappers for PhoneGap/Cordova's [camera.getPicture()] API, meant to be used in hybrid apps where `<input type=file>` doesn't work (e.g. on older devices or [broken Android implementations]).

Both `photos.take()` and `photos.pick()` accept two arguments: the id of a form `<input>` (often `type=hidden`) and the id of an `<img>` tag to place the preview in.  `photos.take()` requests a new photo from the camera, while `photos.pick()` requests a previously captured photo from the user's albums.  The captured photo will be stored in offline storage as a `Blob` via [wq/store.js].


If you are using [wq/app.js], you don't need to call these functions directly.  Instead, create your form elements with data-wq- attributes:

element | attribute | purpose
--------|-----------|---------
`<input type=file>` | `data-wq-preview` | Indicates the id of an `<img>` element to display a preview image in after a photo is selected.
`<button>` | `data-wq-action` | Indicates the function to call (`take` or `pick`) when the button is clicked
`<button>` | `data-wq-input` | The name of a hidden input to populate with the name of the captured photo.  (The photo itself will be saved in offline storage).
`<input type=hidden>` | `data-wq-type` | Notifies wq/app.js that the hidden element is intended to be interpreted as the name of a photo captured via wq/photos.js.  The element should typically have the `data-wq-preview` attribute set as well.

Below is an example template with the appropriate attributes set:

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

Note the use of the `{{#native}}` context flag which is set automatically by [wq/app.js].  See the [Species Tracker template](https://github.com/powered-by-wq/species.wq.io/blob/master/templates/partials/new_photo.html) for a working example.

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

## Browser Compatibility Notes
wq/photos.js, and the related file processing functions in [wq/app.js] and [wq/outbox.js], rely heavily on two browser features:
 - Offline storage (see Browser Compatibility Notes for [wq/store.js])
 - Binary [Blob] support, including the ability to upload `Blob`s via AJAX.

All modern browsers, including Internet Explorer 10 and later, have at least [minimal blob support](https://github.com/nolanlawson/state-of-binary-data-in-the-browser).  For IE 9 and older browsers, the preview functionality in wq/photos.js will not work, but users should still be able to upload files.  wq/app.js will detect the lack of `Blob` support on these browsers and fall back to a normal form post when a `<form>` containing an `<input type=file>` is encountered.  (wq.db's [ModelViewSet] includes built-in support for responding to forms posted in this way).

This leaves one category of browsers to watch out for: those that mostly support `Blob`s but are unable to upload them via AJAX.  This includes the default browser and Webview on Android version 4.0 through 4.3.  Due to a [WebKit bug](https://code.google.com/p/android/issues/detail?id=39882) in these versions, wq/outbox.js is unable to properly upload stored Blobs.  Android 4.4 and newer versions are unaffected.

This is a known limitation, and there is a [wq.app issue](https://github.com/wq/wq.app/issues/51) to address it.  In the meantime, there are two workarounds.

 * For web apps, try to ensure the user is using the latest Chrome instead of the stock browser when contributing data with photos.
 * For native apps, build the app with the [Crosswalk Webview](https://crosswalk-project.org/).  The Crosswalk webview is available in the [latest version of Phonegap Build](http://phonegap.com/blog/2015/06/16/phonegap-updated-on-build/) as a plugin - see [Species Tracker's config.xml](https://github.com/powered-by-wq/species.wq.io/blob/master/native/config.xml) for an example.  Google's [multiple APK](http://developer.android.com/google/play/publishing/multiple-apks.html) support could be leveraged so that the Crosswalk-enabled APK would only need to be available for Android 4.3 and earlier.

[Blob]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
[wq/photos.js]: https://github.com/wq/wq.app/blob/master/js/wq/photos.js
[wq/app.js]: https://wq.io/docs/app-js
[PhoneGap Camera API]: https://www.npmjs.com/package/cordova-plugin-camera
[camera.getPicture()]: https://www.npmjs.com/package/cordova-plugin-camera
[broken Android implementations]: http://code.google.com/p/android/issues/detail?id=62220
[wq/outbox.js]: https://wq.io/docs/outbox-js
[wq/store.js]: https://wq.io/docs/store-js
[ModelViewSet]: https://wq.io/docs/views
