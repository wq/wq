# ajax(url, data, method, headers)

The `ajax()` [plugin type] allows customization of how requests are sent and processed.  The [default implementation][default-ajax] provided by [@wq/store] is a `fetch()` wrapper designed to work with [wq.db] and should be sufficient for most cases.

```javascript
// src/ajax.js
export default {
    ajax(url, data, method, headers) {
        if (method == "POST") {
            return somePostMethod(url, data, headers)
        } else {
            return someGetMethod(url, data, headers);
        }
    }
};

// src/index.js
import app from '@wq/app';
import customAjax from './ajax';
import config from './config';

app.use(customAjax);
app.init(config).then(...);
```

Here are a few things to keep in mind:

 * There can only be one ajax plugin defined per app.
 * The `ajax()` method should return a `Promise` that will resolve to a JSON object.
 * You are free to rewrite or completely ignore the passed URL, for example to integrate with an arbitrary (non wq.db) REST API. 
 * If the REST service is not compatible with wq.db, be sure to process the response into a compatible format.  For example, collections should either be returned as simple arrays or as objects of the form `{"list": [], "count": 0, "per_page": 50}`
 * For POST requests, the url is a `URL` object, and data is a `FormData` object.
 * For GET requests, the url a string, and data is an object containing URL parameters.
 * If the request fails with a server error, the plugin should throw an `Error` with a `json` attribute if the error is an object or a `text` attribute otherwise.  Note that unlike `$.ajax()`, `fetch()` does not automatically throw in the case of 400 and 500 errors.

[plugin type]: ./index.md
[default-ajax]: https://github.com/wq/wq.app/blob/v1.3.0a2/packages/store/src/store.js#L380-L418
[@wq/store]: ../@wq/store.md
[wq.db]: ../wq.db/index.md
