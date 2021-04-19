---
permalink: /wq.app/
title: wq.app
wq_config:
  name: wqapp
  url: wq.app
  show_in_index: false
---

![wq.app](https://wq.io/images/wq.app.svg)

**wq.app** is a suite of JavaScript modules created to facilitate the rapid deployment of offline-capable HTML5 mobile and desktop data collection apps.  Potential use cases include **surveys**, **geographic data capture & management**, and **crowdsourcing**/**citizen science**.  wq.app is the client component of the [wq framework], and can be used with a [wq.db] server or adapted for use with any API.

[**wq.app on GitHub**](https://github.com/wq/wq.app)

## Installation

wq.app is available via both npm (as [@wq/app](https://npmjs.com/package/@wq/app)) and PyPI (as [wq.app](https://pypi.org/project/wq.app)).  To facilitate rapid deployment with [wq.db] and Django, the wq.app Python package comes with pre-bundled builds of @wq/app's core dependencies and recommended plugins.

### Python
```bash
# Recommended: create virtual environment
# python3 -m venv venv
# . venv/bin/activate

# Install entire wq suite (recommended)
python3 -m pip install wq

# Install only wq.app
python3 -m pip install wq.app
```

### Node
```bash
# Install @wq/app and recommended plugins
npm install wq

# Install only @wq/app core libraries
npm install @wq/app
```

See [the documentation][setup] for more information.

## API

wq.app provides a complete suite of JavaScript modules for offline GIS data collection and management.  These include the core @wq/app package and its dependencies, as well as plugins for UI renderers and map engines.  See the notes in [Getting Started][setup] for more information about setting up a project layout that utilizes wq.app and/or the @wq/* JavaScript libraries.

### Core Stack

name | description
--|--
[@wq/app] | High-level application controller and configuration-driven CRUD client
[@wq/store] | Redux-based store with pre-configured offline persistence
[@wq/router] | Responds to URL changes with local and/or server data
[@wq/model] | Provides a client-side ORM for collections retrieved from a REST API (such as [wq.db])
[@wq/outbox] | Saves form submissions while offline and syncs to the server later

### Plugins
#### UI Renderers

As of wq.app 1.3, UI rendering is handled via plugins, with two main alternative renderers available.  This is part of the [roadmap for wq.app 2.0](https://github.com/wq/wq.app/issues/111).

module | description
--|--
[@wq/react]+[@wq/material] | New Material Design renderer based on [React] and [React Native]
[@wq/jquery-mobile] | Legacy renderer based on [jQuery Mobile] and [Mustache.js], used in wq.app 1.2 and all earlier versions

When installing @wq/app directly from NPM, one of the two renderers should be installed and registered explicitly.  When using the wq.app PyPI package, a default renderer will be provided based on the version of [wq create / wq start][wq.create] used to create the project.  (New ESM-based projects will default to the @wq/material renderer, while older AMD/RequireJS projects will default to the @wq/jquery-mobile renderer.)

#### Map Engines

wq.app also provides optional map plugins for projects needing interactive GIS capabilities such as GPS point collection.  In wq.app 1.3, there are two alternative map engines available.

module | description
--|--
[@wq/map]+[@wq/map-gl] | [Mapbox GL JS] integration for web and Mapbox Maps SDK for [Android][mapbox-android] & [iOS][mapbox-ios].
[@wq/map]+[@wq/leaflet] | [Leaflet] integration (web only).  Compatible with @wq/map 1.2 and earlier

[wq framework]: ../index.md
[wq.db]: ../wq.db/index.md
[wq.create]: ../wq.create/index.md
[setup]: ../overview/setup.md
 
[React]: https://reactjs.org/
[React Native]: https://reactnative.dev/
[jQuery Mobile]: http://jquerymobile.com
[Mustache.js]: https://mustache.github.com/
[Leaflet]: http://leafletjs.com
[Mapbox GL JS]: https://docs.mapbox.com/mapbox-gl-js/
[mapbox-android]: https://docs.mapbox.com/android/maps/overview/
[mapbox-ios]: https://docs.mapbox.com/ios-sdk/maps/overview/
 
[@wq/app]: ../@wq/app.md
[@wq/model]: ../@wq/model.md
[@wq/outbox]: ../@wq/outbox.md
[@wq/store]: ../@wq/store.md
[@wq/router]: ../@wq/router.md
[@wq/map]: ../@wq/map.md
[@wq/react]: ../@wq/react.md
[@wq/material]: ../@wq/material.md
[@wq/map-gl]: ../@wq/map-gl.md

[@wq/jquery-mobile]: https://github.com/wq/wq.app/tree/main/packages/jquery-mobile
[@wq/leaflet]: https://github.com/wq/wq.app/tree/main/packages/leaflet
