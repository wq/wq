---
module: "@wq/react"
---

# useSiteTitle()

Returns the site title for use in e.g. [`Header`][Header].  Defaults to [useContextTitle()][useContextTitle] if `config.site_title` is undefined.

```js
const siteTitle = useSiteTitle();
```

[Header]: ../components/Header.md
[useContextTitle]: ./useContextTitle.md
