---
order: 7
---

Advanced Design Patterns for Nested Forms
=========================================

In an ideal world, there would be a perfect one-to-one correspondence between the fields on a web form and the underlying database table.  In practice, there are often reasons why this assumption doesn't hold:

 - Certain parts of the form may repeat more than once, which typically requires an auxilary table in most relational databases.
 - Certain fields may be customizable or user-defined, which typically requires an [EAV structure] in most relational databases.
 
This document extends the list of [common field types] to explain how to implement these more complex schemas in wq.
 
## Nested Forms (Repeat Groups)
A fairly frequent use case for wq is to allow the submission of multiple "sub-observations" with a single parent record.  In the XLSForm standard, this concept is refered to as a [repeat group].  In the Django admin interface, this would be supported with an [InlineModelAdmin] class.  On the database end, this is implemented by having a parent table and a "child" table with a foreign key to the parent.

wq supports two ways of handling parent-child relationships - either through nested forms (the current topic), or through separate forms with a foreign key lookup (as discussed in [common field types]).  The choice of which approach to take should largely depend on what will make most sense to your users.  In some cases, the parent record is defined once and then appended to periodically (e.g. a Site/Observation split), so separate forms make more sense.  In others, everything is usually defined at once (e.g. an Observation/Result split), so nested forms make more sense.  The main thing to keep in mind is that wq does not currently support using both methods for the same child model.

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='repeat-name'>Name</label>
    <textarea id='repeat-name' name='name' data-xform-type="text" required></textarea>
    <p class='error repeat-name-errors'></p>
  </li>
  <li data-role="list-divider">Items</li>
  <li class="ui-field-contain">
    <label for='repeat-items-0-name'>Item Name</label>
    <textarea id='repeat-items-0-name' name='items[0][name]' data-xform-type="text" required></textarea>
    <p class='error repeat-items-0-name-errors'></p>
  </li>
  <li class="ui-field-contain">
    <label for='repeat-items-0-count'>Item Count</label>
    <input id='repeat-items-0-count' type='number' data-xform-type='integer' name='items[0][count]' required value="">
    <p class='error repeat-items-0-count-errors'></p>
  </li>
  <li class="section-items"></li>
  
  <li class="ui-field-contain">
    <label for='repeat-items-1-name'>Item Name</label>
    <textarea id='repeat-items-1-name' name='items[1][name]' data-xform-type="text" required></textarea>
    <p class='error repeat-items-1-name-errors'></p>
  </li>
  <li class="ui-field-contain">
    <label for='repeat-items-1-count'>Item Count</label>
    <input id='repeat-items-1-count' type='number' data-xform-type='integer' name='items[1][count]' required value="">
    <p class='error repeat-items-1-count-errors'></p>
  </li>
  <li class="section-items"></li>
  
  <li class="ui-field-contain">
    <label for='repeat-items-2-name'>Item Name</label>
    <textarea id='repeat-items-2-name' name='items[2][name]' data-xform-type="text" required></textarea>
    <p class='error repeat-items-2-name-errors'></p>
  </li>
  <li class="ui-field-contain">
    <label for='repeat-items-2-count'>Item Count</label>
    <input id='repeat-items-2-count' type='number' data-xform-type='integer' name='items[2][count]' required value="">
    <p class='error repeat-items-2-count-errors'></p>
  </li>
  <li class="section-items"></li>
  
  <li>
    <button type="button" data-wq-action="addattachment" data-wq-section="items">
       Add Items
    </button>
  </li>
</ul>

Like the common field types, wq allows nested forms to be specified using either the XLSForm syntax or directly with Python code.  The later is quite a bit more involved due to the need to make wq.db properly serialize the nested relationship.  If possible, you may want to start from the XLSForm version and then tweak the output of `wq addform`.  Otherwise, you can start from the example below.  Note that the child model should be serialized with a subclass of `AttachmentSerializer` while the parent model should be serialized with a subclass of `AttachedModelSerializer` (both provided by `wq.db.patterns`).

*XLSForm Definition*:

type | name | label | constraint | required
-----|------|-------|------------|----------
text | name | Name | | yes
begin repeat | items | Items | wq:initial(3) | yes
text | name | Item Name | | yes
integer | count | Item Count | | yes
end repeat | | | | 

*Django definition*:

```python
# myapp/models.py
from django.db import models

class Survey(models.Model):
    name = models.TextField(
        verbose_name="Name",
    )
    class Meta:
        verbose_name = "survey"
        verbose_name_plural = "surveys"

class Item(models.Model):
    survey = models.ForeignKey(
        Survey,
        related_name="items",
    )
    name = models.TextField(
        verbose_name="Item Name",
    )
    count = models.IntegerField(
        verbose_name="Item Count",
    )
    class Meta:
        verbose_name = "item"
        verbose_name_plural = "items"

# myapp/serializers.py
from wq.db.patterns import serializers as patterns
from .models import Survey, Item

class ItemSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = Item
        exclude = ('survey',)
        object_field = 'survey'
        wq_config = {
            'initial': 3,
        }

class SurveySerializer(patterns.AttachedModelSerializer):
    items = ItemSerializer(many=True)
    class Meta:
        model = Survey

# myapp/rest.py
from wq.db import rest
from .models import Survey
from .serializers import SurveySerializer

rest.router.register_model(
    Survey,
    serializer=SurveySerializer,
    fields="__all__",
)
```

Note that when using nested forms, the child model should not be registered with the REST API directly - it is only pulled in as an "attachment" to the parent record.

## User-Defined Attributes (EAV)

Many wq-powered applications include the ability for users to define custom attributes that are submitted with each observation.  This is typically accomplished through an [Entity-Attribute-Value (EAV) structure][EAV structure].  An EAV structure can be considered a special case of the nested form or parent-child relationship.  In this case, the Entity model is the parent, the Value model is the child, and the Attribute model is a third auxilary table.  The Value table contains a foreign key to the Entity and also to the Attribute table.  (By informal convention, the foreign key field pointing to Attribute is often named "type" in wq's implementations of EAV).

It is technically possible to define an EAV structure using the same methods as shown above for nested forms.  (If using XLSForm you could put a `wq:ForeignKey` somewhere within a repeat group).  However, by default you may end up with a form that looks something like this:

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='eav-date'>Date</label>
    <input type='date' id='eav-date'>
  </li>
  <li data-role="list-divider">Results</li>
  <li class="ui-field-contain">
    <label for='eav-results-0-type_id'>Parameter</label>
    <select id='eav-results-0-type_id' name='results[0][type_id]' required>
      <option value="">Select one...</option>
      <option value="temperature" selected>Temperature</option>
      <option value="humidity">Humidity</option>
      <option value="precipitation">Precipitation</option>
    </select>
  </li>
  <li class="ui-field-contain">
    <label for='eav-results-0-value'>Value</label>
    <input id='eav-results-0-value' type='number' name='results[0][value]' required>
  </li>
  <li class="section-results"></li>
  <li class="ui-field-contain">
    <label for='eav-results-1-type_id'>Parameter</label>
    <select id='eav-results-1-type_id' name='results[1][type_id]' required>
      <option value="">Select one...</option>
      <option value="temperature">Temperature</option>
      <option value="humidity" selected>Humidity</option>
      <option value="precipitation">Precipitation</option>
    </select>
  </li>
  <li class="ui-field-contain">
    <label for='eav-results-1-value'>Value</label>
    <input id='eav-results-1-value' type='number' name='results[1][value]' required>
  </li>
  <li class="section-results"></li>
  <li class="ui-field-contain">
    <label for='eav-results-2-type_id'>Parameter</label>
    <select id='eav-results-2-type_id' name='results[2][type_id]' required>
      <option value="">Select one...</option>
      <option value="temperature">Temperature</option>
      <option value="humidity">Humidity</option>
      <option value="precipitation" selected>Precipitation</option>
    </select>
  </li>
  <li class="ui-field-contain">
    <label for='eav-results-2-value'>Value</label>
    <input id='eav-results-2-value' type='number' name='results[2][value]' required>
  </li>
  <li class="section-results"></li>
  <li>
    <button type="button" data-wq-action="addattachment" data-wq-section="results">
       Add Results
    </button>
  </li>
</ul>

It is likely that you will want your non-power users to be unaware of the EAV implementation details.  In that case, you should be able to simplify the HTML down to something like the following.  The [Try WQ] source code uses this trick.

<ul data-role="listview" data-inset="true">
  <li class="ui-field-contain">
    <label for='eav-date'>Date</label>
    <input type='date' id='eav-date'>
  </li>
  <li data-role="list-divider">Results</li>
  <li class="ui-field-contain">
    <input type='hidden' name='results[0][type_id]' value='temperature'>
    <label for='eav-results-0-value'>Temperature</label>
    <input id='eav-results-0-value' type='number' name='results[0][value]' required>
  </li>
  <li class="ui-field-contain">
    <input type='hidden' name='results[1][type_id]' value='humidity'>
    <label for='eav-results-1-value'>Humidity</label>
    <input id='eav-results-1-value' type='number' name='results[1][value]' required>
  </li>
  <li class="ui-field-contain">
    <input type='hidden' name='results[2][type_id]' value='precipitation'>
    <label for='eav-results-2-value'>Precipitation</label>
    <input id='eav-results-2-value' type='number' name='results[2][value]' required>
  </li>
</ul>

wq.db's [patterns module] includes some out-of-the box implementations of EAV, in particular through the [annotate] pattern.  In addition, the [vera] module provides an E(R)AV structure that is particularly suited for time-series datasets.

If neither of these options quite work for you, you can roll your own EAV pattern by defining the models yourself:

*Models*:

To define an EAV structure, you will need at least three models (corresponding to the Entity, Attribute, and Value).

```python
# myapp/models.py
from django.db import models

# Entity
class Observation(models.Model):
    date = models.DateField()

# Attribute
class Parameter(models.Model):
    name = models.CharField(
        max_length=255,
    )

# Value
class Result(models.Model):
    observation = models.ForeignKey(
        Observation,
        related_name="results",
    )
    type = models.ForeignKey(
        Parameter,
        related_name="results",
    )
    value = models.FloatField()
```

*Serializers*:

You will then need a custom serializer for your Entity model that includes a nested serializer for the Value model.  The serializer should be aware of the presence of the Attribute/type field.  The nested serializer will ensure that the custom Values are included whenever an Entity is serialized.  It also will handle parsing and saving Values submitted together with a parent Entity.  `wq.db.patterns` defines a `TypedAttachmentSerializer` base class that extends `AttachmentSerializer` for this purpose.  Like the nested form case, a subclass of `AttachedModelSerializer` should be used for the Entity model.

```python
# myapp/serializers.py
from wq.db.patterns import serializers as patterns
from .models import Result, Observation

class ResultSerializer(patterns.TypedAttachmentSerializer):
    class Meta(patterns.TypedAttachmentSerializer.Meta):
        model = Result
        exclude = ('observation',)
        object_field = 'observation'
        type_field = 'type_id'
        type_filter = {}
        
class ObservationSerializer(patterns.AttachedModelSerializer):
    results = ResultSerializer(many=True)
```

Note the two EAV-specific serializer options: `type_field`, which indicates the name of the foreign key pointing from the Value table to the Attribute table, and `type_filter`, which is optional.  `type_field` is used on the server when processing incoming records.  `type_filter` is copied to the configuration and then parsed at runtime to filter the list of defined attributes based on the current URL parameters (see the [configuration syntax]).  This makes it possible to define "campaign builder" type apps where the set of parameters that show up on the observation form is dependent on which campaign you select initially.  See [Try WQ]'s [ResultSerializer] for an example.  By default, all attribute definitions will be made available when creating a new Entity record.

*Registration*:

Once the models and serializers are defined, register the Entity and Attribute models with wq.db.  (The Value model does not need to be registered as it is already nested in the Entity registration.)  The Attribute model can be registered as a regular editable model with the default templates.  This makes it possible for users to create new attribute definitions on the fly.  Even if you don't need this capability, the Attribute model should be registered separately so it can be picked up by wq/app.js when rendering the Entity screens.

```python
# myapp/rest.py
from wq.db import rest
from .models import Observation, Parameter
from .serializers import ObservationSerializer

# Entity+Value
rest.router.register_model(
    Observation,
    serializer=ObservationSerializer,
    fields="__all__",
)

# Attribute
rest.router.register_model(
    Parameter,
    fields="__all__",
)
```


[EAV structure]: https://wq.io/docs/eav-vs-relational
[common field types]: https://wq.io/docs/field-types
[repeat group]: http://xlsform.org/#repeats
[InlineModelAdmin]: https://docs.djangoproject.com/en/1.10/ref/contrib/admin/#inlinemodeladmin-objects
[Try WQ]: https://github.com/powered-by-wq/try.wq.io
[patterns module]: https://wq.io/docs/about-patterns
[annotate]: https://wq.io/docs/annotate
[vera]: https://wq.io/vera
[configuration syntax]: https://wq.io/docs/config
[ResultSerializer]: https://github.com/powered-by-wq/try.wq.io/blob/master/db/campaigns/serializers.py
