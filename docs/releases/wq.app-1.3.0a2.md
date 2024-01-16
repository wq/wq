---
repo: wq.app
date: 2020-10-23
---

# wq.app 1.3 alpha 2

**wq.app 1.3 alpha 2** brings a number of bug fixes & improvements to the [@wq/react](../@wq/react.md) + [@wq/material](../@wq/material.md) renderer introduced in [wq.app 1.3 alpha](./wq.app-1.3.0a1.md).

 * Ensure `can_add`, `can_change` & `can_delete` flags are correctly applied from auth state ([#124](https://github.com/wq/wq.app/issues/124))
 * Fix handling of field-level errors when opening outbox entry ([#125](https://github.com/wq/wq.app/issues/125))
 * Improve handling of Map & Camera refs when running [@wq/mapbox](../@wq/map-gl.md) in react-native
 * Improve handling of non-root-URL deployments in `wq serviceworker` and [`<Breadcrumbs/>`](../components/Breadcrumbs.md)
 * Move [`<PropertyTable/>`](../components/PropertyTable.md) out of [`<DefaultDetail/>`](../views/DefaultDetail.md) to a standalone component
