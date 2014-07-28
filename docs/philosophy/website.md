---
order: 2
---

Still a Website: Preserving the "HT" in "HTML5"
===============================================

*This is the second post in a two part series promoting the use of HTML5 for app development. This section focuses on the features unique to "websites" that are often neglected in the performance-focused [native-vs-web discussion (Part 1)](http://wq.io/docs/web-app).*

Okay, so suppose you've been convinced that [HTML5 is not "just" a website](http://wq.io/docs/web-app), or simply have found JavaScript to be the most cost-effective programming language for your multi-platform app. Further, suppose that you've found a cutting-edge JavaScript library that promises to take away the pain of developing with HTML - perhaps by abstracting away the DOM entirely. More likely, suppose that you've found several such libraries and are trying to choose between them. How do you move forward in this fast-paced ecosystem?

In this post, we argue that an essential criteria in evaluating web-based technologies is the extent to which they utilize and promote **existing web standards**.  We would like to point out a number of features of the traditional web that are still important (even in mobile app contexts), but are often ignored or actively avoided by JavaScript library authors anxious to exploit the latest capabilities of HTML5.

Our argument is threefold:

 1. First, the robust (if at times cumbersome) technical capabilities of the traditional client-server web stack (and "hypertext" in particular) are lost when too much emphasis is placed on browser-only JavaScript features.
 2. Second, the choice to limit an application to only the latest versions of a subset of popular browsers is inherently exclusionary, and (more to the point) unnecessary, as the web has been dealing with the "fragmentation" issue for years.
 3. Finally, while it is tempting for library authors to abstract away standard web languages for the sake of brevity and convenience, doing so ultimately results in a contingent of developers that only know the conventions of the library, and are unable to transfer their knowledge to another platform.
 
We explore these arguments in depth below.

## 1. The power of the URL
A key concept that lead to the initial explosion of the web is [hypertext], the ability for documents (even those created by different authors) to link to each other through contextual hyperlinks.  The URL (or URI) serves as a unique identifier that facilitates this capability.  With a URL, it is possible to point others to a specific piece of content, even if that content is buried deep within another application.

With this robust history in web development, it is unfortunate that there has been a rise in "single page applications", or websites that consist of only an index page and then expect all further interaction to be handled via a JavaScript library.  URLs in these applications are often completely meaningless as an indicator of state, and any information they do contain is only in the "hash" part of the URL, and can only be understood by custom JavaScript code.  It is usually not possible to link into specific screens within these applications.  Notably, this is also a shortcoming that native apps share, and there is even a movement to bring URLs to native apps - effectively [re-inventing the web]!

Keeping URLs front-and-center should be a core aspect of HTML5 development, not a legacy feature that is only necessary for "websites".  Yet, a common argument is that "web apps" are somehow completely distinct from "websites" and should not be subject to the same constraints.  However, this distinction is almost always made for the convenience of the developer, rather than representing actual conceptual differences between the two use cases.  Often, "Web app" is really just shorthand for "a website that requires JavaScript to function at all".

As discussed in [Part 1](http://wq.io/docs/web-app), there are certainly performance benefits that come when users can interact with an application without requiring a network request for every state change.  However, these benefits can be achieved without throwing away the power of URLs.  A simple way to do this is to use the `History.pushState` API to update the browser URL as the user navigates, and (importantly) to **make app URLs actually work** whenever they are hit directly.  This can be achieved by using the progressive enhancement principles discussed in the next section.

A consistent URL structure makes it straightforward to incorporate common user requirements that web browsers already support.  Bookmarking tools, "open in new tab" (Ctrl+click), and the back/forward buttons work as expected, without needing any special JavaScript handlers.  In addition, social sharing is trivial to support - users can just copy and paste the URL, or the developer can "integrate" with a social network simply by linking to the network's "Share Link" page with the URL prepopulated.  Other users can view the shared content without needing to download an app first.  Note that "other users" includes search engines, which are well-suited for indexing websites with meaningful URL structures.

## 2. The value of diversity
One of the common frustrations web developers experience is the plethora of browsers to support.  What works in Chrome might not work in Firefox, and what works in Chrome and Firefox probably doesn't work in Internet Explorer.  Particularly in the context of mobile development, it is tempting to reduce the complexity by focusing solely on the WebKit family of browsers, which incidentally includes the native browsers on both iOS and Android.

While this frustration is understandable, it is also rooted in a certain level of smug superiority.  There is little to be gained by expecting everyone to use the same web browser or mobile platform.  After all, much of the power of the web comes from the [diverse perspectives] each participant brings.  It is unfair (and unwise) to exclude any particular user group simply because they don't happen to use your technology of choice.  It is important to remember that part of what made your technology "better" in the first place was competition with other technologies in the free marketplace of ideas.  **Ubiquitous platforms stagnate.**

This is an argument against single-platform native apps, but also against developing applications that only work on the newest versions of certain browsers.  There are certainly occasions where users need to be encouraged to upgrade, and it is not always possible to support every last browser.  However, it is easier than many developers think.

[Progressive enhancement] is a time-tested way to leverage the latest capabilities of the web without excluding users on older browsers.  Progressive enhancement works by layering JavaScript features on top of meaningful URL structures and HTML content, so that if the former breaks, the latter is still accessible.

One way to implement progressive enhancement is to use a [template system] that works both on the server and on the client.  When users on older browsers (or search engines) access URLs directly, they are given HTML that is usable even if the JavaScript isn't able to run properly.  By building progressive enhancement approach into your application from the start, you will be able to support a wider array of user bases "out of the box", and with less work in the long term.

## 3. The importance of standards

With the prevalence of HTML5 as a catch-all term for the latest web technology, it is somewhat amusing that there are "HTML5" app libraries that make it possible for developers to build web apps without writing a single line of HTML.  These libraries instead provide powerful JavaScript abstractions for various interface widgets and classes that ostensibly speed up app development.  What is not often discussed is that this convenience comes at a cost - by not requiring the use of HTML, these libraries also avoid *teaching* it.  Thus, users of these libraries are not given the opportunity to gain transferable knowledge that they can take with them to other projects.

This is not at all to say that there isn't a place for JavaScript libraries that simplify working with the web.  A good example in the visualization space is [d3.js].  d3 is commonly thought of as a "charting library" used to make robust, interactive visualizations.  However, unlike other charting libraries, d3 does not have a built in collection of chart types, or even widgets and classes for use in building charts.  Instead, d3 is fundamentally a DOM manipulation library for HTML and SVG - like jQuery, but with a built in notion of [data binding].  Because of this, d3 is not limited to any particular visualization type, or even to visualization projects in general.

The important point is that **by learning d3.js, you learn SVG** (and HTML).  The [SVG specification] is just as useful as the [d3 documentation] in determining what capabilities are available and how to leverage them.  If a better library ever comes along in the future, the general knowledge gained about SVG can be re-used, even if the d3 specifics cannot.  This cannot be said about other visualization and charting libraries.

Similarly, [jQuery Mobile] is relatively unique among mobile app libraries in that its widgets are specified by regular HTML tags (with a few `data-` attributes for configuration).  jQuery Mobile also actively encourages its users to learn CSS3 to customize their interface and support multiple screen sizes through responsive design.  This valuable knowledge about HTML and CSS can be re-used for other projects.

The best library is the one that teaches you about the underlying technologies (in this case HTML, JavaScript, and CSS) so that you can transfer knowledge between projects, and even drop the library if needed in the future.  More importantly, this approach allows you to support a wide variety of platforms (old and new), and to leverage the powerful capabilities of the hypertext medium.

[hypertext]: http://www.w3.org/WhatIs.html
[re-inventing the web]: https://twitter.com/jcoglan/statuses/461781379131666432
[diverse perspectives]: http://adactio.com/journal/6730/
[Progressive enhancement]: http://filamentgroup.com/dwpe/
[template system]: http://wq.io/docs/templates
[d3.js]: http://d3js.org
[data binding]: http://bost.ocks.org/mike/join/
[SVG specification]: http://www.w3.org/TR/SVG11/
[d3 documentation]: https://github.com/mbostock/d3/wiki
[jQuery Mobile]: http://jquerymobile.com
