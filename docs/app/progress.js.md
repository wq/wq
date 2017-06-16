---
order: 12
indent: true
---

wq/progress.js
==============

[wq/progress.js]

**wq/progress.js** is a [wq/app.js plugin] that provides a simple way to create AJAX-powered auto-updating HTML5 [progress] elements.  wq/progress.js is meant to be used with a JSON web service that provides updates as to the current status of a long-running task.  wq/progress.js was originally created for use with the data import tasks in the [Django Data Wizard] package.

### API

wq/progress.js can optionally be configured with a global default polling interval, as well as up to three custom callback functions (`onComplete`, `onFail`, and `onProgress`).  The callback functions will be passed the active `<progress>` element and the JSON data from the web service.

```javascript
// myapp/main.js
define(['wq/app', 'wq/progress', './config'],
function(app, progress, config) {

// In myapp/config.js:
// config.progress = {'interval': 0.5};
// config.progress.onProgress = function($progress, data) { console.log(data) });

app.use(progress);

app.init(config).then(function() {
    app.jqmInit();
    app.prefetchAll();
});

});
```

To configure an individual `<progress>` instance, a couple of `data-wq-*` attributes can be used.  `data-wq-url` configures the URL to use for the AJAX request to update the progress status. `data-wq-interval` defines the polling frequency in seconds (default 0.5).  As of wq.app 1.0.0rc2, `data-wq-status` can be used to specify an element which will be used to display `error` or `message` attributes from the JSON response.

```xml
<progress data-wq-url="/getstatus.json"
          data-wq-interval=0.25
          data-wq-status="status-info"></progress>
<div id="status-info"></div>
```

For older browsers, the `<progress>` bar will automatically fall back to text showing the current status.

wq/progress.js assumes a specific structure for the data from the web service.  The following attributes should be specified on the returned JSON object:
 * `total`: the total number of items being processed
 * `current`: the rank of the currently processing item.  (`current / total` will be used to determine the % complete)
 * `status`: A text status indicating task state.  A status of `"SUCCESS"` or `"FAILURE"` will cause polling to cease and the `onComplete` or `onFailure` callbacks to be called.  The status names are taken from the [task state names in Celery].
 * `error` or `message`: Will be displayed with the `data-wq-status` option.


[wq/progress.js]: https://github.com/wq/wq.app/blob/master/js/wq/progress.js
[wq/app.js plugin]: https://wq.io/docs/app-plugins
[progress]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
[wq.db]: https://wq.io/wq.db
[Django Data Wizard]: https://github.com/wq/django-data-wizard
[task state names in Celery]: http://docs.celeryproject.org/en/latest/userguide/tasks.html#states
