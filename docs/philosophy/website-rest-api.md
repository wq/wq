---
order: 3
title: My website is its own REST API
---

My website is its own REST API<br><small>(and it's own mobile app)</small>
==============================

Managing support for the growing array of web-capable device formats can be a daunting challenge.  The use of [HTML5 as a cross-platform solution](http://wq.io/docs/web-app) can help mitigate this complexity, but there are still a variety of use cases and device capabilities that need to be accounted for.  In particular, as more and more users switch to mobile devices as their primary platform, it is important to support the ability to cache and render content locally, [offline first](http://offlinefirst.org/), for users with limited or no connectivity.

As we noted [previously](http://wq.io/docs/website), it is still important to support traditional web-based navigation via server-rendered HTML pages.  However, proper offline support typically requires a **REST API** coupled with a lightweight data format (i.e. JSON) to minimize download time and offline storage space.  For many websites, a REST API is thrown together as an afterthought, and almost always is given a distinct URL space and authentication mechanism, both completely separate from the main website.

This duplication is unnecessary and costly.  [You don't need an API.](http://ruben.verborgh.org/blog/2013/11/29/the-lie-of-the-api/)

More precisely, your website should serve as its own API.  In general, every page should have a machine readable representation - accessible at the same URL (plus or minus an extension or HTTP `Accepts: ` header).  Try this as an example:
 - View [the source for this page](view-source:http://wq.io/docs/website-rest-api) in a new tab.  The HTML should have been rendered by the server.
 - Now view the JSON version at <http://wq.io/docs/website-rest-api.json>

The same content is being displayed at the same URL - but with different formats for different use cases.  (Note that in practice, these documentation pages are downloaded at one time from <http://wq.io/docs.json> when the application loads.  More on that later.)
 
Designing a combination website/REST API is not hard to do, as long as it is done intentionally and made an early part of the design process.  Practically, it may be more effective to think of the structure as a REST API that happens to be able to render HTML.  This is how [wq.db](http://wq.io/wq.db) is designed.  When we were evaluating Python REST libraries, the primary reason we selected the [Django REST Framework](http://www.django-rest-framework.org) was the support for rendering HTML within a REST URL structure, even though (at the time) there were other more established alternatives.
