// @flow

import createTechradar from "./index";

import exampleData from "./example.json";

const rootEl = document.getElementById("root");

window.techradar = createTechradar(rootEl, exampleData);
