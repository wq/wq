import 'https://static.codepen.io/assets/embed/ei.js';
import { modules } from 'https://unpkg.com/wq';
import { renderers } from 'https://unpkg.com/@wq/markdown@next';

const React = modules.react;
const Code = renderers.code;

const COMMENT = `// wq.init(config).then(...);



/*
Note: when using wq locally, replace 'https://unpkg.com/wq' with:

 - './wq.js' for wq.app without npm, or
 - '@wq/app' for @wq/cra-template or @wq/rollup-plugin

The following code is only needed to initialize the demo environment.
*/
`;

const INIT = `
wq.use({
    components: { Header() {return null}},
    ajax(url, data, method) {
        if (method === "GET") {
            return [];
        } else {
            throw new Error("Sync not supported in demo")
        }
    }
});
wq.init({
    ...config,
    router: {base_url: window.location.pathname}
}).then(() => wq.nav(startPage));
`;

function wrapCode(code) {
    const match = code.match(/\/\/ navigate to (.*)/),
        startPage = match ? match[1] : '',
        config = code.indexOf('config =') === -1 ? 'const config = {};\n' : '',
        init = `${COMMENT}\const startPage = '${startPage}';\n${config}${INIT}`;

    return code
        .replace(
            "import wq from './wq.js';",
            "import wq from 'https://unpkg.com/wq'; // See note below"
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
        return React.createElement(CodePen, { code: value });
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
            'data-prefill': true,
            'data-default-tab': 'js,result',
            'data-height': 360,
        },
        React.createElement('pre', { 'data-lang': 'babel' }, wrapCode(code))
    );
}
