import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import analyze from 'rollup-plugin-analyzer';
import license from 'rollup-plugin-license';

const banner = `/*!
 * ${pkg.name} ${pkg.version}
 * ${pkg.description}
 * (c) 2012-2021, S. Andrew Sheppard
 * https://wq.io/license
 */`;

export default [
    {
        input: 'index.js',
        plugins: [
            babel({
                presets: ['@babel/preset-typescript'],
                plugins: [
                    ['@babel/plugin-transform-react-jsx', { useSpread: true }],
                ],
                extensions: ['.js', '.ts', '.tsx'],
                babelHelpers: 'bundled',
            }),
            terser({ keep_fnames: /^([A-Z]|use[A-Z])/ }), // Preserve component & hook names
            resolve({
                preferBuiltins: false,
                extensions: ['.js', '.ts', '.tsx'],
                dedupe: (path) => path[0] !== '.',
            }),
            analyze({ limit: 10 }),
            license({ thirdParty: { output: 'licenses.txt' } }),
            replace({
                'process.env.NODE_ENV': '"production"',
                "require('fs')": 'NOT_SUPPORTED',
                "require('path')": 'NOT_SUPPORTED',
                'require.main': "'NOT_SUPPORTED'",
                "import * as MapboxGl from 'mapbox-gl'":
                    "import MapboxGl from 'mapbox-gl'",
                "const isEqual = require('deep-equal')":
                    "import isEqual from 'deep-equal'",
                "require('mapbox-gl/dist/mapbox-gl.css')": '',
                "from 'react-mapbox-gl'": "from 'react-mapbox-gl/src/index'",
                'require("react-mapbox-gl")':
                    "require('react-mapbox-gl/src/index')",
                delimiters: ['', ''],
            }),
            commonjs(),
            json(),
        ],
        output: {
            file: 'wq.js',
            banner,
            format: 'esm',
            sourcemap: true,
        },
    },
];
