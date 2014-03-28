The ERAV Data Model
===================

The Entity-Record-Attribute-Value (ERAV) data model is an extension to Entity-Attribute-Value (EAV) that adds support for maintaining multiple versions of a model with different provenance.  As the name implies, ERAV is made up of four distinct components (i.e. ORM models/database tables).

 Name | Description
------|-------------
Entity | The object being described
Record | The actual description of the object, from the perspective of one person or process
Attribute | The definition of each potential data point (name, data type, etc.)
Value | The actual data points for each record, corresponding to the available attribute definitions. (This would usually be implemented as a many-to-many relationship linking Record and Attribute)

For many operational uses, the attribute values for each entities' records can be "merged" into a single set, providing the appearance of a regular EAV.  However, the actual data is kept distinct, providing enhanced flexibility for tracking provenance of data collected from multiple sources.

## Example Use Case
Suppose you are maintaining a dataset of time series data, and that the list of attributes for each event in the series might change over time.  The EAV model will be useful to provide the flexibilty to adapt to changing attribute definitions.  However, suppose the actual data is being uploaded through a number of different mechanisms.  Some data is submitted through a smartphone application; others may be uploaded in bulk from Excel spreadsheets (both before and after offline review).  In addition, some data is exchanged with third party databases.

Without ERAV, tracking changes to individual entities (events) will be quite difficult.  A wiki or similar versioning scheme would help, but only to the extent that changes to data happened within the system.  In this example (and in many real-world use cases), the changes may happen in Excel, or in third party systems with different goals or revision tracking requirements.

The ERAV model solves this versioning challenge by making it possible to import data for the same entity more than once.  Each subsequent import is treated as a separate record, but linked back to the entity so that the data can be merged for operational use.  (ERAV can be interpreted in this case to mean Event-Report-Attribute-Value - which is the definition used in the [paper introducing the model](http://wq.io/research/provenance).)

![ERAV](http://wq.io/media/images/erav.png)

## Important Concepts

### Natural Key

A critical component to ERAV is the concept of a *natural key* for the Entity/Event model.  A natural key in this context is a set of fields that both occur naturally in the data, and uniquely identify a record.  An important feature of a natural key is that it does not need to be assigned a priori by a central mechanism.  (By contrast, a typical primary key is assigned centrally, at the time the record is registered with the database.)  Without a usable natural key, there is no easy way to determine which entity is being described in subsequent reports.  For many periodic monitoring projects, a natural key might just be a location and date.  If two or more reports are entered or uploaded containing the same location and date, they will be interpreted as describing the same event.

### "Merging" Reports for Analysis
ERAV is particularly useful for combining values from two records with different attributes.  For example, a smartphone may be used to upload initial data and a photo for an event, while a spreadsheet could provide supplemental information.  The "merging" feature of ERAV makes it possible to present a single unified description of an Entity/Event, useful for analysis and most typical use cases.  Unlike other versioning models and EAV, this can be done without obfuscating the metadata associated with each individual report (who uploaded it, when, how, etc.).  When more robust inquiry is needed about the provenance of a particular data point, the reports can be used to determine this information.

### Handling Conflicts
However, it is certainly possible that two reports will contain an overlapping attribute set.  This is especially likely if data is exported, reviewed offline, and uploaded again.  In this case, the values may conflict.  In traditional versioning models, any conflicts would need to be resolved immediately, as there can usually be only one active version of an entity.  This is not always practical, especially when dealing with bulk uploads of data.  ERAV smooths over these conflicts, allowing them to be resolved at a later time.  Until the conflicts are resolved, the value from the most authoritative report is selected for each attribute when merging data for analysis.  "Authoritative" could often just be the most recent value, or indicated with a status ("Final" reports would take precedence over "Provisional" reports, etc.).

## Implementation Notes
The reference implementation of ERAV is [vera](http://wq.io/vera), a [wq.db](http://wq.io/wq.db) module that is particularly suited for the time series use case.
