Mustache Templates in wq
========================

[wq.app] and [wq.db] both use [Mustache]-powered HTML templates as the primary means of generating and displaying application screens.  Mustache was selected because it forces a strict separation of logic and presentation, and because there are implementations in both Python and JavaScript (as well as a number of other languages).  By sharing identical templates between the client and the server, [wq] is able to leverage the advantages of both server and client-side [MVC], while adding a powerful flexibility that neither provides alone.

Specifically, there are three ways a page can be rendered by the wq stack in response to a navigation event.

 1. On the client (e.g. wq.app), using a copy of the templates inlined with the JavaScript files (perhaps via [wq collectjson]) as well as JSON data from `localStorage` or from a wq.db REST request.
 2. On the server (e.g. wq.db), as a pre-rendered HTML snippet delivered via an AJAX request
 3. On the server (e.g. wq.db), as a traditional HTML page accessed directly via a deep link or bookmark.

Importantly, any of these three options can be used to respond to the same URL, depending on what will provide the best experience to the user.  For example, consider the following scenario.

 * A visitor searching for specific information finds a deep link to a page within your application.  Upon visiting this link, the page is rendered *on the server* and is immediately ready for viewing, while the rest of the application loads in the background.
 * Among the items loading in the background are the full set of templates and a cache of JSON objects for the most commonly accessed pages.  When the visitor clicks on a link to one of these pages, it is rendered instantly *on the client* without any additional network traffic.
 * As the visitor continues to explore the application, they eventually navigate to less critical that is not stored locally (perhaps due to `localStorage` limitations).  Rather than requesting JSON from the server and then rendering it, the application simply requests a complete HTML snippet from the server via AJAX and injects it into the DOM.
 
This approach makes it possible to build very scalable [offline first] mobile applications, while maintaining backwards compatibility with older browsers and search engines.  This not only makes [progressive enhancement] a natural part of the development process, but makes the choice of whether to render server or client-side a run-time decision, rather than a design-time decision.  While wq.db and wq.app are designed to work together, the same approach can be taken with select parts of wq (or even without using wq at all) as long as the recommended [REST structure] is used.

There are three primary components to the use of Mustache templates in wq: the template syntax, the context object, and the naming convention.

## Mustache Syntax
WIP

## The Context Object
WIP

## Template Naming Convention
WIP

[wq.app]: http://wq.io/wq.app
[wq.db]: http://wq.io/wq.db
[Mustache]: http://mustache.github.io
[wq]: http://wq.io
[MVC]: http://en.wikipedia.org/wiki/Model-view-controller
[wq collectjson]: http://wq.io/docs/collectjson
[offline first]: http://offlinefirst.org/
[progressive enhancement]: http://jakearchibald.com/2013/progressive-enhancement-still-important/
[REST structure]: http://wq.io/docs/rest-structure