---
order: 4
---

locate pattern
================

[wq.db.patterns.locate]

The `locate` module is a [wq.db]&nbsp;[design pattern] for managing one or more location descriptions for entities in a data management project.  For example, it can be used in a volunteer monitoring project to track the locations of monitoring sites and regions.

## Motivation

For many projects, simple latitude & longitude columns are sufficient for tracking site locations.  However, other projects may need to track regions (i.e. "polygons" in GIS parlance) or other features (e.g. rivers represented as lines).  For these projects, it is common to add a "geometry" column to the database, containing geospatial data.  [PostGIS] and [GeoDjango] are particularly useful for this purpose.  If there are multiple tables with geographic information, each table typically needs its own geometry column.

The locate module facilitates centralizing geometry information in a separate location table.  Like the other wq.db design patterns, the locate module follows an [Entity-Attribute-Value (EAV)]-like data model.  This makes it possible to assign multiple locations to an existing entity without changing the database schema.

The locate module is useful in the following situations:
 * When you want to attach geometry information to an entity but are unable to add a column to an existing table.
 * When you need the ability to run a geographic search on the entire database without knowing which specific tables contain results.  (E.g. "give me all available data near my current location")
 * When you need to attach multiple geometries to the same entity with differing provenance, spatial scales, or geometry types.  For example, a river could be represented both as a line and as a polygon.

## Usage

To use the `locate` pattern in your project, add the following to your settings.py:

```python
# myproject/settings.py
INSTALLED_APPS = (
   ...
   'wq.db.patterns.locate'
)
```

Then, create one or more models extending `LocatedModel`.
```python
# myapp/models.py
from wq.db.patterns import models as patterns
# or:
# from wq.db.patterns.locate.models import LocatedModel

class MyModel(patterns.LocatedModel):
   ...
```

The full API is described below.

## Model Classes

### `LocatedModel`
`LocatedModel` is an [abstract base class] that enables the `locate` API for models that extend it.

name | purpose
-----|---------
`locations` | A [GenericRelation] referencing all of the `Location` instances for the model

### `Location`

The `Location` model contains the locations for all `LocatedModel`s in the database. It includes the following fields:

field | purpose
------|---------
`name` | An optional name for the geometry
`geometry` | The actual geographic coordinates, which can be any GeoDjango geometry type.  The field is defined with a default SRID of 4326 - to override, define `SRID` in your `settings.py`.
`accuracy` | The GPS "accuracy" (in meters).  See [wq/locate.js] for a discussion of accuracy and the importance of including it in the database.
`content_object` | A `GenericForeignKey` referencing the model the location describes
`is_primary` | Whether the location is the "primary" geometry for the referenced model

`Location.objects` is a [GeoManager] instance, which provides a number of useful tools for querying by geometry.

Note that there is currently no `LocationType` model, making `locate` a bit different than the typical EAV structure used by the other patterns.  A `LocationType` model may be added in the future if needed.

## Web Interface

### wq.db.rest configuration
When [registered] with the provided `LocatedModelSerializer` (recommended), `LocatedModels` are serialized with a `locations` attribute, each member of which contains [GeoJSON]-formatted `geometry` attribute.  `LocatedModels` can also be accessed as full GeoJSON objects using the alternate `.geojson` representation provided by the REST [URL structure].  This GeoJSON version can be automatically rendered by [wq/map.js] in the list and detail views for the model.  The `map` attribute on the [wq configuration] entry for all registered `LocatedModels` is set to `true` by default.

```python
# myapp/rest.py
from wq.db import rest
from wq.db.patterns import rest as patterns
from .models import MyModel

rest.router.register_model(MyModel, serializer=patterns.LocatedModelSerializer)
```

Output:

```javascript
// mymodels/1.json
{
  "id": "1",
  "label": "My Instance",
  "locations": [
    {
      "id": 4, 
      "name": "Border", 
      "is_primary": false, 
      "geometry": {
        "type": "Polygon", 
        "coordinates": [ /* ... */ ]
      }, 
      "accuracy": null, 
      "label": "Border - My Instance"
    }
  ]
}
```

```javascript
// mymodels/1.geojson
{
  "id": 1,
  "type": "Feature",
  "properties": {
    "label": "My Instance"
  },
  "geometry": {
    "type": "GeometryCollection", 
    "geometries": [
      {
        "type": "Polygon",
        "coordinates": [ /* ... */ ]
      }
    ]
  },
  "crs": {
    "type": "name", 
    "properties": {
      "name": "urn:ogc:def:crs:EPSG::4326"
    }
  } 
}
```

### Template Conventions

[wq.app] currently has limited support for managing location entries in edit views, though [support is planned].  The basic approach is to use a hidden "locations" field that contains a stringified GeoJSON `FeatureCollection` extracted from e.g. a [leaflet.draw] map included in the edit view.  When the form is submitted, the [LocationSerializer] will parse the GeoJSON object into separate `Location` instances.

```xml
<input name="locations" value="{{geojson}}">
<div id="location-map-{{id}}"></div>
```
```javascript
var map = L.map("location-map-" + id, ...);
var geometryLayer = L.geoJson(currentGeojson);
var drawTool = L.Control.Draw({'edit': {'featureGroup': geometryLayer}});
drawTool.addTo(map);
map.on('draw:created', function(e){
  geometryLayer.addLayer(e.layer);
  $('input[name="locations"]').val(JSON.stringify(geometryLayer.toGeoJSON()));
});
```

[wq.db.patterns.locate]: https://github.com/wq/wq.db/blob/master/patterns/locate
[wq.db]: https://wq.io/wq.db
[design pattern]: https://wq.io/docs/about-patterns
[Entity-Attribute-Value (EAV)]: https://wq.io/docs/eav-vs-relational
[PostGIS]: http://postgis.net/
[GeoDjango]: https://docs.djangoproject.com/en/1.7/ref/contrib/gis/
[abstract base class]: https://docs.djangoproject.com/en/1.7/topics/db/models/#abstract-base-classes
[GenericRelation]: https://docs.djangoproject.com/en/1.7/ref/contrib/contenttypes/#django.contrib.contenttypes.fields.GenericRelation
[wq/app.js]: https://wq.io/docs/app-js
[wq/locate.js]: https://wq.io/docs/locate-js
[wq/map.js]: https://wq.io/docs/map-js
[URL structure]: https://wq.io/docs/url-structure
[wq configuration]: https://wq.io/docs/config
[GeoManager]: https://docs.djangoproject.com/en/1.7/ref/contrib/gis/model-api/#geomanager
[GeoJSON]: http://geojson.org
[wq.app]: https://wq.io/wq.app
[support is planned]: https://github.com/wq/wq.app/issues/36
[leaflet.draw]: https://github.com/Leaflet/Leaflet.draw
[LocationSerializer]: https://github.com/wq/wq.db/blob/master/patterns/locate/serializers.py
[registered]: https://wq.io/docs/router
