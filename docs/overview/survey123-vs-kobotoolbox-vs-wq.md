# Survey123 vs. KoBoToolbox vs. wq

The [wq framework] leverages the [XLSForm standard][xlsform] for survey definitions.  This makes it similar to ESRI's [Survey123] and [KoBoToolbox]'s KoboCollect, though with some key differences.  Which solution is right for you will depend on your project goals, budget, and technical expertise.

 * [Feature Comparison: Platform](#platform)
 * [Feature Comparison: Survey Definition](#survey-definition)
 * [Feature Comparison: Data Management](#data-management)
 * [Summary](#summary)

## Feature Comparison

### Platform
&nbsp; | **Survey123** | **KoBoToolbox** | **wq Framework**
--|--|--|--
*Hosting* | Central or Self-hosted (with license) | **Central (free) or Self-hosted** | Self-hosted*
*License* | Per-User | **Open Source** | **Open Source**
*Backend Environment* | ArcGIS Server | **Django (Python)** | **Django (Python)**
*Frontend Environment* | ArcGIS AppStudio | Android Studio (Java) | **React / React Native / Expo (JavaScript)**
*Device Support* | **Android / iOS / Web** | Android, Web (via Enketo) | **Web / Android / iOS**

* * *[Contact the developer] for questions about managed hosting support.*

### Survey Definition
&nbsp; | **Survey123** | **KoBoToolbox** | **wq Framework**
--|--|--|--
*Database Schema* | **Per survey** | Combined generic table | **Per survey**
*Foreign Keys* | Within survey (nested) | No | **Within and between surveys**
*Offline Usage* | **Surveys + basemaps** | Surveys only | Surveys only¹
*XLSForm Formulas* | **Yes** | **Yes** | No²

* ¹ *A custom ServiceWorker can be used to implement offline map support in wq.*
* ² *Similar functionality can be implemented in wq via [custom input components][custom-input].*

### Data Management
&nbsp; | **Survey123** | **KoBoToolbox** | **wq Framework**
--|--|--|--
*Interactive Analysis Tools* | **Yes** | **Yes** | No³
*Interactive Map Viewers* | **Yes** | **Yes** | **Yes**
*Export to Excel* | **Yes** | **Yes** | **Yes** (via [plugin][django-rest-pandas])
*Import from Excel* | **Yes** (via feature layer) | No | **Yes** (via [plugin][django-data-wizard])

* ³ *The [Django REST Pandas][django-rest-pandas] backend can be used to implement a custom frontend dashboard.*

## Summary

**Survey123** may make the most sense if your users already have an ArcGIS license and/or want to easily generate custom map viewers.  **KoBoToolbox** might be the best option if you have many small surveys and/or your data collection goals are still being refined.  The **wq framework** may be your best choice if you have a relatively stable data model, high customization requirements, and/or need to integrate with an existing database.

Fortunately, all three use the same XLSForm standard, so once you have a survey definition you can easily use it to switch between platforms.

[Contact the developer]: ../support.md
[wq framework]: ../index.md
[xlsform]: https://xlsform.org/
[Survey123]: https://survey123.arcgis.com/
[KoBoToolbox]: https://www.kobotoolbox.org/
[django-rest-pandas]: https://github.com/wq/django-rest-pandas
[django-data-wizard]: https://github.com/wq/django-data-wizard
[custom-input]: ../guides/define-a-custom-input-type.md
