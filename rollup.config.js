import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
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
            terser(),
            resolve({
                preferBuiltins: false,
            }),
            analyze(),
            replace({
                'process.env.NODE_ENV': '"production"',
                delimiters: ['', ''],
            }),
            commonjs(),
        ],
        output: {
            file: 'wq.js',
            banner,
            sourcemap: true,
            format: 'esm',
        },
    },
];
