import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

import pkg from "./package.json";

export default {
  name: pkg.name,
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
  sourcemap: true,
};
