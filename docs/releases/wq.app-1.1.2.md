---
repo: wq.app
date: 2019-05-21
---

# wq.app 1.1.2

**wq.app 1.1.2** brings a significant overhaul to the internal source structure, while (mostly) retaining full backwards compatibility.  Specifically, wq.app is now organized as a monorepo containing several npm packages (see [#1](https://github.com/wq/wq.app/issues/1), [#84](https://github.com/wq/wq.app/issues/84), [#66](https://github.com/wq/wq.app/issues/66), and [#109](https://github.com/wq/wq.app/issues/109)).  The new packages are written as ES6 modules, but compiled back into AMD modules for compatibility with the existing wq.app PyPI package.

This release achieves the first goal in the [2019 roadmap for wq.app](https://github.com/wq/wq.app/issues/111).

## Using fetch()
While wq.app 1.1.2 is intended to be fully backwards compatible with 1.1.1, there is one important exception: the use of [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to handle AJAX requests.  If you need to support older browsers without a built-in `fetch()` (such as IE 11), you will need to include a polyfill before loading wq.app:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/3.0.0/fetch.min.js"></script>
<script src="/js/lib/require.js" data-main="/js/myapp"></script>
```

In addition, if you are using a custom `ajax()` plugin hook ([added in 1.1.1](./wq.app-1.1.1.md)), note that the arguments have changed slightly:

 * For POST requests, the url is a `URL` object, and data is a `FormData` object.
 * For GET requests, the url a string, and data is an object containing URL parameters.
 * If the request fails with a server error, the plugin should throw an `Error` with a `json` attribute if the error is an object or a `text` attribute otherwise.  (See [the default implementation](https://github.com/wq/wq.app/blob/v1.1.2/packages/store/src/store.js#L262-L296) for an example).  Unlike `$.ajax()`, `fetch()` does not automatically throw in the case of 400 and 500 errors.

## Deprecated Modules

wq/autocomplete.js, wq/console.js, wq/json.js, and wq/progress.js are deprecated and have been removed from the source repository.  For backwards compatibility, the Python package includes copies of these modules from 1.1.1.

## Other Changes
 * Ensure base URL is used when falling back to server rendering ([#112](https://github.com/wq/wq.app/issues/112) via [@tubaman](https://github.com/tubaman))
 * Various outbox improvements ([`7f548bc`](https://github.com/wq/wq.app/commit/7f548bcb967dba1372f95632147947ed079c739b))
