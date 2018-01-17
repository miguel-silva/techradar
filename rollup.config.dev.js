import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";

export default {
  input: "src/app.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
  },
  plugins: [
    json(),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"],
    }),
    resolve(),
    commonjs(),
  ],
  sourcemap: true,
};
