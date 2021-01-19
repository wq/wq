---
permalink: /inputs/
wq_config:
  name: input
  url: inputs
  order: 20
  section: API Reference
  autoindex: false
  icon_data: M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20Z
---

# Input Components

The following components are used when rendering form inputs corresponding to [model field definitions][data-model]. 
These components implement a common subset of the [XLSForm question types] and [Django field types].  You can override the default component for any field by [defining a custom custom input type][custom-input], or [define a repeating group of inputs][nested-forms].

Name | HTML Equivalent | Django Type | XLSForm Type
--|--|--|--
[Input] | `<input type={text,number,...}>` | `CharField`, `IntegerField`, `FloatField` | string, int, decimal
[Date] | `<input type=date>` | `DateField` | date
[Time] | `<input type=time>` | `TimeField` | time
[DateTime] | `<input type=datetime-local>` | `DateTimeField` | dateTime
[Hidden] | `<input type=hidden>` | n/a |  hidden
**Choice Inputs** | | | |
[Checkbox] | `<input type=checkbox>` | `BooleanField` | n/a
[Toggle] | n/a | `CharField(choices<5)` | select one
[Radio] | `<input type=radio>` | `CharField(choices<10) ` | select one
[Select] | `<select>` | `CharField(choices>=10)` | select one / select
[ForeignKey] | `<select>` | `ForeignKey` | constraint=wq:ForeignKey
**Binary Attachments** | | | |
[File] | `<input type=file>` | `FileField` | file, video, audio
[Image] | `<input type=file accept="image/*">` | `ImageField` | image
**Geospatial Inputs** | | | |
[Geopoint] | n/a | `PointField` | geopoint
[Geotrace] | n/a | `LineStringField` | geotrace
[Geoshape] | n/a | `PolygonField` | geoshape

[Input]: ./Input.md
[Date]: ./DateTime.md
[Time]: ./DateTime.md
[DateTime]: ./DateTime.md
[Hidden]: ./Hidden.md

[File]: ./File.md
[Image]: ./Image.md

[Checkbox]: ./Checkbox.md
[Toggle]: ./Toggle.md
[Radio]: ./Radio.md
[Select]: ./Select.md
[ForeignKey]: ./ForeignKey.md

[Geopoint]: ./Geo.md
[Geotrace]: ./Geo.md
[Geoshape]: ./Geo.md
