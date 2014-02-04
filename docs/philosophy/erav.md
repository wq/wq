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
