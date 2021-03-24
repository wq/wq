# create-react-app vs. wq

The [wq framework] is built on [React], and uses popular React conventions (like [hooks]) and libraries (like [Material UI] and [Redux]).  While it is conceptually similar, wq provides quite a bit more out of the box than the default template provided by [create-react-app].  This makes it easy to get started quickly with wq, but the layout is a bit different than experienced React developers may used to.

In addition, there are two different project templates for wq, with differing levels of control.  The `wq create --with-npm` command uses [@wq/cra-template] to install [@wq/app], [@wq/material], and related dependencies from NPM.  By contrast, the `wq create --without-npm` command leverages the [wq-django-template] and the [wq.app PyPI package][wq.app].  wq.app includes a precompiled static file, wq.js, which already includes @wq/app, @wq/material, @wq/mapbox and all dependencies including React and Redux.

If you are new to wq and React, we highly recommend using the `wq create --without-npm` option and the wq-django-template to get started.  Otherwise, read on for more details on the differences between the options.

## Feature Comparison

&nbsp; | **Default CRA Template** | **@wq/cra-template** | **wq-django-template**
--|--|--|--
UI Framework | - | `@wq/material` or `@wq/jquery-mobile`(deprecated) | `@wq/material`
Map Engine | - | `@wq/mapbox`, `@wq/leaflet`, or none | `@wq/mapbox`
State Management | - | `@wq/store` (Redux) | `@wq/store` (Redux)
Offline Support | Service Worker | Service Worker + `@wq/outbox` | Service Worker + `@wq/outbox`
Build System | Webpack + Babel | Webpack + Babel | `./manage.py collectstatic`¹
Dependency Management | npm / yarn | npm / yarn + pip | pip¹
wq Import Path | n/a | `import app from '@wq/app';` | `import wq from './wq.js'`
Entry Point | `ReactDOM.render()` | `app.init()` | `wq.init()`
Compiled JS | ES5/6 | ES5/6 | ES6 Only²


 * ¹ Note that the wq-django-template can optionally be used with [@wq/rollup-plugin] to compile app-specific plugins and JSX, while still leveraging the main wq.js build for most functionality.  In that case, npm will be used used to build the JavaScript for the specific Django app, while the project as a whole will still be primarily pip-based.

 * ² All modern browsers support ES6 modules, so this shouldn't usually be an issue.


## Summary

Assuming you are ready to start using wq, here are some reasons you might want to use wq-django-template and the precompiled wq.js provided by wq.app:

 * Unsure which template to use
 * Quick start with no system dependencies other than Python
 * Integrate with existing Django project
 * Fast (or no) compilation step
 
Meanwhile, here are some reasons you might want to use the NPM integration provided by @wq/cra-template:

 * Already know you need to use NPM
 * Integrate with existing React project
 * Support IE11
 * Publish native apps via React Native

In either case, @wq/app's init() function handles all of the top-level boilerplate, including `ReactDOM.render()`, `createStore()`, `ReduxProvider`, and `MuiThemeProvider` etc.  Thus, it is not as easy to override these items as it is in the default create-react-app template.  That said, most customization is still possible through wq's [plugin system][plugins].  For example, you can use wq plugins to specify a [custom reducer for redux][redux-state-plugin], or a [custom view component][views].  You can even override the [top-level App component][App] if needed, for example to add additional providers.

[wq framework]: ../index.md
[React]: https://reactjs.org
[hooks]: ../hooks/index.md
[Material UI]: https://material-ui.com
[Redux]: https://redux.js.org/
[create-react-app]: https://create-react-app.dev/
[@wq/cra-template]: ../@wq/cra-template.md
[@wq/app]: ../@wq/app.md
[@wq/material]: ../@wq/material.md
[wq-django-template]: https://github.com/wq/wq-django-template
[wq.app]: ../wq.app/index.md
[@wq/rollup-plugin]: ../@wq/rollup-plugin.md
[plugins]: ../plugins/index.md
[redux-state-plugin]: ../plugins/reducer.md
[views]: ../views/index.md
[App]: ../components/App.md
