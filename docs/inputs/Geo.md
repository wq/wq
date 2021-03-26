# Geo

The `<Geo/>` [input component][inputs] provides geospatial support for point, line, and polygon types.

> `Geo` is provided via [@wq/map], which is included in the default [wq.js][wq] build.  If you use a custom React template it is up to you to install and register the @wq/map plugin.

## Point

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Point field",
                    "hint": "Enter a point.",
                    "type": "geopoint",
                    "bind": {"required": true}
                },
            ],
            "name": "survey",
            "url": "surveys",
            "list": true,
            "map": true,
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

import wq from './wq.js';
wq.init(config).then(...);
// navigate to /surveys/new
```

#### XLSForm Definition (geopoint)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
geopoint | [name] | Point field | Enter a point. | yes | 

#### Django Definition (Point)

```python
from django.contrib.gis.db import models

class MyModel(models.Model):
    [name] = models.PointField(
        srid=4326,
        verbose_name="Point field",
        help_text="Enter a point.",
    )
```

## LineString

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Line string field",
                    "hint": "Enter a line.",
                    "type": "geotrace",
                    "bind": {"required": true}
                },
            ],
            "name": "survey",
            "url": "surveys",
            "list": true,
            "map": true,
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

import wq from './wq.js';
wq.init(config).then(...);
// navigate to /surveys/new
```

#### XLSForm Definition (geotrace)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
geotrace | [name] | Line string field | Enter a line. | | 

#### Django Definition (LineString)

```python
from django.contrib.gis.db import models

class MyModel(models.Model):
    [name] = models.LineStringField(
        srid=4326,
        null=True,
        blank=True,
        verbose_name="Line string field",
        help_text="Enter a line.",
    )
```

## Polygon

```javascript
const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Polygon field",
                    "hint": "Enter a polygon.",
                    "type": "geoshape",
                    "bind": {"required": true}
                },
            ],
            "name": "survey",
            "url": "surveys",
            "list": true,
            "map": true,
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

import wq from './wq.js';
wq.init(config).then(...);
// navigate to /surveys/new
```

#### XLSForm Definition (geoshape)

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
geoshape | [name] | Polygon field | Enter a polygon. | | 

#### Django definition (Polygon)

```python
from django.contrib.gis.db import models

class MyModel(models.Model):
    [name] = models.PolygonField(
        srid=4326,
        null=True,
        blank=True,
        verbose_name="Polygon field",
        help_text="Enter a polygon.",
    )
```

## Geolocation & Geocoding

In addition to the drawing tools (provided via the [Draw] component), the Geo input includes a toolbar for navigating to specific coordinates.  The default tools include the browser's geolocation API and raw coordinate fields.  You can also enable a address-based geocoder by registering a `geocoder` [@wq/app plugin][plugins], as in the example below.

Note that when used with a point type, the toolbar overwrites the point location with the geolocation or geocoder result.  When used with a polygon or line type, the toolbar zooms to the location but preserves any existing geometry.

```javascript
const GEOCODER = 'https://api.maptiler.com/geocoding/',
      KEY = '95ZPyiJrDMkmRUoEfSjt';  // Get your own key

async function geocoder(address) {
    const response = await fetch(`${GEOCODER}/${address}.json?key=${KEY}`),
        data = await response.json(),
        matches = data && data.features;

    if (!matches || !matches.length > 0) {
        throw new Error("Unrecognized address");
    }

    return {
        label: matches[0].place_name,
        geometry: {
            type: 'Point',
            coordinates: matches[0].center
        }
    };
}

const config = {
    "pages": {
        "survey": {
            "form": [
                {
                    "name": "name",
                    "label": "Point field",
                    "hint": "Enter a point.",
                    "type": "geopoint",
                    "bind": {"required": true}
                },
            ],
            "name": "survey",
            "url": "surveys",
            "list": true,
            "map": true,
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

import wq from './wq.js';
wq.use({ geocoder });
wq.init(config).then(...);
// navigate to /surveys/new
```

> It is possible to pre-populate the geocoder address field with data entered earlier in the form.  To do this, define a plugin method `geocoderAddress` that accepts the form values and returns an address.

## Source

The source code for `<Geo/>` is available here:

 * [Geo.js (@wq/map)][map-src]

The [@wq/map] implementation is a wrapper around other components (including [Draw]), so there is no alternate `Geo.native.js`.

[inputs]: ./index.md
[@wq/map]: ../@wq/map.md
[wq]: ../wq.md
[Draw]: ../overlays/Draw.md
[plugins]: ../plugins/index.md
[map-src]: https://github.com/wq/wq.app/blob/main/packages/react/src/inputs/Map.js
