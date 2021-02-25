---
module: wq.app
---

@wq/react
========

[@wq/react]

**@wq/react** is a renderer plugin for [@wq/app] that seamlessly integrates with the [React] and [React Native] frameworks.  @wq/react provides a number of default [components](#components) and [hooks](#hooks) to facilitate rapid deployment of applications backed by @wq/app's storage, data model, routing, and syncing engines ([@wq/store], [@wq/model], [@wq/router], and [@wq/outbox], respectively.)

@wq/react is meant to be used with [@wq/material], which provides a collection of ready-to-use Material Design interface components.

# Installation

## wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

## @wq/react for npm

```bash
npm install @wq/material # install @wq/material and @wq/react and deps
# npm install @wq/react  # install only @wq/react and deps
```

# API

@wq/react should be registered with @wq/app as a plugin, either directly or indirectly via [@wq/material].

```javascript
import app from '@wq/app';
import material from '@wq/material';

app.use(material);  // Automatically registers @wq/react

app.init(...);
```

@wq/react also exports a selection of [components](#general-components) and [hooks](#hooks).

# Components

@wq/react provides a complete set of components corresponding to @wq/app's [data model][config] and [URL structure][url-structure].  The components are grouped into four categories:

plugin key | description
--|--
[components](#general-components) | General components (List, Table, Button, etc.)
[icons](#icon-components) | Icon components
[input](#input-components) | Form inputs
[views](#view-components) | View components

To override components in any of these categories, register a custom plugin with the corresponding key.  The value should be an object mapping component names to components.  (Indeed, [this is how][material-index] @wq/material overrides @wq/react's minimalist defaults with more complete versions.)  A plugin name is not required, so it can be convenient to create an `[category]/index.js` that exports all componenents, then register it via an anonymous object:

```javascript
// src/index.js
import app from '@wq/app';
import material from '@wq/material';
import components from './components';
import inputs from './inputs';

app.use(material)
app.use({ components, inputs });
app.init(...);

// src/components/index.js
import Header from './CustomHeader';
import Footer from './CustomFooter';
export default {
    Header,
    Footer
}

// src/inputs/index.js
import Select from './CustomDefaultSelect';
export default {
    Select,
}
```

## General Components

@wq/material overrides most of the default general components.  Those that are exported directly by @wq/react are listed here.  See [@wq/material's general components][material-components] for the remainder.  The components below should not generally be overridden except in advanced cases.  

Name | Details
--|--

Components marked with * are overridden and extended by @wq/material.

## Icon Components

@wq/material overrides all default icon components ([see list][material-icons]), but they are listed here for convenience.

name | description
--|--
[Add] | Used for "Add New Record" [Fab][material-navigation]
[Edit] | Used for "Edit This Record" [Fab][material-navigation]
[Delete] | Used for [DeleteForm][material-forms]
[Success] | Shown in outbox for synced records
[Error] | Shown in outbox for failed sync attempts
[Pending] | Shown in outbox for currently syncing records
[GpsStart] | Used in [Geo][map-inputs] input component
[GpsStop] | Used in [Geo][map-inputs] input component
[Search] | Used in [Geo][map-inputs] input component

While the defaults can be overridden, the more common use of a custom `{ icons }` plugin is to to specify the rest of a "vocabulary" of icons to use throughout the application.  Icon components are registered as PascalCase, but should be referenced via param-case in general components like [`<IconButton/>`][material-navigation] and [`<Fab/>`][material-navigation].

```javascript
<IconButton icon="delete" />
<Fab icon="edit" />
```

## Input Components

Input components are used when rendering [form fields][field-types].   @wq/material overrides all default input components ([see list][material-inputs]), but they are listed here for convenience.

Name | HTML Equivalent | XLSForm Types
--|--|--
[Checkbox] | `<input type=checkbox>` | n/a
[DateTime] | `<input type={date,time,datetime-local}>` | date, time, dateTime
[File] | `<input type=file>` | file, video, audio
[Hidden] | `<input type=hidden>` | hidden
[Input] | `<input type={text,number,...}>` | string, int, decimal, ...
[Image] | `<input type=file accept="image/*">` | image
[Radio] | `<input type=radio>` | select one
[Select] | `<select>` | select one / select
[Toggle] | n/a | select one

Note that overriding any of the above will affect how all corresponding inputs are rendered.  If you only want to override the input for a specific form field, set the [XLSForm "appearance" attribute][xlsform-appearance] on that field and then define a corresponding component name.  Note that the component should be registered via PascalCase, while the appearance definition should use param-case.

For example, given an XLSForm configuration like this:

type|name|label|appearance
--|--|--|--
string|name|Your Name|
select one colors|favorite_color|Your Favorite Color|color-select
select one foods|favorite_food|Your Favorite Food|

And an inputs/index.js like this:

```javascript
import Select from './CustomDefaultSelect';
import ColorSelect from './ColorSelect';

export default {
    Select,
    ColorSelect
}
```

The "name" field would be rendered with `<Input/>`, "favorite_color" be rendered with `<ColorSelect/>`, and the "favorite_foods" input would use `<CustomDefaultSelect/>`.

## View Components

Unlike the other component types, the set of default view components is defined only in @wq/react, and is not overridden by @wq/material.  This is because all view components are defined exclusively in terms of the other registered component types.

The view component used to render a route is selected by the high level [`<App/>`][App] component by attempting a number of matches with increasing generality.  The configured [route name and mode][@wq/router] are most essential for matching. 

name | description
--|--
[Default] | Fallback view for all routes that do not have a registered custom view, or a mode of "detail", "edit", or "list".
[DefaultDetail] | Default view for all "*_detail" routes.  Shows the properties of the selected item in a table generated from the form definition.
[DefaultEdit] | Default view for all "*_edit" routes.  Shows an <AutoForm> for creating or editing the selected item.
[DefaultList] | Default view for all "*_list" routes.
[Index] | Main index view for the app
[Loading] | View to show during the brief interval between navigation and the [@wq/router] RENDER action.
[Login] | Login form.  When submitted, the default auth plugin in [@wq/app] will submit the credentials to the server if available.
[Logout] | Logout form.  The default auth plugin will automatically clear local credentials when this view is loaded.
[NotFound] | 404 view for when the route is not found at all.
[OutboxList] | Lists items in the outbox.  (There is no OutboxDetail/OutboxEdit, as the model-specific views are used instead).
[Server] | View for rendering content loaded from the server (WIP)

To override a view for a specific route, register a corresponding component with the name converted to PascalCase.  E.g. "about" -> "About" or "observation_edit" -> "ObservationEdit".

The default view components are exported by @wq/react, but are generally not meant to be extended or overridden directly.  It should be possible to accomplish most default view customizations by:

 * Customising the [@wq/material] theme
 * Overriding one or more configured [messages](#general-components)
 * Overriding the relevant [child components](#components) (all views call [`useComponents()`](#wqreact-integration) to determine their children)
 * Creating a wrapper component that renders the corresponding default view as well as additional children.

If none of the above are sufficient to customize a default view, you can always copy the entire source from the corresponding link in the above table.  (Be sure to replace references to '../../hooks' with '@wq/react')

# Hooks

@wq/react exports a number of [React hooks] that can be used to access various parts of the application state and plugin framework.

```javascript
import React from 'react';
import { usePlugin, usePluginState } from '@wq/react';
import { Text } from '@wq/material';

export default function Status() {
    const { status } = usePluginState("myplugin"),
        { setStatus } = usePlugin("myplugin");
    return <Text>{status}</Text>;
}
```

The set of available hooks is described in the sections below.

## @wq/router integration

These hooks facilitate interaction with [@wq/router] and the underlying [Redux First Router].

hook | description | example
--|--|--
useBreadcrumbs() | eg. Home -> List -> Detail -> Edit | `breadcrumbs.map(({label, url}) => <Link...>)`
useContextTitle() | Title of currently rendered route |
useNav() | Utility to programatically change pages | `nav("observations/")`
useRenderContext() | Rendered context for the current route | `const { list } = renderContext;`
useReverse() | Function to generate the [redux action][Redux First Router] for any route | `reverse('observation_list') === {"type":"OBSERVATION_LIST"}`
useRouteInfo() | Current route info | `const { name, mode, item_id } = routeInfo`
useRouteTitle(routeName) | Generic title for the specified route |
useSiteTitle() | Site title for header (defaults to route title unless `config.site_title` is set) |

## @wq/app plugin integration

These hooks provide access to registered [@wq/app plugins][@wq/app].

hook | description | example
--|--|--
useApp() | Return the main [@wq/app] instance | `app.retryAll()`
useConfig() | Return the config object registered via `app.init()` | `config.store.service`
usePlugin(pluginName) | Return the specified plugin | `plugin.triggerAction()`
usePluginState(pluginName) | Return the [@wq/store state][@wq/store] for the specified plugin. | `const { status } = pluginState;`
usePluginReducer(pluginName) | Returns the two element array `[usePluginState(), usePlugin()]`. | `[{ status }, { triggerAction }]`
usePluginContent() | Returns a <PluginContent/> component for the current route (see below). |

To specify content to be rendered in <PluginContent/>, define a `runComponent` method on a plugin.  The method should accept a [routeInfo object](@wq/router) and return a string specifying the name of a component to render.  (The actual component should be registered seperately in `plugin.components`.)  Note that the default [`<App/>`] compononent calls `usePluginContent()` automatically and places the component on the right side of the layout.

## @wq/model integration

These hooks provide integration with [@wq/model].  Note that in general, the relevant model data for the current route will already be available via `useRenderContext()`.

hook | description
--|--
useModel(name, filter) | Load all data for the model, or a filtered subset. | `model.map(row => ...)`

## @wq/react integration

These hooks facilitate the definition of higher-order components (such as [views](#view-components)) that do not directly import their child components.  These hooks are intended for library and plugin authors - in most applications, it is easier to just import the child component directly.  

hook | description
--|--
useComponents() | Mapping of [general components](#general-components)
useInputComponents() | Mapping of [input components](#input-components) in both PascalCase and param-case
useHtmlInput(fieldConf) | Returns { name, type, maxLength } for a given XLSForm [input config][field-types]
useIconComponents() | Mapping of [icon components](#icon-components) in both PascalCase and param-case
useIcon(name | component) | If given a name, returns the component from useIconComponents(); otherwise returns component as-is.
useViewComponents() | Mapping of [view components](#view-components) in both PascalCase and param-case

[@wq/react]: https://github.com/wq/wq.app/tree/master/packages/react
[@wq/app]: https://wq.io/docs/app-js
[@wq/store]: https://wq.io/docs/store-js
[@wq/model]: https://wq.io/docs/model-js
[@wq/router]: https://wq.io/docs/router-js
[@wq/outbox]: https://wq.io/docs/outbox-js
[@wq/material]: https://github.com/wq/wq.app/tree/master/packages/material

[config]: https://wq.io/docs/config
[url-structure]: https://wq.io/docs/url-structure
[material-index]: https://github.com/wq/wq.app/blob/master/packages/material/src/index.js
[material-components]: https://github.com/wq/wq.app/tree/master/packages/material#general-components
[material-icons]: https://github.com/wq/wq.app/tree/master/packages/material#icon-components
[material-inputs]: https://github.com/wq/wq.app/tree/master/packages/material#input-components
[material-forms]: https://github.com/wq/wq.app/tree/master/packages/material#forms
[material-navigation]: https://github.com/wq/wq.app/tree/master/packages/material#navigation
[material-layout]: https://github.com/wq/wq.app/tree/master/packages/material#layout
[map-inputs]: https://github.com/wq/wq.app/tree/master/packages/map#input-components
[field-types]: https://wq.io/docs/field-types
[nested-forms]: https://wq.io/docs/nested-forms

[React]: https://reactjs.org
[React Native]: https://reactnative.dev/
[Formik]: https://formik.org
[xlsform-appearance]: https://xlsform.org/en/#appearance
[React hooks]: https://reactjs.org/docs/hooks-overview.html
[Redux First Router]: https://github.com/faceyspacey/redux-first-router

[App]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/App.js
[AutoForm]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/AutoForm.js
[AutoInput]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/AutoInput.js
[AutoSubform]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/AutoSubform.js
[AutoSubformArray]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/AutoSubformArray.js
[PropertyTable]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/PropertyTable.js
[DebugContext]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/DebugContext.js
[Form]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/Form.js
[FormError]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/FormError.js
[Link]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/Link.js
[Message]: https://github.com/wq/wq.app/blob/master/packages/react/src/components/Message.js
[messages]: https://github.com/wq/wq.app/blob/master/packages/react/src/messages.js

[Add]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js
[Edit]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js
[Delete]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js
[Success]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js
[Error]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js
[Pending]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js
[GpsStart]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js
[GpsStop]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js
[Search]: https://github.com/wq/wq.app/blob/master/packages/react/src/icons.js

[Checkbox]: https://github.com/wq/wq.app/blob/master/packages/react/src/inputs/Checkbox.js
[DateTime]: https://github.com/wq/wq.app/blob/master/packages/react/src/inputs/DateTime.js
[Hidden]: https://github.com/wq/wq.app/blob/master/packages/react/src/inputs/Hidden.js
[Input]: https://github.com/wq/wq.app/blob/master/packages/react/src/inputs/Input.js
[Radio]: https://github.com/wq/wq.app/blob/master/packages/react/src/inputs/Radio.js
[Select]: https://github.com/wq/wq.app/blob/master/packages/react/src/inputs/Select.js
[Toggle]: https://github.com/wq/wq.app/blob/master/packages/react/src/inputs/Toggle.js

[Default]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/Default.js
[DefaultDetail]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/DefaultDetail.js
[DefaultEdit]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/DefaultEdit.js
[DefaultList]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/DefaultList.js
[Index]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/Index.js
[Loading]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/Loading.js
[Login]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/Login.js
[Logout]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/Logout.js
[NotFound]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/NotFound.js
[OutboxList]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/OutboxList.js
[Server]: https://github.com/wq/wq.app/blob/master/packages/react/src/views/Server.js
