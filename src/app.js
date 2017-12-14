// @flow

import createTechradar from "./index";

import type { TechradarData } from "./index";

const data: TechradarData = {
  rings: ["Adopt", "Trial", "Assess", "Hold"],
  slices: [
    {
      name: "Testing",
    },
    {
      name: "Frameworks & Ecosystems",
    },
  ],
};

const rootEl = document.getElementById("root");

window.techradar = createTechradar(rootEl, data);
