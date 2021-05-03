---
repo: wq.db
date: 2021-05-03
---

# wq.db 1.3 beta

**wq.db 1.3 beta** is a beta of the next version of wq.db, as part of the [wq 1.3 beta](./wq-1.3.0b1.md) release.     This release includes additional changes to improve support for [@wq/material](../@wq/material.md) and [@wq/map-gl](../@wq/map-gl.md), as well as the pre-built [**wq.js**](../wq/index.md) provided by [wq.app](../wq.app/index.md).

### Field Improvements
 * Support `ManyToMany` foreign keys (fa8fa59)
 * Support clearable [`File`](../inputs/File.md) and [`Image`](../inputs/File.md) input types (#23)
 * Preserve label/verbose_name when rendering `BooleanField` as [`Toggle`](../inputs/Toggle.md#boolean-choice-field) (9c549e0)
 * Support the xlsform "group" type via:
     * Nested serializers with `many=False`, e.g. for `OneToOne` relationships (1677135).
     * "Virtual" fieldsets that use the new [`wq_fieldsets` option](../guides/organize-inputs-into-fieldsets.md) to nest JSON and UI fields for a single serializer (1598f59).
     * A single anonymous root fieldset for UI only (6ae7574)
 * Improve the existing support for the [xlsform "repeat" type](../guides/implement-repeating-nested-forms.md):
    * Ignore `@index` attributes when determining empty status (af1b7fa)
 * Improve support for customizing the [wq field configuration](../config/index.md):
    * New [`wq_field_config`](../guides/define-a-custom-input-type.md) and [`style={"wq_config": {}}`](../guides/define-a-custom-input-type.md) options (1677135) 
    * Option to explicitly list read-only fields in the configuration (0333bff)

### Other Improvements

 * Regenerate data/config.js whenever `./manage.py runserver` reloads (wq/wq.app#120)
 * Improve GeoJSON content negotiation to support [@wq/map-gl](../@wq/map-gl.md) (0f35c54).
 * Automatically configure `base_url` for [@wq/router](../@wq/router.md) and [@wq/store](../@wq/store.md) (adb07be)
 * Include `[model].Meta.ordering` in config so it is picked up by [@wq/model](../@wq/model.md) (9c549e0)
 * Move to Github Actions (3eae919, b473091)
