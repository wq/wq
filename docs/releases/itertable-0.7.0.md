---
repo: itertable
date: 2014-11-17
---

# wq.io 0.7.0

**wq.io 0.7.0** brings a few API improvements and minor new features.

### New Classes
- **[ZipFileLoader](http://wq.io/docs/loaders)** & **[ZipNetLoader](http://wq.io/docs/loaders)**: Automatically extract data from a file stored in a compressed archive.

### API improvements
- **[GIS submodule](http://wq.io/docs/gis-io)**: Support for `as_dataframe()` (returns a `GeoDataFrame` with some help from [GeoPandas](http://geopandas.org/)).
- **[XmlParser](http://wq.io/docs/parsers)**: Search for `root_tag` (if specified) when parsing XML documents
- New `scan_fields` option to ensure fields are properly detected for datasets with different fields in each row
