---
order: 9
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

Like the common field types, wq allows nested forms to be specified using either the XLSForm syntax or directly with Python code.  The later is quite a bit more involved due to the need to make wq.db properly serialize the nested relationship.  If possible, you may want to start from the XLSForm version and then tweak the output of `wq addform`.

*XLSForm Definition*:

type | name | label | constraint | required
-----|------|-------|------------|----------
text | name | Name | yes |
begin repeat | items | Items | wq:initial(3) | yes
text | name | Item Name | yes
integer | count | Item Count | yes
end repeat |

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

WIP

 [EAV structure]: https://wq.io/docs/eav-vs-relational
 [common field types]: https://wq.io/docs/field-types
 [repeat group]: http://xlsform.org/#repeats
 [InlineModelAdmin]: https://docs.djangoproject.com/en/1.10/ref/contrib/admin/#inlinemodeladmin-objects
