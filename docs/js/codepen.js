import { modules } from 'https://unpkg.com/wq';
import { renderers } from 'https://unpkg.com/@wq/markdown';

const React = modules.react;
const Code = renderers.code;

const COMMENT = `// wq.init(config).then(...);



/*
Note: when using wq locally, replace 'https://unpkg.com/wq' with:

 - './wq.js' for wq.app without npm, or
 - '@wq/app' for @wq/cra-template or @wq/rollup-plugin

When using @wq/app, third party imports should also be changed, e.g. from
    const React = modules['react'];
to
    import React from 'react';

The following code is only needed to initialize the demo environment.
*/
`;

const INIT = `
wq.use({
    components: startPage ? {
        Header() { return null },
        Footer() { return null },
    } : {},
    ajax(url, data, method) {
        if (method === "GET") {
            return Promise.resolve([]);
        } else {
            throw new Error("Sync not supported in demo")
        }
    }
});
wq.init({
    ...config,
    router: {base_url: window.location.pathname},
    map: mapConfig,
}).then(() => wq.nav(startPage));
`;

const MAP_CONF = `
const mapConfig = {
    bounds: [[-90, -90], [90, 90]],
    maps: {
        basemaps: [{
           "name": "MapTiler Topo",
           "type": "vector-tile",
           // NOTE: You must supply your own key
           "url": "https://api.maptiler.com/maps/topo/style.json?key=95ZPyiJrDMkmRUoEfSjt"
       }]
    }
};
`;

function wrapCode(code) {
    const match = code.match(/\/\/ navigate to (.*)/),
        startPage = match ? match[1].replace(/^\//, '') : '',
        config = code.indexOf('config =') === -1 ? 'const config = {};\n' : '',
        mapConfig =
            code.indexOf('map') === -1 ? 'const mapConfig = {};\n' : MAP_CONF,
        init = `${COMMENT}\const startPage = '${startPage}';\n${config}${mapConfig}${INIT}`;

    return code
        .replace(
            "import wq from './wq.js';",
            "import wq from 'https://unpkg.com/wq'; // See note below"
        )
        .replace(
            "import { modules } from './wq.js';",
            "import { modules } from 'https://unpkg.com/wq'; // See note below"
        )
        .replace('wq.init(config).then(...);', init);
}

export default function CodeDetect(props) {
    const { language, value } = props;
    if (
        (language === 'javascript' || language === 'js') &&
        value.indexOf("import wq from './wq.js';") !== -1 &&
        value.indexOf('wq.init(config).then(...);') !== -1
    ) {
        if (window.__CPEmbed) {
            return React.createElement(CodePen, { code: value });
        } else {
            return React.createElement(Code, {
                ...props,
                value: '// Warning: Failed to initialize CodePen!\n\n' + value,
            });
        }
    } else {
        return React.createElement(Code, props);
    }
}

function CodePen({ code }) {
    React.useEffect(() => {
        window.__CPEmbed();
    }, [code]);
    return React.createElement(
        'div',
        {
            className: 'codepen',
            'data-editable': true,
            'data-prefill': JSON.stringify({
                title: 'wq Framework demo',
                stylesheets: code.match(/map/)
                    ? [
                          'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css',
                          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.css',
                      ]
                    : [],
            }),
            'data-default-tab': 'js,result',
            'data-height': code.match(/map/) ? 480 : 360,
        },
        React.createElement('pre', { 'data-lang': 'babel' }, wrapCode(code))
    );
}
