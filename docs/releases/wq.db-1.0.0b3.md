---
repo: wq.db
date: 2016-11-08
---

# wq.db 1.0 beta 3

**wq.db 1.0 beta 3** brings a couple of new features as well as minor bug fixes.

## API Change

Django REST Framework 3.5 enforces the [requirement](https://www.django-rest-framework.org/topics/3.5-announcement/#modelserializer-fields-and-exclude) that all ModelSerializers have an explicit `fields` or `exclude` attribute.  This is supported in wq.db with a new "fields" argument to `router.register_model`.  As in DRF, you can request the old behavior of including all fields by specifying `"__all__"` as the argument:

``` python
from wq.db import rest
from .models import MyModel

rest.router.register_model(
    MyModel,
    fields="__all__",
)
```

## New Configuration Options
- To facilitate the generation of labels for items still in the outbox, it is now possible to define a label template for a model (using the Mustache syntax) .  This is defined as an attribute (`wq_label_template`) on the _model_ class (rather than the serializer) so that it can be available for use by the `__str__` method.  The new `LabelModel` in [wq.db.patterns.models](https://github.com/wq/wq.db/blob/master/patterns/base/models.py) provides an implementation of the `__str__` method.  Whether or not you extend `LabelModel`, you can set `wq_label_template` on any model to have the setting propagated to the [wq configuration](../config.md) object and then used in the outbox (for [wq.app 1.0.0b2 or newer](./wq.app-1.0.0b2.md))
- Serializers can now have a `wq_field_config` Meta attribute to customize the form configuration for specific fields.  This is primarily to facilitate support for the `filter` configuration option when generating form fields for foreign keys.  On the client (wq.app), the filter option is parsed and then passed on to `model.filter()`.  On the server (wq.db), the updated `get_lookup_choices()` will take the same setting into account when rendering edit views.

By way of example, here is a model that uses both `wq_label_template` and `wq_field_config`:

``` python
# myapp/models.py
from django.db import models
from wq.db.patterns.models import LabelModel

class Item(LabelModel):
    name = models.Model()
    type = models.ForeignKey("ItemType")

    wq_label_template = "{{name}}"

class ItemType(models.Model):
    active = models.BooleanField()
    # ...

# myapp/serializers.py
class ItemSerializer(ModelSerializer):
    class Meta:
        # Add the following attributes to the automatically-generated field config for "type"
        wq_field_config = {
            'type': {
                 'filter': {
                     'active': [
                         # Always allow active types
                         '1',

                         # Allow inactive types when editing existing items
                         '{{#id}}0{{/id}}{{^id}}1{{/id}}',
                     ]
                 }
            }
       }

# myapp/rest.py
from wq.db import rest
from .models import Item, ItemType
from .serializers import ItemSerializer

rest.router.register_model(
    Item,
    serializer=ItemSerializer,
    fields="__all__",
)
rest.router.register_model(
    ItemType,
    fields="__all__",
)
```

The resulting configuration object will look something like this:

``` javascript
// config.json
{
    "pages": {
        "item": {
            "url": "items",
            "list": true,
            "label_template": "{{name}}", // copied from model
            "form": [{
                // ... other fields ...
            }, {
                "name": "type",
                "label": "Type",
                "type": "string",
                "wq:ForeignKey": "itemtype",
                "filter": {"active":  ["1", "{{#id}}0{{/id}}{{^id}}1{{/id}}"]}, // copied from serializer
                "bind": {"required": True}
            }]
        },
        // ... other pages ...
    }
}
```

## Other Improvements
- Django compatibility improvements
- Enable `APP_DIRS` support for [django-mustache](https://github.com/wq/django-mustache)
- Support nested [Django Natural Keys](https://github.com/wq/django-natural-keys) in the form configuration object (including natural keys containing one or more foreign keys).
- Don't crash on `HEAD` and `OPTIONS` HTTP verbs
- Fixes for `dump_config`, `wq.db.patterns.identify`, and GeoJSON support
