---
wq_config:
  name: index
  url: ""
  show_in_index: false
---

# wq Framework

wq is a modular framework for bespoke **survey and geospatial data collection** apps, with built-in support for **offline installation and sync**.  wq automatically generates a fully functional **Django + React** application that can sync directly to your existing database - with nothing more than a few CLI commands and an **XLSForm** definition.  You can then directly modify the resulting code to integrate third party (or your own) Django apps and React components.

## Live Demo

```js
import wq from './wq.js';

const config = {
    pages: {
        site: {
            url: 'sites',
            verbose_name: 'monitoring site',
            verbose_name_plural: 'monitoring sites',
            map: true,
            list: true,
            form: [
                {
                    name: 'name',
                    type: 'string',
                    label: 'Site Name',
                    hint: 'e.g. City or water body',
                    bind: {
                        required: true,
                    }
                },
                {
                    name: 'geometry',
                    type: 'geopoint',
                    label: 'Location',
                    bind: {
                        required: true,
                    }
                },
            ],
        },
        observation: {
            url: 'observations',
            verbose_name: 'observation',
            verbose_name_plural: 'observations',
            list: true,
            form: [
                {
                    name: 'site',
                    type: 'select1',
                    label: 'Monitoring Site',
                    hint: 'If no choices appear, create a site first',
                    'wq:ForeignKey': 'site',
                    bind: { 
                        required: true,
                        constraint: 'wq:ForeignKey(site)'
                    },
                },
                {
                    name: 'date',
                    type: 'date',
                    label: 'Observation Date',
                },
                {
                    name: 'photo',
                    type: 'photo',
                    label: 'Photo',
                },
                {
                    name: 'comments',
                    type: 'text',
                    label: 'Observations & Comments',
                    multiline: true
                },
            ],
        },
    }
}

wq.init(config).then(...);
```

## News

> wq 1.3 alpha was released on September 29, 2020!
>
> [Install](./overview/setup.md) • [View Release Notes](./releases/wq-1.3.0a1.md)

## Documentation
