import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import analyze from 'rollup-plugin-analyzer';

const banner = `/*!
 * ${pkg.name} ${pkg.version}
 * ${pkg.description}
 * (c) 2012-2020, S. Andrew Sheppard
 * https://wq.io/license
 */`;

export default [
    {
        input: 'index.js',
        plugins: [
            babel({
                presets: ['@babel/preset-typescript'],
                plugins: [
                    ['@babel/plugin-transform-react-jsx', { useSpread: true }]
                ],
                extensions: ['.js', '.ts', '.tsx'],
                babelHelpers: 'bundled'
            }),
            terser(),
            resolve({
                preferBuiltins: false,
                extensions: ['.js', '.ts', '.tsx'],
                dedupe: path => path[0] !== '.'
            }),
            analyze({ limit: 10 }),
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
                "'react-mapbox-gl'": "'react-mapbox-gl/src/index'",
                '"react-mapbox-gl"': "'react-mapbox-gl/src/index'",
                delimiters: ['', '']
            }),
            commonjs(),
            json()
        ],
        output: {
            file: 'wq.js',
            banner,
            sourcemap: true,
            format: 'esm'
        }
    }
];
