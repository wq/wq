---
order: 6
---

Geospatial support in wq.io
===========================
[wq.io.gis]

[wq.io] includes a [gis submodule] with a number of extensions for working with geospatial data.  This submodule requires [Fiona], [Shapely], and [GeoPandas], which are not installed with wq.io by default.  wq.io.gis provides a Fiona-powered [loader] and [parser], as well as three Shapely and GeoPandas-powered [mapper] classes.  These are combined with a GIS-aware [BaseIO] extension to provide a set of three pre-mixed base classes, described below.

To leverage all of these features:
```bash
pip install wq.io
pip install geopandas
```

### GisIO

The `GisIO` class (and the corresponding `GisMapper` mixin) provide an API similar to `TupleMapper`, but with a `geometry` field on each row containing the [GeoJSON-like objects] returned from Fiona.

```python
from wq.io.gis import GisIO
data = GisIO(filename='sites.shp')
for id, site in data.items():
    print id, site.name, site.geometry['type']
```

Note that all of the gis IO classes assume a `key_field` of "id" and will behave like a `dict` (See [BaseIO]).
  
### ShapeIO

The `ShapeIO` class (and corresponding `ShapeMapper` mixin) replaces the GeoJSON-like `geometry` attribute with a [Shapely geometry object] for convenient manipulation and computation.

```python
from wq.io.gis import ShapeIO
data = ShapeIO(filename='sites.shp')
for id, site in data.items():
    print id, site.name, site.geometry.area
```

### WktIO

The `WktIO` class (and corresponding `WktMapper` mixin) replaces the Shapely `geometry` attribute with a [WKT string] to simplify use with other libraries.

```python
from wq.io.gis import WktIO
data = WktIO(filename='sites.shp')
for id, site in data.items():
    OrmModel.objects.create(name=site.name, geometry=site.geometry)
```

### GeoDataFrame

Like all wq.io classes, the gis IO classes provide an `as_dataframe()` function for Pandas-powered analysis.

```python
from wq.io.gis import ShapeIO
data = ShapeIO(filename='sites.shp')
df = data.as_dataframe()
df.plot()
```

### Syncing gis IO classes

All gis IO classes support the `sync()` operation (see [BaseIO]).  Additional care is taken to ensure the Shapely metadata (other than the driver) is synced together with the data.

```python
source = ShapeIO(filename="source.shp")
dest = ShapeIO(filename="dest.geojson")
source.sync(dest)
```

[wq.io]: https://wq.io/wq.io
[wq.io.gis]:  https://github.com/wq/wq.io/blob/master/gis/
[gis submodule]:  https://github.com/wq/wq.io/blob/master/gis/
[Fiona]: https://github.com/Toblerity/Shapely
[Shapely]: https://github.com/Toblerity/Shapely
[GeoPandas]: http://geopandas.org/
[loader]: https://wq.io/docs/loaders
[parser]: https://wq.io/docs/parsers
[mapper]: https://wq.io/docs/mappers
[BaseIO]: https://wq.io/docs/base-io
[GeoJSON-like objects]: http://toblerity.org/fiona/manual.html#data-model
[Shapely geometry object]: http://toblerity.org/shapely/manual.html#geometric-objects
[WKT String]: http://en.wikipedia.org/wiki/Well-known_text
