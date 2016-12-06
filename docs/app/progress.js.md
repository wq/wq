---
order: 12
indent: true
---

wq/progress.js
==============

[wq/progress.js] provides a simple way to create AJAX-powered auto-updating HTML5 [progress] elements.  wq/progress.js is meant to be used with a JSON web service that provides updates as to the current status of a long-running task.  wq/progress.js was originally created for use with the data import tasks in the [dbio] module.

### API

wq/progress.js is typically imported via AMD as `progress`, though any local variable name can be used.  `progress` provides a number of functions:

 * `progress.init()` takes up to four arguments: a URL route path (see [wq/router.js]) for pages that are expected to have `<progress>` elements, and up to three callback functions (`onComplete`, `onFail`, and `onProgress`).  All three of the functions will be passed the `<progress>` element and the JSON data from the web services.
 * `progress.start($progress)` starts polling for a specified, jQuery-wrapped `<progress>` element
 * `progress.stop($progress)` cancels polling for a started progress process

```javascript
define(['wq/progress', ...], function(progress, ...) {

progress.init('tasks/<slug>', _onComplete);

function _onComplete($progress, data) {
    $('p.result').html("Task Completed");
}

});
```

To configure a `<progress>` instance, a number of `data-*` attributes can be used.  `data-url` configures the URL to use for the AJAX request to update the progress status. `data-interval` defines the polling frequency in seconds (default 0.5).

```xml
<progress data-url="/getstatus.json" data-interval=0.25></progress>
```

For older browsers, the `<progress>` bar will automatically fall back to text showing the current status.

wq/progress.js assumes a specific structure for the data from the web service.  The following attributes should be specified on the returned JSON object:
 * `total`: the total number of items being processed
 * `current`: the rank of the currently processing item.  (`current / total` will be used to determine the % complete)
 * `status`: A text status indicating task state.  A status of `"SUCCESS"` or `"FAILURE"` will cause polling to cease and the `onComplete` or `onFailure` callbacks to be called.  The status names are taken from the [task state names in Celery].


[wq/progress.js]: https://github.com/wq/wq.app/blob/master/js/wq/progress.js
[progress]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
[wq.db]: https://wq.io/wq.db
[dbio]: https://wq.io/dbio
[task state names in Celery]: http://docs.celeryproject.org/en/latest/userguide/tasks.html#states
