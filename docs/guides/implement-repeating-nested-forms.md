How To: Implement Repeating Nested Forms
=========================================

A fairly frequent use case for the [wq framework] is to allow the submission of multiple "sub-observations" with a single parent record.  In the XLSForm standard, this concept is refered to as a [repeat group].  In the Django admin interface, this would be supported with an [InlineModelAdmin] class.  On the database end, this is implemented by having a parent table and a "child" table with a foreign key to the parent.  A similar approach can be used to support [Entity-Attribute-Value data models][eav] in wq, as described in the last part of this guide.

Note that nested forms make the most sense when all of the related data is submitted from a single screen (e.g. an `Observation` with several `MonitoringResult` rows).  wq also supports relationships defined in separate forms - for example a `Site` might be established once, with several `Observation` records on the same or subsequent days.  In that case, the `Observation` records would appear in separate screens with a [ForeignKey input][ForeignKey] to select the `Site`.  Whether nested or in separate forms, [@wq/outbox] will automatically sync related records in the right order when online.

If you determine that a single data entry screen will provide the best user experience, follow the steps below to set up nested forms.

 * [Step 1: Define the Nested Relationship](#step-1-define-the-nested-relationship)
 * [Step 2: Customize the Fieldset Array](#step-2-customize-the-fieldset-array)
 * [Step 3: Specify Default Values](#step-3-specify-default-values)
 * [Optional: Implement Entity-Attribute-Value Support](#optional-implement-entity-attribute-value-support)

> Note: This guide explains how to implement *repeating* nested forms in wq.  To group related fields without repeating them, see [How To: Organize Inputs into Fieldsets][fieldsets].

## Step 1: Define the Nested Relationship

Like the [common field types][inputs], wq allows nested forms to be specified using either the XLSForm syntax or directly with Python code.  The later is quite a bit more involved due to the need to make wq.db properly serialize the nested relationship.  If possible, you may want to start from the XLSForm version and then tweak the output of `wq addform`.  Otherwise, you can start from the Python example below.  Note that the child model should be serialized with a subclass of `AttachmentSerializer` while the parent model should be serialized with a subclass of `AttachedModelSerializer`, both provided by [`wq.db.patterns`][patterns].

#### XLSForm Definition

type | name | label | constraint | required
-----|------|-------|------------|----------
text | name | Name | | yes
begin repeat | items | Items | wq:initial(3) | yes
text | name | Item Name | | yes
integer | count | Item Count | | yes
end repeat | | | | 

[**Download survey.csv**][survey.csv]

#### db/survey/models.py

```python
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
```

#### db/survey/serializers.py

```python
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
        fields = "__all__"
```

#### db/survey/rest.py

```python
from wq.db import rest
from .models import Survey
from .serializers import SurveySerializer

rest.router.register_model(
    Survey,
    serializer=SurveySerializer,
)
```

> Note that the child table does not need to be registered with wq as a top level model, as it is pulled in as an "attachment" to the parent record.  That said, as of [wq.app 1.2][wq.app-1.2.0] you can register the child separately if you want, and [@wq/model] will automatically transfer nested records to/from the separate ORM model.

### Demo 1

The above configuration will result in an app with the following layout:

```js
// app/js/data/config.js
const config = {
    "pages": {
        "survey": {
            "name": "survey",
            "url": "surveys",
            "list": true,
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "type": "text"
                },
                {
                    "name": "items",
                    "label": "Items",
                    "bind": {
                        "required": true
                    },
                    "type": "repeat",
                    "children": [
                        {
                            "name": "name",
                            "label": "Item Name",
                            "bind": {
                                "required": true
                            },
                            "type": "text"
                        },
                        {
                            "name": "count",
                            "label": "Item Count",
                            "bind": {
                                "required": true
                            },
                            "type": "int"
                        }
                    ],
                    "initial": 3
                }
            ],
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

// app/js/myproject.js
import wq from './wq.js';

wq.init(config).then(...);

// navigate to /surveys/new
```

As the above demo shows, the default [`<FieldsetArray/>`][FieldsetArray] is often usable as-is.  It displays a [`<Fieldset/>`][Fieldset] for each of the initial items (three in this case), as well as a button to add a new fieldset for fourth and subsequent items.  However, it is common to want to override the default with a specific layout depending on your use case.

## Step 2: Customize the Fieldset Array

The process for defining a custom `<FieldsetArray/>` is very similar to [customizing a single fieldset][fieldset], except that in this case there are two components to override.
The `<FieldsetArray/>` defines the outer UI and buttons for adding (or removing) fieldsets, while the inner `<Fieldset/>` component is used to render each row.

For example, you might want a more compact layout that groups the items in a single raised panel, with a `<HorizontalView/>` for each row.  Further, you might want to set a maximum of 5 nested items, and allow removing items.  To do so, you would update the serializer to specify a custom fieldset:

#### db/survey/serializers.py (with custom fieldset array)

```python
from wq.db.patterns import serializers as patterns
from .models import Survey, Item

class ItemSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = Item
        exclude = ('survey',)
        object_field = 'survey'
        wq_config = {
            'initial': 3,
            'control': {'appearance': 'compact-fieldset-array'}
        }

class SurveySerializer(patterns.AttachedModelSerializer):
    items = ItemSerializer(many=True)

    class Meta:
        model = Survey
        fields = "__all__"
```

Then, define `CompactFieldsetArray` as in the example below.

> Note: When using [`wq create --without-npm`][setup], you will need a way to compile JSX to `React.createElement()` calls.  You could use the [online Babel converter][babel-repl], or use npm to install Rollup and Babel (but not necessarily all of create-react-app and wq's npm dependencies).  If you use Rollup, you may find [@wq/rollup-plugin] useful, as it will allow you to write plain npm imports and have them automatically translated to leverage exports from `./wq.js`.  The `app/js/custom.js` example in the demo below simulates the output of a Rollup build.

### Demo 2

```js
// app/js/custom.js
import { modules } from './wq.js';
const React = modules['react'],
  { Fieldset, HorizontalView, View, Button } = modules['@wq/material'];

function CompactFieldsetArray({
    name,
    label,
    children,
    addRow,
    removeLastRow,
}) {
    const showRemove = children.length > 0,
        showAdd = children.length < 5;
    return (
        <Fieldset label={label}>
            {children}
            <HorizontalView>
                {showAdd ? (
                    <Button icon="add" onClick={addRow} color="primary">
                        Add Row
                    </Button>
                ) : (
                    <View />
                )}
                {showRemove ? (
                    <Button icon="delete" onClick={removeLastRow} color="secondary">
                        Remove Row
                    </Button>
                ) : (
                    <View />
                )}
            </HorizontalView>
        </Fieldset>
    );
}

CompactFieldsetArray.Fieldset = function CompactFieldset({
    name,
    label,
    children,
}) {
    return <HorizontalView>{children}</HorizontalView>;
};

const custom = {
    components: { CompactFieldsetArray },
};

// app/js/data/config.js
const config = {
    "pages": {
        "survey": {
            "name": "survey",
            "url": "surveys",
            "list": true,
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "type": "text"
                },
                {
                    "name": "items",
                    "label": "Items",
                    "bind": {
                        "required": true
                    },
                    "type": "repeat",
                    "children": [
                        {
                            "name": "name",
                            "label": "Item Name",
                            "bind": {
                                "required": true
                            },
                            "type": "text"
                        },
                        {
                            "name": "count",
                            "label": "Item Count",
                            "bind": {
                                "required": true
                            },
                            "type": "int"
                        }
                    ],
                    "initial": 3,
                    "control": {
                        "appearance": "compact-fieldset-array"
                    }
                }
            ],
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

// app/js/myproject.js
import wq from './wq.js';
wq.use(custom);
wq.init(config).then(...);

// navigate to /surveys/new
```

> Note that the inner fieldset is defined as a property on the custom fieldset array, rather than registered as a separate component.  This means it is only necessary to set the "appearance" once on the serializer.

## Step 3: Specify Default Values

The default items are completely empty, which might not be what you want.  You can also define default values for repeating groups, both those that show up initially and those that are added later.  The mechanism is slightly different in each case.

To specify default values for *initial* nested items, define a custom [context plugin][context].  Be sure to check the route info to avoid overwriting actual data.

```js
// src/context.js
export default {
    context(ctx, routeInfo) {
        if (routeInfo.name === 'survey_edit:new') {
            return {
                'items': ctx.items.map(item => ({
                    ...item,
                    count: 1
                }))
            }
        }
    }
}
```

To specify default values for *new items added by the user*, pass the values to `addRow()` as in the example below.

### Demo 3

```js
// app/js/custom.js
import { modules } from './wq.js';
const React = modules['react'],
  { Fieldset, HorizontalView, View, Button } = modules['@wq/material'];

function CompactFieldsetArray({
    name,
    label,
    children,
    addRow,
    removeLastRow,
}) {
    const showRemove = children.length > 0,
        showAdd = children.length < 5;
        
    const onAdd = () => addRow({count: 1});
    
    return (
        <Fieldset label={label}>
            {children}
            <HorizontalView>
                {showAdd ? (
                    <Button icon="add" onClick={onAdd} color="primary">
                        Add Row
                    </Button>
                ) : (
                    <View />
                )}
                {showRemove ? (
                    <Button icon="delete" onClick={removeLastRow} color="secondary">
                        Remove Row
                    </Button>
                ) : (
                    <View />
                )}
            </HorizontalView>
        </Fieldset>
    );
}

CompactFieldsetArray.Fieldset = function CompactFieldset({
    name,
    label,
    children,
}) {
    return <HorizontalView>{children}</HorizontalView>;
};

const custom = {
    components: { CompactFieldsetArray },
    context(ctx, routeInfo) {
        if (routeInfo.name === 'survey_edit:new') {
            return {
                items: ctx.items.map(item => ({
                    ...item,
                    count: 1
                }))
            }
        }
    }
};

// app/js/data/config.js
const config = {
    "pages": {
        "survey": {
            "name": "survey",
            "url": "surveys",
            "list": true,
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "type": "text"
                },
                {
                    "name": "items",
                    "label": "Items",
                    "bind": {
                        "required": true
                    },
                    "type": "repeat",
                    "children": [
                        {
                            "name": "name",
                            "label": "Item Name",
                            "bind": {
                                "required": true
                            },
                            "type": "text"
                        },
                        {
                            "name": "count",
                            "label": "Item Count",
                            "bind": {
                                "required": true
                            },
                            "type": "int"
                        }
                    ],
                    "initial": 3,
                    "control": {
                        "appearance": "compact-fieldset-array"
                    }
                }
            ],
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        }
    }
};

// app/js/myproject.js
import wq from './wq.js';
wq.use(custom);
wq.init(config).then(...);

// navigate to /surveys/new
```

## Optional: Implement Entity-Attribute-Value Support

The examples so far have assumed that the nested rows are interchangeable until the user enters data.  However, it is also possible to define a unique "type" attribute for each row, turning the form into an [Entity-Attribute-Value (EAV) structure][eav].  In this case, the `Entity` model is the `Survey`, the Value model is the `Item`, and the Attribute model is a new `ItemType` table.  The Value table contains a foreign key to the Entity and also to the Attribute table.

#### db/survey/models.py (with type)

```python
from django.db import models

class Survey(models.Model):
    name = models.TextField(
        verbose_name="Name",
    )
    class Meta:
        verbose_name = "survey"
        verbose_name_plural = "surveys"

class ItemType(models.Model):
    name = models.TextField(
        verbose_name="Name",
    )
    class Meta:
        verbose_name = "item type"
        verbose_name_plural = "item types"

class Item(models.Model):
    survey = models.ForeignKey(
        Survey,
        related_name="items",
    )
    type = models.ForeignKey(
        ItemType,
        on_delete=models.CASCADE,
        verbose_name="Item Type",
    )
    count = models.IntegerField(
        verbose_name="Item Count",
    )
    class Meta:
        verbose_name = "item"
        verbose_name_plural = "items"
```

It is technically possible to implement EAV using `AttachmentSerializer` and custom JavaScript as in the previous steps.  However, [`wq.db.patterns`][patterns] also provides a `TypedAttachmentSerializer` for this specific use case.

#### db/survey/serializers.py (with type)

```python
from wq.db.patterns import serializers as patterns
from .models import Survey, Item

class ItemSerializer(patterns.TypedAttachmentSerializer):
    class Meta(patterns.TypedAttachmentSerializer.Meta):
        model = Item
        exclude = ('survey',)
        object_field = 'survey'
        type_field = 'type_id'
        type_filter = {}
        wq_config = {
            'control': {'appearance': 'eav-fieldset-array'}
        }
        wq_field_config = {
            'type': {
                'control': {'appearance': 'type-label'}
            }
        }

class SurveySerializer(patterns.AttachedModelSerializer):
    items = ItemSerializer(many=True)

    class Meta:
        model = Survey
        fields = "__all__"
```

Note the two EAV-specific serializer options: `type_field`, which indicates the name of the foreign key pointing from the Value table to the Attribute table, and `type_filter`, which is optional.  `type_field` is used on the server when processing incoming records.  `type_filter` is copied to the configuration and then parsed at runtime to filter the list of defined attributes based on the current URL parameters (see the [configuration syntax][config]).

> `type_filter` makes it possible to define "campaign builder" type apps where the set of parameters that show up on the observation form is dependent on which campaign you select initially.  See [Try WQ]'s [ResultSerializer] for an example.  By default, all attribute definitions will be made available when creating a new Entity record.

Note that the Attribute model (i.e. `ItemType`) *must* be registered as `cache="all"` with wq.db, to ensure that the list of types is preloaded on the client.  (The Value model does not need to be registered as it is already nested in the Entity registration.)  Since the Attribute model is registered as a regular editable model, administrative users can use wq's default UI to create new attribute definitions on the fly.

#### db/survey/rest.py (with type)

```python
# myapp/rest.py
from wq.db import rest
from .models import Survey, ItemType
from .serializers import SurveySerializer

# Entity+Value
rest.router.register_model(
    Survey,
    serializer=SurveySerializer,
)

# Attribute
rest.router.register_model(
    ItemType,
    cache="all",
    fields="__all__",
)
```

Finally, note that you will probably want to make the type field read-only and disable the ability to add new rows.  You can do this through the appearance attribute as shown above and below.

### Demo 4

```js
// app/js/custom.js
import { modules } from './wq.js';
const React = modules['react'],
  { useField } = modules['formik'],
  { useModel } = modules['@wq/react'],
  { Fieldset, HorizontalView, View, Button, Typography } = modules['@wq/material'];

function EavFieldsetArray({label, children}) {
    return (
        <Fieldset label={label}>
            {children}
        </Fieldset>
    );
}

EavFieldsetArray.Fieldset = function EavFieldset({children}) {
    return <HorizontalView>{children}</HorizontalView>;
};

function TypeLabel({name}) {
    const [, { value }] = useField(name),
        type = useModel('itemtype', value || -1);
    return <Typography style={{width: '8em', marginTop: '1em'}}>
        {type ? type.label : 'Unknown'}
    </Typography>
}

const custom = {
    components: { EavFieldsetArray },
    inputs: { TypeLabel },
    start() {
        this.app.models.itemtype.update([
            {"id": 1, "name": "Cars", "label": "Cars"},
            {"id": 2, "name": "Trucks", "label": "Trucks"},
            {"id": 3, "name": "Buses", "label": "Buses"},
        ]);
    },
};

// app/js/data/config.js
const config = {
    "pages": {
        "survey": {
            "name": "survey",
            "url": "surveys",
            "list": true,
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "type": "text"
                },
                {
                    "name": "items",
                    "label": "Items",
                    "bind": {
                        "required": true
                    },
                    "type": "repeat",
                    "children": [
                        {
                            "name": "type",
                            "label": "Item Type",
                            "bind": {
                                "required": true
                            },
                            "type": "select one",
                            "wq:ForeignKey": "itemtype",
                            "control": {
                                "appearance": "type-label"
                            }
                        },
                        {
                            "name": "count",
                            "label": "Item Count",
                            "bind": {
                                "required": true
                            },
                            "type": "int"
                        }
                    ],
                    "initial": {
                        "type_field": "type",
                        "filter": {}
                    },
                    "control": {
                        "appearance": "eav-fieldset-array"
                    }
                }
            ],
            "verbose_name": "survey",
            "verbose_name_plural": "surveys"
        },
        "itemtype": {
            "name": "itemtype",
            "url": "itemtypes",
            "list": true,
            "cache": "all",
            "form": [
                {
                    "name": "name",
                    "label": "Name",
                    "bind": {
                        "required": true
                    },
                    "type": "text"
                }
            ],
            "verbose_name": "item type",
            "verbose_name_plural": "item types"
        }
    }
};

// app/js/myproject.js
import wq from './wq.js';
wq.use(custom);
wq.init(config).then(...);

// navigate to /surveys/new
```
[wq framework]: ../index.md
[repeat group]: http://xlsform.org/#repeats
[InlineModelAdmin]: https://docs.djangoproject.com/en/3.1/ref/contrib/admin/#inlinemodeladmin-objects
[ForeignKey]: ../inputs/ForeignKey.md
[eav]: ./eav-vs-relational.md
[fieldsets]: ./organize-inputs-into-fieldsets.md
[@wq/outbox]: ../@wq/outbox.md
[inputs]: ../inputs/index.md
[survey.csv]: ./implement-repeating-nested-forms/survey.csv
[patterns]: ../wq.db/patterns.md
[wq.app-1.2.0]: ../releases/wq.app-1.2.0.md
[@wq/model]: ../@wq/model.md
[FieldsetArray]: ../components/FieldsetArray.md
[Fieldset]: ../components/Fieldset.md
[setup]: ../overview/setup.md
[babel-repl]: https://babeljs.io/repl
[@wq/rollup-plugin]: ../@wq/rollup-plugin.md
[context]: ../plugins/context.md
[Try WQ]: https://github.com/powered-by-wq/try.wq.io
[config]: ../wq-configuration-object.md
[ResultSerializer]: https://github.com/powered-by-wq/try.wq.io/blob/master/db/campaigns/serializers.py
