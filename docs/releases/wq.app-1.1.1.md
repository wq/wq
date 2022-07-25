---
repo: wq.app
date: 2019-04-18
---

# wq.app 1.1.1

**wq.app 1.1.1** brings a couple of bug fixes, a new `ajax()` plugin hook, and an improved wq/chartapp.js API.

> Note: there are a number of exciting changes in the works, and wq.app 1.1.1 will be the last release before the big upgrades begin.  See #111 for more information.

## Bug Fixes
 * Prevent users accidentally double-clicking the submit button (#100)
 * `wq phonegap` command compatibility with 8-bit icons (#108 via @tomaszn)

## New Features

### `ajax()` plugin hook

You can now completely override the behavior of GET and POST requests made by wq/model.js and wq/outbox.js.  To do this, define a [wq.app plugin](../plugins/index.md) with an `ajax()` method that takes four arguments: url, data, method, and headers.

```javascript
define({
    "ajax": function(url, data, method, headers) {
        if (method == "POST") {
            return somePostMethod(url, data, headers)
        } else {
            return someGetMethod(url, headers);
        }
    }
});
```

Here are a few things to keep in mind:
 * The `data` object for post requests may be either a plain object or a `FormData` instance.
 * You are free to rewrite or completely ignore the passed URL, for example to integrate with an arbitrary (non wq.db) REST API. 
 * The `ajax()` method should return a `Promise` that will resolve to the JSON object returned by the REST service.
 * If the REST service is not compatible with wq.db, be sure to process the response into a compatible format.

### wq/chartapp.js

A number of changes [wq/chart.js](https://django-rest-pandas.wq.io/@wq/chart) and the [wq/chartapp.js plugin](https://django-rest-pandas.wq.io/@wq/chart) make it possible to configure the main chart options via custom `data-wq-*` attributes.  For example:

```svg
<svg data-wq-url="/api/data/timeseries.csv"
     data-wq-type="timeSeries"
     data-wq-point-cutoff="100"
     data-wq-time-format="%Y-%m-%d"
     data-wq-width="800"
     data-wq-height="600"
     data-wq-x="date"
     data-wq-y="value"
     data-wq-label-template="{{series_label}}"
     data-wq-point-label-template="Value on {{date}}" >
</svg>
```
