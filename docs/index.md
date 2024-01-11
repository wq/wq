---
title: wq Framework
wq_config:
  name: index
  url: ""
  show_in_index: false
---

![wq Framework logo](https://wq.io/images/wq.svg)

wq is a modular framework for bespoke **survey and geospatial data collection** apps, with built-in support for **offline installation and sync**.  With just a few CLI commands and an **XLSForm** definition, wq can automatically generate a fully functional **Django + React** application that syncs directly to your existing database.  You can then directly modify the resulting code to integrate third party (or your own) Django apps and React components.  [Learn More...](./overview/intro.md)

[**Getting Started**](./overview/setup.md)
&bull;
[**wq on GitHub**](https://github.com/wq/wq)

## Live Demo

```js
import wq from './wq.js';

const config = {
    site_title: "Demo App",
    material: {
        theme: {
            primary: '#0088bd',
            secondary: '#7500ae',
        }
    },
    pages: {
        about: { url: "about" },
        site: {
            url: 'sites',
            verbose_name: 'monitoring site',
            verbose_name_plural: 'monitoring sites',
            label_template: '{{name}}',
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
            label_template: '{{date}}',
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

import { modules } from './wq.js';
const React = modules['react'];
const {
    ScrollView,
    HorizontalView,
    Typography,
    ButtonLink
} = modules['@wq/material'];
const { useReverse } = modules['@wq/react'];

function About() {
    const reverse = useReverse();
    return <ScrollView>
        <Typography variant="h6">About</Typography>
        <Typography variant="body1">
            Personalize your app with custom views, like this one!
        </Typography>
        <HorizontalView>
            <ButtonLink to={reverse("index")}>
                Back to Home
            </ButtonLink>
            <ButtonLink to={reverse("site_edit:new")}
                        icon="gps-start" variant="contained" color="secondary">
                Add Site
            </ButtonLink>
            <ButtonLink to={reverse("observation_edit:new")}
                        icon="add" variant="contained" color="primary">
                Add Observation
            </ButtonLink>
         </HorizontalView>
    </ScrollView>;
}

wq.use({views: { About }});

wq.init(config).then(...);
```

## News

> wq 1.3 was released on April 5, 2022!
>
> [Install](./overview/setup.md) • [View Release Notes](./releases/wq-1.3.0.md)

## Documentation

> Note: The legacy jQuery Mobile-based documentation has moved to [v1.wq.io](https://v1.wq.io).
