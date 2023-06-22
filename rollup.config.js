import pkg from "./package.json" assert { type: "json" };
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import analyze from "rollup-plugin-analyzer";
import license from "rollup-plugin-license";

const banner = `/*!
 * ${pkg.name} ${pkg.version}
 * ${pkg.description}
 * (c) 2012-2023, S. Andrew Sheppard
 * https://wq.io/license
 */`;

function resolveId(id) {
    if (id == "maplibre-gl") {
        return { id: "https://unpkg.com/maplibre-gl", external: true };
    }
}

export default [
    {
        input: "index.js",
        plugins: [
            terser({ keep_fnames: /^([A-Z]|use[A-Z])/ }), // Preserve component & hook names
            { resolveId },
            resolve({
                preferBuiltins: false,
                extensions: [".js", ".ts", ".tsx"],
                dedupe: (path) => path[0] !== ".",
            }),
            analyze({ limit: 10 }),
            license({ thirdParty: { output: "licenses.txt" } }),
            replace({
                "process.env.NODE_ENV": '"production"',
                "import maplibre from": "import",
                "mapgl.setEngine(maplibre)":
                    "mapgl.setEngine(window.maplibregl)",
                WQ_VERSION: pkg.version,
                delimiters: ["", ""],
                preventAssignment: true,
            }),
            commonjs(),
            json(),
        ],
        output: {
            file: "wq.js",
            inlineDynamicImports: true,
            banner,
            format: "esm",
            sourcemap: true,
        },
    },
];
