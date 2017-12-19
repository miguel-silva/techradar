// @flow

import createTechradar from "./index";

import type { TechradarData } from "./index";

const data: TechradarData = {
  rings: [
    { id: "adopt", name: "Adopt" },
    { id: "trial", name: "Trial" },
    { id: "assess", name: "Assess" },
    { id: "hold", name: "Hold" },
  ],
  slices: [
    {
      name: "Testing",
      blipsByRing: {
        adopt: [
          {
            name: "Jest",
            url: "https://github.com/facebook/jest",
            description: "Test Framework",
          },
          {
            name: "Enzyme",
            url: "https://github.com/airbnb/enzyme",
            description: "React Testing Utilities",
          },
        ],
        hold: [
          {
            name: "Mocha",
            url: "https://github.com/mochajs/mocha",
            description: "Test Framework",
          },
        ],
      },
    },
    {
      name: "Frameworks & Ecosystems",
      blipsByRing: {
        adopt: [
          {
            name: "React",
            url: "https://github.com/facebook/react",
            description: "View library",
          },
        ],
        assess: [
          {
            name: "Vue",
            url: "https://github.com/vuejs/vue",
            description: "View library",
          },
          {
            name: "Angular (2+)",
            url: "https://github.com/angular/angular",
            description: "Framework",
          },
        ],
        hold: [
          {
            name: "AngularJS (1)",
            url: "https://github.com/angular/angular.js",
            description: "Framework",
          },
          {
            name: "jQuery",
            url: "https://github.com/jquery/jquery",
            description: "Ecosystem",
          },
        ],
      },
    },
    {
      name: "App state-management",
      blipsByRing: {
        adopt: [
          {
            name: "Redux",
            url: "https://github.com/reactjs/redux",
            description: "State container with Time traveling",
          },
        ],
        assess: [
          {
            name: "Mobx-State-Tree",
            url: "https://github.com/mobxjs/mobx-state-tree",
            description: "Mix of MobX with Redux",
          },
          {
            name: "Statty",
            url: "https://github.com/vesparny/statty",
            description:
              "React component based state management influenced by Redux",
          },
        ],
      },
    },
  ],
};

const rootEl = document.getElementById("root");

window.techradar = createTechradar(rootEl, data);
