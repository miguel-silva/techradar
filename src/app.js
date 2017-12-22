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
      name: "Linting & Formatting",
      blipsByRing: {
        adopt: [
          {
            name: "ESLint",
            url: "https://github.com/eslint/eslint",
            description: "Linter",
          },
          {
            name: "Prettier",
            url: "https://github.com/prettier/prettier",
            description: "Formatter",
          },
        ],
        trial: [
          {
            name: "AirBNB Eslint Config",
            url:
              "https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb",
            description: "ESLint config",
          },
        ],
      },
    },
    {
      name: "Project starter",
      blipsByRing: {
        adopt: [
          {
            name: "CRA (Create React App)",
            url: "https://github.com/facebookincubator/create-react-app",
            description: "Basic React PWA CLI",
          },
        ],
        trial: [
          {
            name: "Next.js",
            url: "https://github.com/zeit/next.js",
            description: "Isomorphic React App Framework",
          },
          {
            name: "React App Rewired",
            url: "https://github.com/timarney/react-app-rewired",
            description: "CRA config helper",
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
    {
      name: "Async handling",
      blipsByRing: {
        adopt: [
          {
            name: "RxJS (5)",
            url: "https://github.com/ReactiveX/rxjs",
            description: "Reactive programming library",
          },
        ],
        trial: [
          {
            name: "Redux Observable",
            url: "https://github.com/redux-observable/redux-observable",
            description: "RxJS 5-based middleware for Redux",
          },
        ],
        assess: [
          {
            name: "Redux Saga",
            url: "https://github.com/redux-saga/redux-saga",
            description: "Generator-based middleware for Redux",
          },
        ],
      },
    },
    {
      name: "Enhancers",
      blipsByRing: {
        trial: [
          {
            name: "Redux Form",
            url: "https://github.com/erikras/redux-form",
            description: "Form management based on Redux",
          },
          {
            name: "Downshift",
            url: "https://github.com/paypal/downshift",
            description:
              "React Autocomplete/Dropdown/Select/Combobox Primitive",
          },
          {
            name: "React Sortable",
            url: "https://github.com/clauderic/react-sortable-hoc",
            description:
              "React HOCs for animated, touch-friendly, sortable list",
          },
        ],
        assess: [
          {
            name: "React DnD",
            url: "https://github.com/react-dnd/react-dnd",
            description: "React HOCs for complex drag and drop interfaces",
          },
          {
            name: "Recompose",
            url: "https://github.com/acdlite/recompose",
            description:
              "React utility HOCs. For example, lifting state, mapping context to props and optimizing performance.",
          },
          {
            name: "PowerPlug",
            url: "https://github.com/renatorib/react-powerplug",
            description:
              "React render-prop-based State/Feedback/Form Containers",
          },
        ],
      },
    },
    {
      name: "Component Styling",
      blipsByRing: {
        trial: [
          {
            name: "Emotion",
            url: "https://github.com/emotion-js/emotion",
            description: "Web CSS-in-JS library",
          },
        ],
        assess: [
          {
            name: "Styled Components",
            url: "https://github.com/styled-components/styled-components",
            description: "React CSS-in-JS library",
          },
          {
            name: "Glamor",
            url: "https://github.com/threepointone/glamor",
            description: "Web CSS-in-JS library",
          },
          {
            name: "Glamorous",
            url: "https://github.com/paypal/glamorous",
            description: "React CSS-in-JS library",
          },
        ],
        hold: [
          {
            name: "CSS Modules",
            url: "https://github.com/css-modules/css-modules",
            description: "Component-scoped .css modules",
          },
        ],
      },
    },
    {
      name: "Routing",
      blipsByRing: {
        adopt: [
          {
            name: "React Router",
            url: "https://github.com/ReactTraining/react-router",
            description: "React Declarative Routing",
          },
        ],
        assess: [
          {
            name: "Redux-First Router",
            url: "https://github.com/faceyspacey/redux-first-router",
            description: "Redux based Routing",
          },
        ],
      },
    },
    {
      name: "Code-sharing",
      blipsByRing: {
        assess: [
          {
            name: "React Primitives",
            url: "https://github.com/lelandrichardson/react-primitives",
            description: "Primitive React Interfaces Across Targets",
          },
          {
            name: "React Native Web",
            url: "https://github.com/necolas/react-native-web",
            description: "Treats web as a target for React Native",
          },
        ],
      },
    },
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
      name: "UI Library",
      blipsByRing: {
        trial: [
          {
            name: "Material-UI (1.0)",
            url: "https://github.com/callemall/material-ui",
            description: "Material Design UI Toolkit",
          },
        ],
        assess: [
          {
            name: "React Toolbox (2.0)",
            url: "https://github.com/react-toolbox/react-toolbox",
            description: "Material Design UI Toolkit",
          },
          {
            name: "Ant Design",
            url: "https://github.com/ant-design/ant-design",
            description: "UI Toolkit",
          },
          {
            name: "Semantic UI",
            url: "https://github.com/ant-design/ant-design",
            description: "UI Toolkit",
          },
        ],
        hold: [
          {
            name: "Material-UI (<1.0)",
            url: "https://github.com/callemall/material-ui/tree/master",
            description: " Material Design UI Toolkit",
          },
        ],
      },
    },
  ],
};

const rootEl = document.getElementById("root");

window.techradar = createTechradar(rootEl, data);
