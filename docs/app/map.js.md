map.js
======

[map.js]

**wq/map.js** is a plugin for [app.js] that adds mapping capabilities.  map.js can  leverage the [wq configuration object] to generate Leaflet maps on pages rendered via app.js.

## Usage
map.js should be initialized after app.js:
```javascript
// myapp.js
require(['wq/app', 'wq/map', 'config', 'templates'],
function(app, map, config, templates) {

app.init(config, templates);
map.init(config.map);

});
```

[wq configuration object]: http://wq.io/docs/config
[map.js]: https://github.com/wq/wq.app/blob/master/js/wq/map.js
