---
order: 1
---

Not Just a Website: The Case for HTML5
======================================

*This is the first in a two part series promoting the use of HTML5 for app development.  This section focuses on the "app" side of the equation, but please also read [Still a Website: Preserving the "HT" in HTML5] for a perspective on why the "website" part is still important.*

**"But it's just a website!"**  This was our initial response to the prospect of using HTML5* for app development, particularly when looking at [PhoneGap] as a cross-platform solution.  And in a sense it is true - in its default usage, PhoneGap simply creates a webview and loads an `index.html` file with references to JavaScript and CSS.  HTML5 definitely didn't seem nearly as cool as creating a truly "native" app with the programming languages dedicated to each platform.  However, the practicality of using a single, standardized environment for cross-platform app development won out.  It was simply unfeasible to recreate the same app for two or three platforms given our typical time and budget constraints.

Eventually, we became convinced that HTML5 is not only a practical choice, but it is actually the best choice both now and in the long term.  In this article we hope to convince you of the same.

## The Capabilities of HTML5

As we dived further into application development, it became clear that many features of HTML5 apps - even deployed as websites without using PhoneGap - were actually quite competitive with those of native apps.  For example,

 * Web apps can be made to work offline through the use of the [Application Cache] for code and [Web Storage] for data.
 * Web apps can request GPS coordinates via the [navigator.geolocation] API, and photographs with just an `<input type=file>`
 * Complex charts can be rendered without the need for browser plugins, by using embedded [SVG] graphics (or Canvas, which can draw faster but is somewhat less interactive)
 * [CSS3 Transforms] can be used to add hardware-accelerated transition animations when navigating between screens.
 * Finally, the combined use of AJAX and [History.pushState] makes it possible to maintain a consistent URL structure without actually requiring the entire page to reload every time the user navigates between screens.  (A technique known as [PJAX]).


## Re: Performance

Perhaps the most commonly leveraged complaint against pure web apps is that they are "slow" compared to their native counterparts.  This is usually raised in reference to the speed at which application screens are rendered and the fluidity of animation.  On a surface level, this is a valid concern.  Short of an HTML5 OS becoming mainstream (which, we might add, is a [real possibility]), native code would naturally be expected to run faster than JavaScript, which is interpreted at runtime.  However, what is usually missing from the performance discussion is *is the speed difference actually perceptible to the user?*.  We would argue that for many applications (particularly the citizen science and crowdsourcing applications we build with [wq]), the speed difference is not important.  Certainly, developers of other applications involving intense animation (e.g. games) may come to a different conclusion.

A more important contributor to the perception of slowness is network latency, which naturally affects web apps much more than native apps.  What is usually forgotten is that native apps actually take *longer* to load initially - as they must first be discovered and installed from an app store!  It is only because websites are traditionally loaded on demand that the initial load seems slower.  Further, this can be mitigated by the use of an [Application Cache] so that once a web app is accessed for the first time, it is "installed" locally and available for instant loading on subsequent visits.

There is one remaining issue related to latency, and that is the fact that websites traditionally require a subsequent network request for every navigation action.  With HTML5, this is no longer necessary - as long as the necessary information is preloaded and stored locally, there should be no need to wait for the network when navigating between pages.  This requires a more careful consideration of application design (and the careful use of [templates]), but it is feasible and essential to giving an app-like experience to the user.  We might even go so far as to say that if you *aren't* using an Application Cache and [Web Storage] in your website, please don't frame it as a "web app", as you are directly contributing to a negative perception of web apps as inherently slow.

## Bridging the Gap

With all of the technical issues above aside, there is still one compelling argument for native apps: it's what users are used to.  Like it or not, the accepted way to use an application on a mobile device is to search for it in an app store, pay a small fee, and install it onto the device.  This is an [unfortunate and counterproductive development](http://blog.codinghorror.com/app-pocalypse-now/) that primarily benefits the OS manufacturers, but it is a reality that must be reckoned with for the time being.

Fortunately, [PhoneGap] (open sourced as [Apache Cordova]) is available to make cross-platform app store deployment much easier.  Once the proper accounts are set up, it is possible to turn an HTML5 into a "hybrid" native app simply by uploading a zip file to [PhoneGap Build].  This makes it possible to develop an application as a web app, but deploy it as if it were a native app - with only minor modifications to the source code.  PhoneGap also provides a way to access the few device APIs that are not yet available from within the web browser.  In the long term, the hope is that PhoneGap [will no longer be necessary], and that HTML5 apps can be deployed directly via the web as the primary installation mechanism.

With the above considerations, we argue that the new features in the latest version of HTML make it more than capable as a platform for developing mobile apps.  However, it is important not to neglect the more traditional features that have made the web platform so successful in the first place.

*_Note: HTML5 is used here in its commonly understood meaning of "HTML, JavaScript, and CSS features available in the latest versions of all popular browsers", which mostly correspond to the actual HTML5 standard and related specifications.  If semantics are important to you, replace HTML5 with "web standards" as you read this document._

[Still a Website: Preserving the "HT" in HTML5]: http://wq.io/docs/website
[PhoneGap]: http://phonegap.com
[Application Cache]: http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html
[Web Storage]: http://www.w3.org/TR/webstorage/
[navigator.geolocation]: http://www.w3.org/TR/geolocation-API/
[SVG]: http://www.w3.org/Graphics/SVG/
[CSS3 Transforms]: http://www.w3.org/TR/css-transforms-1/
[History.pushState]: http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html
[PJAX]: https://github.com/defunkt/jquery-pjax
[real possibility]: http://www.mozilla.org/en-US/firefox/os/
[wq]: http://wq.io/
[templates]: http://wq.io/docs/templates
[Apache Cordova]: http://cordova.io
[PhoneGap Build]: http://build.phonegap.com
[will no longer be necessary]: http://phonegap.com/2012/05/09/phonegap-beliefs-goals-and-philosophy/
