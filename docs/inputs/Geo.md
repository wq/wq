## Geospatial Fields

### Point

<ul data-role="listview" data-inset="true">
  <li>
    <label for='input_types-point_field'>Point field</label>
    <input type='hidden' data-xform-type='geopoint' name='point_field' required>
    <div class="map edit-map" id='point-map' data-interactive style='height:300px;background:#ccc;border:1px solid black'></div>
    <p class="hint">Enter a point.</p>
    <p class='error input_types-point_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
geopoint | [name] | Point field | Enter a point. | yes | 

*Django definition:*

```python
from django.contrib.gis.db import models

class MyModel(models.Model):
    [name] = models.PointField(
        srid=4326,
        verbose_name="Point field",
        help_text="Enter a point.",
    )
```

> This field uses a wq/app.js plugin to display the map editor.  For more information, see the documentation for [wq/map.js].  If you are collecting point locations via GPS, you may also be interested in the [wq/locate.js] plugin.

### LineString

<ul data-role="listview" data-inset="true">
  <li>
    <label for='input_types-linestring_field'>Line string field</label>
    <input type='hidden' data-xform-type='geotrace' name='linestring_field'>
    <div class="map edit-map" id='linestring-map' data-interactive style='height:300px;background:#ccc;border:1px solid black'></div>
    <p class="hint">Enter a line.</p>
    <p class='error input_types-linestring_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
geotrace | [name] | Line string field | Enter a line. | | 

*Django definition:*

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

> This field uses a wq/app.js plugin to display the map editor.  For more information, see the documentation for [wq/map.js].

### Polygon

<ul data-role="listview" data-inset="true">
  <li>
    <label for='input_types-polygon_field'>Polygon field</label>
    <input type='hidden' data-xform-type='geoshape' name='polygon_field'>
    <div class="map edit-map" id='polygon-map' data-interactive style='height:300px;background:#ccc;border:1px solid black'></div>
    <p class="hint">Enter a polygon.</p>
    <p class='error input_types-polygon_field-errors'></p>
  </li>
</ul>

*XLSForm Definition:*

type | name | label | hint | required | constraint
-----|------|-------|------|----------|------------
geoshape | [name] | Polygon field | Enter a polygon. | | 

*Django definition:*

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

> This field uses a wq/app.js plugin to display the map editor.  For more information, see the documentation for [wq/map.js].

[wq/map.js]: https://wq.io/docs/map-js
