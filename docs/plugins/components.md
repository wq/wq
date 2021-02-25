# `components{}`, `icons{}`, `inputs{}`, `views{}`

The component [plugin type] provides a way to override any of the four types of components specified by [@wq/react].  A plugin name is not required, so it can be convenient to create an `[category]/index.js` that exports all componenents, then register it via an anonymous object:

```javascript
// src/components/index.js
import Header from './CustomHeader';
import Footer from './CustomFooter';
export {
    Header,
    Footer
}

// src/inputs/index.js
import * as components from './components/index';
app.use({ components });
```

The plugin should contain an object with one or more of the following keys.  The values should be an object mapping component names to components.  (Indeed, this is how [@wq/material] overrides @wq/react's minimalist defaults with more complete versions.)

category | plugin key
--|--
[General components](#general-components) | `components`
[Icons](#icon-components) | `icons`
[Input types](#input-components) | `inputs`
[Views](#view-components) | `views`

> [@wq/map] recognizes two additional component types, `overlays` and `basemaps`.

## General Components

@wq/react and @wq/material provide a large variety of [general components][components] that can be overridden through the `components` key.  It is also possible to register custom components through the same key, though they will generally be ignored by wq.  The one exception is [fieldset components][fieldsets], which are registered as general components but can be specified through the "appearance" attribute (like [input components](#input-components)).

## Icon Components

@wq/react and @wq/material define a limited set of [icons] for use in supported components.  While the defaults can be overridden, the more common use of a custom `{ icons }` plugin is to to specify the rest of a "vocabulary" of icons to use throughout the application.  Icon components are registered as PascalCase (e.g. `CustomTool`), but should be referenced via param-case in general components like `<IconButton icon="custom-tool"/>`.

```
// src/icons.js
import CustomTool from '@material-ui/icons/SomeIconName';

export { CustomTool };

// src/index.js
import icons from './icons';

app.use({ icons });
```

Note that it is generally best to use an application-specific name for each icon, rather than the exact name from the @material-ui import.  This makes it easier to swap in a different icon later if needed.  (The above example takes advantage of the fact that default exports can be assigned to different names by the importer.)

## Input Components

@wq/react and @wq/material provide a default set of ready-to-use [input components][inputs].  It is possible to override the default components, but it is usually better to register a custom component name and then set the `"appearance"` attribute on the appropriate fields.  Note that the component should be registered via PascalCase, while the appearance definition should use param-case.

The following tutorials specify how to do this:

 * [How To: Define a Custom Input Type][custom-input]
 * [How To: Organize Inputs into Fieldsets][fieldsets]
 * [How To: Implement Repeating Nested Forms][nested-forms]

## View Components

Unlike the other component types, the set of default [view components][views] is defined only in @wq/react, and is not overridden by @wq/material.  This is because all view components are defined exclusively in terms of the other registered component types.

The view component used to render a route is selected by the high level [`<App/>`][App] component by attempting a number of matches with increasing generality.  The configured [route name and mode][@wq/router] are most essential for matching.  To override a view for a specific route, register a corresponding component with the name converted to PascalCase.  E.g. "about" -> "About" or "observation_edit" -> "ObservationEdit".


```javascript
import About from './views/About';

app.use({ views: { About } ));
```

While it is technically possible, the Default* views (particularly [`DefaultEdit`][DefaultEdit]) are generally not meant to be extended or overridden directly.  Try one of these other options first:

 * Customising the [@wq/material] theme
 * Overriding one or more configured [messages][Message]
 * Defining [a custom custom input type][custom-input], a [custom fieldset][fieldsets] or [repeating group of inputs][nested-forms].
 * Overriding any [general components][components] used by the view
 * Creating a wrapper component that imports the default view from @wq/react and renders it with additional children.

If none of the above are sufficient to customize a default view, you can always copy the entire source from the corresponding view - though be sure to replace references to '../hooks' with '@wq/react'.  If your customization only applies to a specific model, then register the custom view as e.g. `ObservationEdit` rather than `DefaultEdit`.

[plugin type]: ./index.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[@wq/map]: ../@wq/map.md
[@wq/router]: ../@wq/router.md

[components]: ../components/index.md
[icons]: ../components/icons.md
[inputs]: ../inputs/index.md
[views]: ../views/index.md

[App]: ../components/App.md
[Message]: ../components/Message.md
[DefaultEdit]: ../views/DefaultEdit.md

[custom-input]: ../guides/define-a-custom-input-type.md
[fieldsets]: ../guides/organize-inputs-into-fieldsets.md 
[nested-forms]: ../guides/implement-repeating-nested-forms.md
