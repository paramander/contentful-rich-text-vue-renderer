import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import common from "@rollup/plugin-commonjs";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: [
      {
        name: "ContentfulRichText",
        file: pkg.browser,
        format: "umd",
      },
    ],
    plugins: [
      nodeResolve({
        browser: true,
      }),
      common(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
    ],
  },

  {
    external: ["@contentful/rich-text-types"],
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "default",
      },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [nodeResolve()],
  },
];
