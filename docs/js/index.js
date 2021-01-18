---
layout: null
---

import wq, { modules } from 'https://unpkg.com/wq';
import markdown, { renderers } from 'https://unpkg.com/@wq/markdown@next';
import CodePen from './codepen.js';

renderers.code = CodePen;

wq.use(markdown);

const config = {
    site_title: 'wq Framework',
    store: {
        "service": "",
        "defaults": {
            "format": "json"
        }
    },
    pages: {
        {% for page in site.pages %}{% if page.wq_config %}
        {{ page.wq_config.name }}: pageConf({{ page || jsonify }}),{% endif %}{% endfor %}
    }
};

function pageConf(page) {
    if (page.dir === '/') {
        return {
            verbose_name: page.title,
            markdown: page.content,
            ...page.wq_config
        }
    } else {
        return {
            verbose_name_plural: page.title,
            markdown: page.content,
            list: true,
            cache: 'all',
            can_change: false,
            can_add: false,
            ordering: ['order', 'title'],
            ...page.wq_config
        }
    };
}

wq.use({
    async ajax(url, method) {
        if (method === 'POST') {
            return;
        }
        url = url.replace(".json", "/$index.json");
        const response = await fetch(url),
            data = await response.json();
        if (Array.isArray(data)) {
            return data.map(processPage);
        }
        return data;
    }
});


function processPage(page) {
    page.id = page.name.replace('.md', '');
    page.label = page.title = page.title.replace('&amp;', '&');
    page.icon = page.icon || null;
    page.order = page.order || 0;
    page.markdown = page.content;
    delete page.content;

    if (page.module) {
        page.tags = [{
            label: page.module,
            color: page.module.startsWith('@wq/') ? 'primary' : 'secondary'
        }];
    } else if (page.tag) {
        page.tags = [{
            label: page.tag,
            color: page.tag_color || 'primary'
        }];
    } else {
        page.tags = null;
    }
    return page;
}

wq.init(config).then(wq.prefetchAll);
