---
module: wq.app
---

@wq/material
========

[@wq/material][source]

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
npm install @wq/material # install @wq/material, @wq/react, and web deps
```

@wq/material specifies all required dependencies for web usage.  For use with [React Native] or [Expo], you will need to install the following additional libraries:

```bash
# Expo
expo install react-native-paper \
  @react-navigation/native \
  @react-navigation/stack \
  @react-native-community/masked-view \
  @react-native-community/netinfo \
  @react-native-community/datetimepicker \
  react-native-picker-select \
  react-native-modal-datetime-picker

# React Native
npm install react-native-paper \
  @react-navigation/native \
  @react-navigation/stack \
  @react-native-community/masked-view \
  @react-native-community/netinfo \
  @react-native-community/datetimepicker \
  react-native-picker-select \
  react-native-modal-datetime-picker
```

## API

The [wq.js][wq] build provided by wq.app includes @wq/material by default.  So, you do not need to explicitly register @wq/material when using wq.app for PyPI.

When using @wq/app for npm, @wq/material should be registered with @wq/app as a plugin.  It will automatically register [@wq/react] as well.

```javascript
// src/index.js
import app from '@wq/app';
import material from '@wq/material';

app.use(material);  // Automatically registers @wq/react

app.init(...);
```

### Components

Once installed and @wq/material registeres default implementations of the component types defined by [@wq/react].  The components are grouped into four categories:

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

[source]: https://github.com/wq/wq.app/tree/main/packages/material
[@wq/react]: ./react.md
[@wq/app]: ./app.md
[@wq/router]: ./router.md
[wq]: ../wq.md
[components]: ../components/index.md
[icons]: ../icons.md
[inputs]: ../inputs/index.md
[components-plugin]: ../plugins/components.md

[React]: https://reactjs.org
[React Native]: https://reactnative.dev/
[Expo]: https://expo.io/
[Material UI]: https://material-ui.com/
[React Native Paper]: https://callstack.github.io/react-native-paper/
[Formik]: https://formik.org
[React Navigation]: https://reactnavigation.org/
[formik-native]: https://formik.org/docs/guides/react-native
