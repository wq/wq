---
order: 5
---

AMD Only: Why we require RequireJS
==================================

_**Summary**: This opinion piece summarizes the need for modules, provides an overview of the three JavaScript module systems that are worth considering, and explains why AMD is a requirement for using the JavaScript libraries provided with wq.app._

The core of [wq.app] is a [collection of AMD modules], and it is not currently possible to use wq.app effectively without using AMD.  This makes wq.app one of the first "post-global" JavaScript libraries: wq.app has never provided a global browser variable like jQuery's `$` (though `wq` would be an obvious name for one.)

In order to justify this design decision, it is worth discussing the current state of module systems in JavaScript and how they relate to the goals of the [wq framework] as a whole.  For related background reading, you may also want to read [Why Web Modules?] and [Why AMD?] on the [RequireJS] website.

## To Modularize or not to Modularize?
In programming, a module is a small building block that has clearly delineated inputs and outputs.  An ideal module does only one task and does it well.  This *separation of concerns* makes each individual module easier to maintain, and also easier to reuse in other programs that require the same functionality.  Most module systems have two technical characteristics that make this possible:

 * *One File Per Module* - There is often a natural mapping from modules to files in a filesystem.  Often, the filename itself determines the name of the module when referenced from other modules in a program.  It is possible to trace the *dependencies* of each individual module by following these references across files.
 * *Scoped variables* - The variables defined by a module are implicitly or explicitly tied to the module, rather than using a global namespace (like `window` in JavaScript)

The conventions for scoping and filenames are often defined differently by each programming language community.  However, unlike more robust programming languages, JavaScript has traditionally not had a formal module system at all.  Thus, before the advent of web modules, any non-trivial JavaScript website project would soon reach a point where a decision had be made.  Should everything stay in one monolithic JavaScript file, or should the functionality be split across several files?  There is a tradeoff unique to the web environment: while multiple smaller files are easier to maintain, they also must be loaded individually over the network, increasing page load times.

As more and more JavaScript libraries became available, it became a delicate dance ensuring the proper `<script>` tag order so that each bit of code would be available before the code that depended on it.  In addition, the lack of a private scope meant that libraries all shared the same global namespace.  To reduce the possibility for naming collisions, it became common (and still is) for libraries to define a single global object (e.g. `$`) and add each piece of functionality as a subproperty (`$.ajax()`).  Even then, there could be conflicts between libraries if they picked the same global name.

## Pick a Module System (but not any Module System)
Recently, there have a number of module systems have been proposed to address these challenges.  Module systems formalize the way in which module variables are scoped, as well as the way dependencies between modules are resolved.  Importantly for JavaScript and the web, most module systems also include *build tools* that take a collection of individual modules and combine them into a single large file for deployment to a production website.

Many of the initial module systems were library-specific, which limited their usefulness and excluded users that chose not to use that particular library.  Today more than ever, many of the best JavaScript tools for common website needs (maps, charts, UI widgets, etc.) are maintained as completely separate projects.  Thus, a good module system is one that is used by multiple independent libraries.  Among other things, this makes it possible for dependencies to be traced across libraries when building applications.  (It is unfortunate that popular frameworks like Angular still use and promote framework-specific modules).

If you are new to JavaScript modules, there are only three module systems you should really be considering - and only one of these three is fully backwards compatible with current browsers.  These systems are discussed in turn below.

### The Recent Past: CommonJS (i.e. Node)
The CommonJS module system was the first to gain wide traction in the JavaScript community.  CommonJS was designed for server environments like NodeJS.  While there are others, Node is the most popular server framework, and has extended the CommonJS syntax to the point that many CommonJS modules are really Node modules.

Like module systems in other languages, Node uses a synchronous syntax for declaring and loading dependencies.  This means that modules are loaded immediately when they are requested.  This works great in a server environment when the necessary files are all available locally.  However, this obviously does not work well in the web environment, where each file must be requested separately and potentially asynchronously.

The typical way to bring Node modules to the browser is to first combine them into a single file (typically using Browserify), complete with the minimum amount of scripting needed to resolve dependencies within the single file.  While this works for many projects, it constrains the flexibility of the dynamic web and effectively rules out asynchronous module resolution (though attempts are being made to address this).  In addition, the Node+Browserify module format is unique to the Node ecosystem, and there are few (if any) alternative implementations.

Node isn't going to disappear any time soon, and Node users should feel right at home with Browserify as a solution for JavaScript modules in the browser.  However, the goals of wq.app are best met with a module system that prioritizes the unique needs of browser environment (i.e. the most common JavaScript runtime), rather than attempting to fit a server-focused module system into an environment it wasn't designed for.

### The Near Future: ES6 (ECMAScript)
That's right, JavaScript itself is finally getting a standard module system!  The syntax uses familiar keywords like `import` and `export`, and like Python it is possible to request only certain variables from another module.  The ES6 module concept incorporates the notion of asynchronous dependency loading, however the mechanics for this are yet to be worked out.  In addition, it may be a while before browsers supporting ES6 modules reach widespread adoption.  It is possible to write modules in ES6 and then have them transpiled into the other two module systems, though this introduces a level of complexity into the workflow.  In short, [ES modules aren't done yet](http://jrburke.com/2015/02/13/how-to-know-when-es-modules-are-done/).

A core priority of wq is compatibility with the widest possible array of technologies, to ensure that no potential contributor is left behind.  Thus, we'll need to wait a bit longer before adopting ES6 modules, unfortunately.

### The Feasible Present: AMD
The Asynchronous Module Definition API, pioneered by [RequireJS], is a backwards-compatible solution to the need for modules in the browser.  AMD modules can be used directly in the browser without any browserifying or transpiling.  As the name implies, dependencies can be loaded asynchronously on demand - though in practice they are often built together into a single file for deployment.  Importantly, there are a number of competing AMD-compatible module loaders beyond RequireJS, ensuring that the technology isn't limited to a single user community.  **In effect, AMD is a de-facto backwards-compatible standard for JavaScript modules in the browser.**

In order to support asynchronous dependency loading while maintaining backwards compatibility with old browsers, AMD modules are defined by calling a function (`define`), with the content of the module as a callback function.  Needless to say, this is a bit ugly compared to the simple elegance of ES6 module imports (and, to a lesser extent, the CommonJS/Node `require()`).  Nevertheless, the wide cross-platform capabilities of AMD make it a compelling choice as the module system for wq.app.

## Re: Package Managers

To leverage AMD effectively, the wq [setup documentation] and [Django template] specify a recommended project layout that makes it easy to incorporate [third party libraries] without a needing bunch of messy configuration options - which are a common complaint about AMD.  In addition, all of wq.app's JavaScript files and their third-party dependencies are included in the [PyPI package].  Ideally, a JavaScript package manager would be used to manage wq.app's JavaScript code.  However, the most popular JavaScript package managers (npm and Bower) enforce decisions about project structure that are incompatible with wq.app's goals.  [volo] is much more promising but has yet to gain wide traction.  We will keep an eye on the JavaScript ecosystem, as things are constantly improving, but for the time being it's been easier to stick with PyPI and an AMD-friendly project layout.

In summary, JavaScript modules still have a way to go, and we believe vendoring libraries as AMD modules and loading them via RequireJS is the best approach for wq.app at this time.

[wq.app]: https://wq.io/wq.app
[wq framework]: https://wq.io
[collection of AMD modules]: https://wq.io/docs/app
[Why Web Modules?]: http://requirejs.org/docs/why.html
[Why AMD?]: http://requirejs.org/docs/whyamd.html
[RequireJS]: http://requirejs.org
[setup documentation]: https://wq.io/docs/setup
[Django template]: https://github.com/wq/wq-django-template
[third party libraries]: https://wq.io/docs/third-party
[PyPI package]: https://pypi.python.org/pypi/wq.app
[volo]: http://volojs.org/
