---
module: wq.app
---


@wq/material
========

[@wq/material]

**@wq/material** provides a complete set of layout, navigation, and form components for use with the [@wq/react] renderer for [@wq/app].  All provided components work in [React] web environments (via [Material UI]), as well as in [React Native] and [Expo] (via [React Native Paper]).  @wq/material provides a consistent API in all three environments, reducing the need for project-specific ".native.js" implementations.

# Installation

## wq.app for PyPI

```bash
python3 -m venv venv      # create virtual env (if needed)
. venv/bin/activate       # activate virtual env
python3 -m pip install wq # install wq framework (wq.app, wq.db, etc.)
# pip install wq.app      # install wq.app only
```

## @wq/material for npm

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

# API

@wq/material should be registered with @wq/app as a plugin.  It will automatically register [@wq/react] as well.

```javascript
// src/index.js
import app from '@wq/app';
import material from '@wq/material';

app.use(material);  // Automatically registers @wq/react

app.init(...);
```

@wq/material also provides named exports of all included components, to facilitate customization and overriding via [@wq/react's component hooks][react-components].

```javascript
// src/inputs/custominput.js
import { Input } from '@wq/material';

export default function PercentInput(props) {
     return <Input min={0} max={100} {...props} />
}

```

# Components

@wq/material provides default implementations of each of the components in the [@wq/react component specification][react-components].  The components are grouped into four categories:

plugin key | description
--|--
[components](#general-components) | General components (List, Table, Button, etc.)
[icons](#icon-components) | Icon components
[input](#input-components) | Form inputs
views | View components (see [@wq/react][react-views]; not overridden by @wq/material)


See [@wq/react's component documentation][react-components] for information on how to override the default components.



# General Components

Also see [@wq/react General Components][react-general].

## Layout

Component|HTML Equivalent|Description
--|--|--
[App]&nbsp;([.native][App.native]) |  | Extends @wq/react's [`<App/>`][react-general] with a [Material UI] theme provider (for web) and a [React Native Paper] provider + [React Navigation] stack navigator (for native)
[Container]&nbsp;([.native][Container.native]) | `<body>` | Root layout component
[Header]&nbsp;([.native][Header.native]) | `<header>` | Site title and breadcrumbs.  Uses the corresponding `<AppBar/>` component from Material UI/React Native Paper.
[Main]&nbsp;([.native][Main.native]) | `<main>` | Main content view
[Footer]&nbsp;([.native][Footer.native]) | `<footer>` | Footer placeholder (the default implementation is empty.)
[View]&nbsp;([.native][View.native]) | `<div>` | Generic block level element.  Use this rather than `<div>` to avoid needing `.native.js` files for your custom layouts.
[ScrollView]&nbsp;([.native][ScrollView.native]) | `overflow-y:auto` | `<View/>` that scrolls if children overflow height. (Typically used to wrap [`<List/>`](#lists))
[HorizontalView]&nbsp;([.native][HorizontalView.native]) | `flex-direction:row` | `<View/> that distributes children across a single flex row.  (Typically used for form actions)
[Text]&nbsp;([.native][Text.native]) |  | Wrapper for text nodes.  Use this or `<Typography/>` to ensure native compatibility.
[Typography]&nbsp;([.native][Typography.native]) | `<h1>, <p>, <caption>` | For web, this is just [Material UI]'s `<Typography/>` component.  The same API is provided for native by automatically selecting one of [React Native Paper]'s Typography components depending on the `variant` prop.
[FormatJson]&nbsp;([.native][FormatJson.native]) | `<pre><code>` | Dump the contents of the `json` prop with a fixed-with font.

## Navigation

Component|HTML Equivalent|Description
--|--|--
[Link]&nbsp;([.native][Link.native]) | `<a>` | Hyperlink that is aware of [@wq/router] actions and paths
[Button]&nbsp;([.native][Button.native]) | `<button type="button">` | Generic button (for use outside of forms).  Accepts an optional string `icon` prop (see [icon components](#icon-components)).  If an `onClick` prop is provided, it will be passed as `onPress` to React Native Paper's `<Button/>`.
[ButtonLink]&nbsp;([.native][ButtonLink.native]) | `<a class="button">` | `<Link/>` formatted to look like a button
[HomeLink]&nbsp;([.native][HomeLink.native]) | `<a href="/">` | Link to index page with "Home" icon (used in `<Breadcrumbs/>`)
[IconButton]&nbsp;([.native][IconButton.native]) |  | Circular button with only an [icon](#icon-components)
[Fab]&nbsp;([.native][Fab.native]) |  | Floating action button with [icon](#icon-components)
[Chip]&nbsp;([.native][Chip.native]) |  | Chip with optional [icon](#icon-components)
[Spinner]&nbsp;([.native][Spinner.native]) |  | Shown while submitting forms and navigating between views
[Breadcrumbs]&nbsp;([.native][Breadcrumbs.native]) |  | Uses the [useBreadcrumbs() hook][react-hooks] to provide link trail e.g. Home -> List -> Detail -> Edit.
[Pagination]&nbsp;([.native][Pagination.native]) |  | Used on list views with more records than can fit on one screen

## Lists

Component|HTML Equivalent|Description
--|--|--
[List]&nbsp;([.native][List.native]) | `<ul>` | List root component.  (For native this is just a `<Fragment/>`.)
[ListItem]&nbsp;([.native][ListItem.native]) | `<li>` | List item supporting primary title (as `children`), secondary `description`, and [`icon`](#icon-components) props.  Any other props are passed on to the corresponding `ListItem` component from each library.
[ListItemLink]&nbsp;([.native][ListItemLink.native]) | `<li><a>` | List item that is also a `<Link/>`
[ListSubheader]&nbsp;([.native][ListSubheader.native]) |  | Subheader for breaking lists into sections
[ExpansionPanel]&nbsp;([.native][ExpansionPanel.native]) | `<details>` | Expansion panel component supporting `summary`, `children`, `open` and `onOpen` props.
[Divider]&nbsp;([.native][Divider.native]) | `<hr>` | Horizontal rule via the corresponding `<Divider/>` component from each library

## Tables

Component|HTML Equivalent|Description
--|--|--
[Table]&nbsp;([.native][Table.native]) | `<table>` | Table root component based on the `<Table/>`/`<DataTable/>` component from each library.
[TableHead]&nbsp;([.native][TableHead.native]) | `<thead>` | Table header container component from each library.
[TableBody]&nbsp;([.native][TableBody.native]) | `<tbody>` | Table body container component.  For native this is just a `<Fragment/>`.
[TableRow]&nbsp;([.native][TableRow.native]) | `<tr>` | Table row component from each library.
[TableTitle]&nbsp;([.native][TableTitle.native]) | `<th>` | Table header cell.  For web this is the same as `<TableCell/>`.
[TableCell]&nbsp;([.native][TableCell.native]) | `<td>` | Table body cell from each library.

## Forms

Component|HTML Equivalent|Description
--|--|--
[FormRoot]&nbsp;([.native][FormRoot.native]) | `<form>` | Actual `<form>` component for web.  Uses `<Fragment/>` in native as form submission is handled by SubmitButton instead.
[FormError]&nbsp;([.native][FormError.native]) |  | Renders form-level error messages. (Field-level errors are handled in each [input component](#input-components)).
[Fieldset]&nbsp;([.native][Fieldset.native]) | `<fieldset>` | Group of related fields (e.g. for an XLSForm "group")
[FieldsetArray]&nbsp;([.native][FieldsetArray.native]) |  | Repeating group of nested fields (e.g. XLSForm "repeat") with support for adding/removing nested records
[FileArray]&nbsp;([.native][FileArray.native]) | `<input type="file" multiple>` | Streamlined UI for an array of files (e.g. XLSForm "repeat" with only a single "file" or "image" field)
[CancelButton]&nbsp;([.native][CancelButton.native]) | `<a href="../">` | Returns to previous page without saving
[SubmitButton]&nbsp;([.native][SubmitButton.native]) | `<button type="submit">` | Use this rather than `<Button type="submit">` to ensure native support (see [Formik docs][formik-native]).
[IconSubmitButton]&nbsp;([.native][IconSubmitButton.native]) |  | `<IconButton/>` with `<SubmitButton/>` functionality
[DeleteForm]&nbsp;([.native][DeleteForm.native]) | | Form that deletes the current record (after confirmation)

# Icon Components

Icon components define a vocabulary of icons to use throughout the app, particularly as the `icon` prop for [`<Button/>`](#navigation), [`<IconButton/>`](#navigation), [`<Fab/>`](#navigation), and [`<ListItem/>`](#lists).  The `icon` prop is specified as a string which is mapped to a component (in web), or to the name of a font icon (in native).  See [@wq/react Icon Components][react-icons] for more information.

Note that by default, @wq/material components that use the `icon` prop will only accept the names listed below.  To add more material icons to the vocabulary, register them via a [custom `icons` plugin][react-components].

Icon | Component |`icon` Prop Value | Description
--|--|--|--
![Add][Add-Icon] | [Add]&nbsp;([.native][Add.native]) | `"add"` | Used for "Add New Record" [`<Fab/>`](#navigation) in [`<DefaultList/>`][react-views]
![Edit][Edit-Icon] | [Edit]&nbsp;([.native][Edit.native]) | `"edit"` | Used for "Edit This Record" [`<Fab/>`](#navigation) in [`<DefaultDetail/>`][react-views]
![Delete][Delete-Icon] | [Delete]&nbsp;([.native][Delete.native]) | `"delete"` | Used in [`<DeleteForm/>`](#forms)
![Success][Success-Icon] | [Success]&nbsp;([.native][Success.native]) | `"success"` | Shown in [`<OutboxList/>`][react-views] for synced records
![Error][Error-Icon] | [Error]&nbsp;([.native][Error.native]) | `"error"` | Shown in [`<OutboxList/>`][react-views] for failed sync attempts
![Pending][Pending-Icon] | [Pending]&nbsp;([.native][Pending.native]) | `"pending"` | Shown in [`<OutboxList/>`][react-views] for currently syncing records
![GpsStart][GpsStart-Icon] | [GpsStart]&nbsp;([.native][GpsStart.native]) | `"gps-start"` |  Used in [Geo][map-inputs] input component
![GpsStop][GpsStop-Icon] | [GpsStop]&nbsp;([.native][GpsStop.native]) | `"gps-stop"` |  Used in [Geo][map-inputs] input component
![Search][Search-Icon] | [Search]&nbsp;([.native][Search.native]) | `"search"` |  Used in [Geo][map-inputs] input component

# Input Components

Input components are used when rendering [form fields][field-types].  See [@wq/react Input Components][react-inputs] for more info.
Component|HTML Equivalent|XLSForm Types
--|--|--
[Checkbox]&nbsp;([.native][Checkbox.native]) | `<input type=checkbox>` | n/a
[DateTime]&nbsp;([.native][DateTime.native]) | `<input type={date,time,datetime-local}>` | date, time, dateTime
[File]&nbsp;([.native][File.native]) | `<input type=file>` | file, video, audio
[Hidden]&nbsp;([.native][Hidden.native]) | `<input type=hidden>` | hidden
[Input]&nbsp;([.native][Input.native]) | `<input type={text,number,file,...}>` | string, int, decimal, ...
[Image]&nbsp;([.native][Image.native]) | `<input type=file accept="image/*">` | image
[Radio]&nbsp;([.native][Radio.native]) | `<input type=radio>` | select one
[Select]&nbsp;([.native][Select.native]) | `<select>` | select one / select
[Toggle]&nbsp;([.native][Toggle.native]) |  | select one

[@wq/material]: https://github.com/wq/wq.app/tree/master/packages/material
[@wq/react]: https://github.com/wq/wq.app/tree/master/packages/react
[@wq/app]: https://wq.io/docs/app-js
[@wq/router]: https://wq.io/docs/router-js

[react-components]: https://github.com/wq/wq.app/tree/master/packages/react#components
[react-general]: https://github.com/wq/wq.app/tree/master/packages/react#general-components
[react-icons]: https://github.com/wq/wq.app/tree/master/packages/react#icon-components
[react-inputs]: https://github.com/wq/wq.app/tree/master/packages/react#input-components
[react-views]: https://github.com/wq/wq.app/tree/master/packages/react#view-components
[react-hooks]: https://github.com/wq/wq.app/tree/master/packages/react#hooks
[map-inputs]: https://github.com/wq/wq.app/tree/master/packages/map#input-components
[field-types]: https://wq.io/docs/field-types

[React]: https://reactjs.org
[React Native]: https://reactnative.dev/
[Expo]: https://expo.io/
[Material UI]: https://material-ui.com/
[React Native Paper]: https://callstack.github.io/react-native-paper/
[Formik]: https://formik.org
[React Navigation]: https://reactnavigation.org/
[formik-native]: https://formik.org/docs/guides/react-native

[App]: https://github.com/wq/wq.app/tree/master/packages/material/src/App.js
[App.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/App.native.js
[Container]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Container.js
[Container.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Container.native.js
[Header]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Header.js
[Header.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Header.native.js
[Main]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Main.js
[Main.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Main.native.js
[Footer]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Footer.js
[Footer.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Footer.native.js
[View]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/View.js
[View.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/View.native.js
[ScrollView]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ScrollView.js
[ScrollView.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ScrollView.native.js
[HorizontalView]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/HorizontalView.js
[HorizontalView.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/HorizontalView.native.js
[Text]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Text.js
[Text.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Text.native.js
[Typography]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Typography.js
[Typography.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Typography.native.js
[FormatJson]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FormatJson.js
[FormatJson.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FormatJson.native.js

[Link]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Link.js
[Link.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Link.native.js
[Button]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Button.js
[Button.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Button.native.js
[ButtonLink]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ButtonLink.js
[ButtonLink.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ButtonLink.native.js
[HomeLink]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/HomeLink.js
[HomeLink.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/HomeLink.native.js
[IconButton]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/IconButton.js
[IconButton.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/IconButton.native.js
[Fab]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Fab.js
[Fab.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Fab.native.js
[Chip]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Chip.js
[Chip.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Chip.native.js
[Spinner]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Spinner.js
[Spinner.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Spinner.native.js
[Breadcrumbs]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Breadcrumbs.js
[Breadcrumbs.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Breadcrumbs.native.js
[Pagination]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Pagination.js
[Pagination.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Pagination.native.js

[List]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/List.js
[List.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/List.native.js
[ListItem]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ListItem.js
[ListItem.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ListItem.native.js
[ListItemLink]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ListItemLink.js
[ListItemLink.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ListItemLink.native.js
[ListSubheader]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ListSubheader.js
[ListSubheader.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ListSubheader.native.js
[ExpansionPanel]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ExpansionPanel.js
[ExpansionPanel.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/ExpansionPanel.native.js
[Divider]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Divider.js
[Divider.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Divider.native.js

[Table]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Table.js
[Table.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Table.native.js
[TableHead]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableHead.js
[TableHead.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableHead.native.js
[TableBody]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableBody.js
[TableBody.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableBody.native.js
[TableRow]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableRow.js
[TableRow.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableRow.native.js
[TableTitle]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableTitle.js
[TableTitle.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableTitle.native.js
[TableCell]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableCell.js
[TableCell.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/TableCell.native.js

[FormRoot]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FormRoot.js
[FormRoot.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FormRoot.native.js
[FormError]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FormError.js
[FormError.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FormError.native.js
[Fieldset]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Fieldset.js
[Fieldset.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/Fieldset.native.js
[FieldsetArray]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FieldsetArray.js
[FieldsetArray.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FieldsetArray.native.js
[FileArray]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FileArray.js
[FileArray.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/FileArray.native.js
[CancelButton]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/CancelButton.js
[CancelButton.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/CancelButton.native.js
[SubmitButton]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/SubmitButton.js
[SubmitButton.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/SubmitButton.native.js
[IconSubmitButton]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/IconSubmitButton.js
[IconSubmitButton.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/IconSubmitButton.native.js
[DeleteForm]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/DeleteForm.js
[DeleteForm.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/components/DeleteForm.native.js

[Add]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[Add.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js
[Edit]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[Edit.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js
[Delete]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[Delete.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js
[Success]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[Success.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js
[Error]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[Error.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js
[Pending]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[Pending.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js
[GpsStart]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[GpsStart.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js
[GpsStop]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[GpsStop.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js
[Search]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.js
[Search.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/icons.native.js

[Checkbox]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Checkbox.js
[Checkbox.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Checkbox.native.js
[DateTime]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/DateTime.js
[DateTime.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/DateTime.native.js
[File]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/File.js
[File.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/File.native.js
[Hidden]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Hidden.js
[Hidden.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Hidden.native.js
[Input]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Input.js
[Input.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Input.native.js
[Image]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Image.js
[Image.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Image.native.js
[Radio]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Radio.js
[Radio.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Radio.native.js
[Select]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Select.js
[Select.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Select.native.js
[Toggle]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Toggle.js
[Toggle.native]: https://github.com/wq/wq.app/tree/master/packages/material/src/inputs/Toggle.native.js


[Add-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/content/add/materialicons/24px.svg
[Edit-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/image/edit/materialicons/24px.svg
[Delete-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/action/delete/materialicons/24px.svg
[Success-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/action/done/materialicons/24px.svg
[Error-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/alert/error/materialicons/24px.svg
[Pending-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/notification/sync/materialicons/24px.svg
[GpsStart-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/device/gps_fixed/materialicons/24px.svg
[GpsStop-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/device/gps_off/materialicons/24px.svg
[Search-Icon]: https://raw.githubusercontent.com/google/material-design-icons/master/src/action/search/materialicons/24px.svg
