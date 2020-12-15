import wq, { modules } from 'https://unpkg.com/wq';
import markdown, { renderers } from 'https://unpkg.com/@wq/markdown@next';
import CodePen from './codepen.js';

renderers.code = CodePen;

wq.use(markdown);

const config = {
    markdown: { input: 'content' },
    pages: { index: { url: '' } },
};

const DIRS = ['overview'],
    ROOT_PAGES = [],
    IGNORE = {
        '/pages.json': true,
        '/assets/css/style.css': true,
    };

DIRS.forEach((dir) => {
    config.pages[dir] = {
        url: dir,
        list: true,
        cache: 'all',
        can_change: false,
        can_add: false,
    };
});

ROOT_PAGES.forEach((page) => {
    config.pages[page] = { url: page };
});

init();

async function init() {
    await wq.init(config);
    const response = await fetch('/pages.json'),
        pages = await response.json(),
        data = {};

    DIRS.forEach((dir) => (data[dir] = []));

    pages
        .filter((page) => !IGNORE[page.url] && page.url !== page.dir)
        .forEach((page) => {
            const dir = page.dir.replace(/\//g, ''),
                id = page.name.replace('.md', ''),
                label = page.title;

            page = {
                id,
                label,
                ...page,
            };

            if (dir) {
                if (data[dir]) {
                    data[dir].push(page);
                } else {
                    console.warn(`Directory "${dir}" is not configured`);
                }
            } else {
                if (config.pages[id]) {
                    config.pages[id] = {
                        ...config.pages[id],
                        verbose_name: label,
                        content: page.content,
                    };
                } else {
                    console.warn(`Page "${id}" is not configured`);
                }
            }
        });

    DIRS.forEach((dir) => wq.models[dir].overwrite(data[dir]));

    window.wq = wq;
}
