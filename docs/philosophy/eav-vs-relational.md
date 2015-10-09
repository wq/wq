---
order: 4
description: This article exists to describe one key decision you will need to make - whether to use a traditional relational model, or to use an Entity-Attribute-Value (EAV) model (also commonly referred to as an open schema).
---

To EAV, or not to EAV? Choosing your data model
===============================================

Once you've determined to use a [web-based approach](https://wq.io/docs/web-app) for your offline-capable citizen science app, and have [installed wq], you are now ready for the most important step when building an app for citizen science: **defining your data model**.  This step is so important, in fact, that [wq does not do it for you][about].  Your project needs and topic domain will determine what data model is best for your application.  wq does provide a number of common [design patterns] we've found useful, but these are not required, and in some cases should be avoided.

This article exists to describe one key decision you will need to make - whether to use a traditional [relational model], or to use an [Entity-Attribute-Value] (EAV) model (also commonly referred to as an open schema).  The key difference in the two approaches is the level of flexibility your model has in adapting to changing project requirements, especially when new attribute definitions are needed.  At a high level, attributes are added as *columns* to a relational schema, but as *rows* in an EAV schema.  This means that an EAV schema can be administered via a web-based interface, while a relational schema typically needs to be modified by a database administrator.

Perhaps unsurprisingly, wq supports both approaches out of the box, though the framework has traditionally had better support for the EAV-style approach (which is important for [water quality monitoring]).  One particular strength of an EAV approach is the ability to create "form-builder" or "campaign" driven applications.  Essentially, you can design applications that allow project participants to define their own data collection requirements via an intuitive web-based interface.  [wq is not a form-builder][about], but that shouldn't prevent you from using it to make one!

> Note: In [wq.db] (and many other platforms), EAV-style schemas are supported under the hood via the use of relational tables that define a meta-schema.  In addition, these approaches are often mixed within the same project.  So, using an EAV model doesn't exactly mean forgoing a relational schema.  The main goal of this article is to help your determine a high-level strategy for the structure of your data - and especially the time series observations submitted by your project participants.

In this article, we discuss the key features of the relational and EAV models and conclude with a checklist that will hopefully help you decide which is right for you.

## Relational Model
In a relational model, there is typically a one-to-one correspondence between the `<input>` elements in your [HTML form] and the *columns* on the database table you want to populate.  This is much more straightforward than an EAV approach, and (among other things) makes the code and templates easier to read.  Each table can be defined as a [Django model] with specific constraints and requirements that are enforced by Django as well as at the database level.  Relationships between tables can be defined via [ForeignKey] fields, which can be presented as HTML `<select>` menus using the built-in template rendering features of wq.

In wq, the relational approach requires defining one or more [Django model] classes which can then be used to generate [migration scripts] that create the actual database tables.  Once these models are created, they can be registered with the [wq.db REST API] which will make it possible to list, retrieve, create, and update the records in the database through the [HTML screens][Mustache templates] in the application.  Whenever you add or change a model field, Django can generate a new migration script to make the appropriate modifications to the database.  You will also need to update your Mustache templates to reflect the new field definitions.  These steps are not automatic, but can easily be mastered with a little training.

## Entity-Attribute-Value Model

![EAV](https://wq.io/media/images/eav.png)

In an EAV model, the HTML `<form>` fields represent a one-to-many relationship between a primary `Entity` table and a `Value` table.  Each row in the `Value` table corresponds to a "field", which is defined as a row in a third `Attribute` table.  In effect, the `Value` table creates a many-to-many link between the `Entity` table and the `Attribute` table.  (I told you this would be more complicated).  Django does not provide much support for EAV out of the box, though there are a number of plugins that do so.  [wq.db.patterns][design patterns] and [vera] provide some of those plugins.  Note that the fact that all of wq.db's provided models are EAV-based does not necessarily mean that you should use an EAV approach.  Instead, the focus on EAV in wq.db is largely designed as a complement to Django's strong built-in support for traditional relational models.

In wq, the EAV approach typically means defining your [Django model] classes as subclasses of the base `Entity` type you want to use.   For example, to define a model that uses the EAV-style [annotate] structure, you would create it as a subclass of `AnnotatedModel`.  Any relational fields can then be defined on your model as usual.  Our general rule of thumb is that if a field is critical to the interpretation of a record, is a foreign key, or is going to referenced by name anywhere in the code, it should be defined as a traditional relational field.  All other fields can be defined as rows in the `Attribute` table, and new attributes can be added on the fly via a web interface if needed.  When registering an EAV-style model with the [wq.db REST API], you will typically want to use a special [serializer] class (e.g. `AnnotatedModelSerializer` in this case).

The key weakness of the EAV approach is not performance - this can be optimized with appropriate database indices.   Instead, the key weakness of EAV is the level of abstraction that obfuscates the application code.  For example, the `<form>` in your [edit template][Mustache templates] will need to contain a "loop" over an indeterminate number of `Attribute` definitions.  If you want to support different field types (e.g. number, text) in a relational model, you can do so by changing the HTML `<input type>` for just that field.  With an EAV model, you will instead need to create branching logic that can adapt to each field type on the fly (e.g. in [this example]).  There will not be a single reference to a specific `Attribute` name anywhere in your code - which makes reasoning about changes more difficult.  That said, if you are comfortable with this abstraction, it can be a very powerful tool for building adaptable applications that don't need any further developer intervention when project definitions change.

## Summary and Examples

Which approach is right for you?  Both are useful, but each have strengths and weaknesses that should be taken into account.

You might want to use a **relational model** if you:

 * have a single, focused project with a targeted participant community
 * have a clearly defined schema that is unlikely to change often
 * are comfortable editing Django model definitions and [Mustache templates] by hand, and redeploying the application, if/when the schema does change
 * have specific validation rules that only apply to certain fields, e.g. "domain" or lookup tables (i.e. ForeignKeys)
 * want precise control over the layout of your forms
 * are adding a wq-powered app to an existing project (i.e. the schema has already been defined)
 * are still unsure about the practical difference between Relational and EAV models.  The relational approach is much easier to get working and is a safe choice overall.

The [Species Tracker] demo is an example of an app that uses a primarily relational model for the time series table (see the [Species Tracker model definitions]).

You might want to use an **EAV model** if you:

 * want to support multiple projects and a broad community with a single "form-builder" or "campaign" application
 * have a loose schema that is likely to change over time
 * want to deploy once (or as infrequently as possible), and want to avoid needing to modify the database schema and templates every time the project definition changes
 * have relatively loose data validation requirements, or are willing enforce them after the fact e.g. through data filters
 * don't need precise control over the layout of your forms, or are willing to implement lots of branching logic in your templates
 * are starting a new project and have full control over the schema
 * already know that this the direction you want to go

If you know you want an EAV structure and are working with time series data, you may be interested in [vera], which is an implementation of [ERAV], an extension to EAV with enhanced support for provenance tracking and bulk data import (i.e. from Excel).

The [Try WQ] demo is an example of an app that uses a primarily EAV model for the time series table (see the [Try WQ model definitions] as well as the [vera model definitions]).  This is what makes it possible for participants to define [custom campaigns] on the fly.

[web-based approach]: https://wq.io/docs/web-app
[installed wq]: https://wq.io/docs/setup
[about]: https://wq.io/docs/intro
[design patterns]: https://wq.io/docs/about-patterns
[relational model]: https://en.wikipedia.org/wiki/Relational_model
[Entity-Attribute-Value]: https://en.wikipedia.org/wiki/Entity-attribute-value_model
[wq.db]: https://wq.io/wq.db
[water quality monitoring]: https://wq.io/research/provenance
[HTML form]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms
[Django model]: https://docs.djangoproject.com/en/1.8/topics/db/models/
[ForeignKey]: https://docs.djangoproject.com/en/1.8/ref/models/fields/#django.db.models.ForeignKey
[migration scripts]: https://docs.djangoproject.com/en/1.8/ref/django-admin/#django-admin-migrate
[wq.db REST API]: https://wq.io/docs/about-rest
[Mustache templates]: https://wq.io/docs/templates
[Species Tracker]: https://github.com/powered-by-wq/species.wq.io
[Species Tracker model definitions]: https://github.com/powered-by-wq/species.wq.io/blob/master/db/reports/models.py
[annotate]: https://wq.io/docs/annotate
[serializer]: https://wq.io/docs/serializers
[vera]: https://wq.io/vera
[ERAV]: https://wq.io/docs/erav
[this example]: https://github.com/powered-by-wq/try.wq.io/blob/master/templates/partials/result_inline.html
[Try WQ]: https://github.com/powered-by-wq/try.wq.io
[Try WQ model definitions]: https://github.com/powered-by-wq/try.wq.io/blob/master/db/campaigns/models.py
[vera model definitions]: https://github.com/wq/vera/blob/master/vera/models.py
[custom campaigns]: https://try.wq.io/campaigns/new
