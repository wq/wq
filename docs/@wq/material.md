---
title: "@wq/material"
module: wq.app
---

![@wq/material](https://wq.io/images/@wq/material.svg)

**@wq/material** provides a complete set of layout, navigation, and form components for use with the [@wq/react] renderer for [@wq/app].  All provided components work in [React] web environments (via [Material UI]), as well as in [React Native] and [Expo] (via [React Native Paper]).  @wq/material provides a consistent API in all three environments, reducing the need for project-specific ".native.js" implementations.

## Installation

### wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

### @wq/material for npm

```bash
npm install @wq/material @wq/material-web  # install @wq/material, @wq/react, and web deps
```

@wq/material-web specifies all required dependencies for web usage.  For use with [React Native] or [Expo], install @wq/material-native instead.  In either case, @wq/material will automatically forward imports to the appropriate implementation.

## API

The [wq.js][wq] build provided by wq.app includes @wq/material and @wq/material-web by default.  So, you do not need to explicitly register @wq/material when using wq.app for PyPI.

When using @wq/app for npm, @wq/material should be registered with @wq/app as a plugin.  It will automatically register [@wq/react] as well.

```javascript
// src/index.js
import app from '@wq/app';
import material from '@wq/material';

app.use(material);  // Automatically registers @wq/react

app.init(...);
```
### Configuration

@wq/material will look for a "material" section in the [wq Configuration object][config].

```python
WQ_CONFIG = {
    "material": {
        "theme": {
            "primary": "#7500ae",
            "secondary": "#0088bd"
        }
    }
}
```

The following options are supported:

Option | Description
--|--
`theme.primary` | Color to use for primary action buttons and headers
`theme.secondary` | Color to use for secondary action buttons (a.k.a. "accent" color in [React Native Paper]).
`theme.background` | Background color.
`theme.type` | Theme type (dark or light).  Corresponds to [Material UI]'s [mode setting] and React Native Paper's [dark setting][theming].
`theme.pallete` | Directly specify [theme pallete] for Material UI. (Web only)
`theme.version` | Material design [version][theming] (2 or 3) for React Native Paper. (Native only)

### Components

@wq/material registers default implementations of many the component types defined by [@wq/react].  The components are grouped into four categories:

plugin key | description
--|--
[components] | General components (List, Table, Button, etc.)
[icons] | Icon components
[inputs] | Form inputs
views | View components (see [@wq/react]; not overridden by @wq/material)

@wq/material also provides named exports of all included components, to facilitate extending and overriding via a [components plugin][components-plugin].

```javascript
// src/inputs/custominput.js
import { Input } from '@wq/material';

export default function PercentInput(props) {
    return <Input min={0} max={100} {...props} />
}

// src/index.js
app.use({ inputs: { PercentInput });
```

See [the components plugin documentation][components-plugin] for information on how to override the default components.

## Source

The source code for @wq/material is in the [wq.app repository][source].

[source]: https://github.com/wq/wq.app/tree/main/packages/material
[@wq/react]: ./react.md
[@wq/app]: ./app.md
[@wq/router]: ./router.md
[wq]: ../wq.md
[config]: ../config.md
[components]: ../components/index.md
[icons]: ../icons.md
[inputs]: ../inputs/index.md
[components-plugin]: ../plugins/components.md

[mode setting]: https://mui.com/material-ui/customization/dark-mode/
[theme pallete]: https://mui.com/material-ui/customization/palette/
[theming]: https://callstack.github.io/react-native-paper/docs/guides/theming

[React]: https://reactjs.org
[React Native]: https://reactnative.dev/
[Expo]: https://expo.io/
[Material UI]: https://mui.com/material-ui/
[React Native Paper]: https://callstack.github.io/react-native-paper/
[Formik]: https://formik.org
[React Navigation]: https://reactnavigation.org/
[formik-native]: https://formik.org/docs/guides/react-native
