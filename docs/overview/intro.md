---
order: -10
icon: pin
---

Introduction
============

**[wq]** is a software framework designed to facilitate the development of robust, **offline-capable mobile / web apps**.  wq is particularly well-suited for mobile **geospatial data collection**, e.g. by professional environmental monitoring staff or by volunteers in e.g. citizen science and mobile crowdsourcing projects.  More broadly, wq is a **general platform** for a variety of mobile-first websites and CRUD applications.  In particular, wq streamlines and standardizes integration between [Django] and [React].

**wq makes it easy** to rapidly assemble a complete data collection and management platform, while ensuring enough **flexibility to adapt** to project-specific data models and workflows.  Given nothing more than an [XLSForm] definition, wq can automatically generate a backend API powered by [Django REST Framework], and an opinionated, **ready-to-use React application** powered by [Material UI], Redux ORM, localForage, and [Mapbox GL JS].  The application can then be **fully customized** via wq's extensive, easy to use [plugin system][plugins].

If you are new to wq, we recommend [installing a local copy][setup] with Python and adding an XLSForm definition, or playing around with the [online demo][demo].  Then, take a look at the growing collection of [how-to guides][guides] for tips on specific customization scenarios.

You may also be interested in learning how wq compares:
 
 * to other XLSForm-based tools, such as [Survey123 and KoBoToolbox][survey-apps].
 * to other Django tools, such as [the Admin application][admin].
 * to other React tools, such as the default [create-react-app template][create-react-app].
  
Finally, if you are upgrading from an older version of wq, you will want to view the extensive [release notes] to learn what has changed since the jQuery Mobile days (hint: a lot).

[wq]: ../index.md
[Django]: https://djangoproject.com
[React]: https://reactjs.org
[XLSForm]: https://xlsform.org
[Django REST Framework]: https://django-rest-framework.org
[Material UI]: https://material-ui.com
[Mapbox GL JS]: https://docs.mapbox.com/mapbox-gl-js/api/
[plugins]: ../plugins/index.md
[setup]: ./setup.md
[demo]: ../index.md
[guides]: ../guides/index.md
[survey-apps]: ./survey123-vs-kobotoolbox-vs-wq.md
[admin]: ./django-admin-vs-wq.md
[create-react-app]: ./create-react-app-vs-wq.md
[release notes]: ../releases/wq.app-1.3.0a1.md
