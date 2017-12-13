import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";

import { minify } from "uglify-es";

import pkg from "./package.json";

process.env.NODE_ENV = "production";

export default {
  name: pkg.name,
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: pkg.browser,
      format: "umd",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
    uglify({}, minify),
  ],
  globals: {
    d3: "d3",
  },
  external: id => /d3/.test(id),
};
