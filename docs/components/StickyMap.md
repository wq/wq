---
module: "@wq/map"
purpose: maps
---

# StickyMap

@wq/map's `<StickyMap/>` [component] is a wrapper for [`<AutoMap/>][AutoMap] that ensures the specified `mapId` is never unmounted, even when navigating to another route.

By default, any rendered map components will be unmounted and recreated when navigating between routes.  However, it may be better for the user experience to persist certain key maps (such a home screen map), so they appear instantly (and in the same state) when returning to the relevant screen.

To do this, configure the map with a unique `mapId` and render it with the `<StickyMap/>` component, *outside of any route-specific view component*.  For example, this can be accomplished by registering a custom [`<Main/>`][Main] component.

```javascript
// config.js
config.pages.index.map = {
   mapId: 'home-map',
   layers: [...],
}

// CustomMain.js
import React from 'react';
import { Main } from '@wq/material';
import { StickyMap } from '@wq/map';

export default function CustomMain({children, ...rest}) {
    return <Main {...rest}>
       {children}
       <StickyMap mapId="home-map" />
    </Main>;
}

// index.js
import app from '@wq/app';
import Main from './components/CustomMain.js';

app.use({ components: { Main }});

```

[`<AutoMap/>`][AutoMap] which will automatically configure basemaps and overlays corresponding to the map configuration for the current route.  `<StickyMap/>` accepts an optional `invisibleStyle` which will be merged with `<AutoMap/>`'s `containerStyle` to ensure the map is rendered offscreen when the route is inactive.  The default `invisibleStyle` renders the map container far above the screen, while preserving the dimensions to avoid disrupting the map extent.

> Note that persisting many maps offscreen may negatively impact performance.  In particular, browsers typically do not allow more than 16 active WebGL contexts per site.

## Source

The source code for `<StickyMap/>` is available here:

 * [StickyMap.js (@wq/map)][map-src]

The [@wq/map] implementation has no engine-specific components, so there is no alternate [@wq/mapbox] or native version.

[component]: ./index.md
[AutoMap]: ./AutoMap.md
[Main]: ./Main.md
[@wq/map]: ../@wq/map.md
[@wq/mapbox]: ../@wq/mapbox.md

[map-src]: https://github.com/wq/wq.app/blob/main/packages/map/src/components/StickyMap.js
