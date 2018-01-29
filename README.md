# Techradar

## Intro

Heavily influenced by [ThoughtWorks' Technology Radar](https://www.thoughtworks.com/radar/faq), this project allows one to create a visualization about their own organizations' overview of the frameworks, libraries, tools, platforms and/or techniques that are relevant them, together with their respective recommended adoption level.

## Why use this instead of...

The typical technology radar identifies 4 dimensions (Techniques, Tools, Platforms and Languages & Frameworks) and 4 adotion levels (Adopt, Trial, Assess and Hold).

But what about when you want more (or less) dimensions or adoption levels at your organization / guild. For example, group libraries, tools and techniques by topics like:

* State Management
* Testing
* Styling
* Linting & Formatting
* Forms
* etc...

This library was created because no other tool was able to support those situations, at that point in time.

## Installation

To install the stable version:

`npm install --save @miguel-silva/techradar`

It also depends on D3.js v4:

`npm install --save d3`

## Usage

The example below defines a techradar that:

* is appended to an element whose id is `radar-container`
* contains several blips, divided across 3 rings (levels of adoption) and 3 slices (topics)
* is `300px` wide and tall

```js
import createTechradar from "@miguel-silva/techradar";

const targetEl = document.getElementById("radar-container");

const exampleData = {
  rings: [
    { id: "go", name: "Go for it" },
    { id: "check", name: "Check it out" },
    { id: "hold", name: "Hold your horses" },
  ],
  slices: [
    {
      name: "Frameworks & Ecosystems",
      blipsByRing: {
        go: [{ name: "React" }],
        check: [{ name: "Vue" }, { name: "Angular (2+)" }],
        hold: [{ name: "AngularJS (1)" }, { name: "jQuery" }],
      },
    },
    {
      name: "Linting & Formatting",
      blipsByRing: {
        go: [{ name: "ESLint" }, { name: "Prettier" }],
        check: [{ name: "AirBNB Eslint Config" }],
      },
    },
    {
      name: "Project starter",
      blipsByRing: {
        go: [{ name: "CRA (Create React App)" }],
        check: [{ name: "Next.js" }, { name: "React App Rewired" }],
      },
    },
  ],
};

createTechradar(targetEl, exampleData, {
  radarSize: 300,
});
```

## Next steps

1. Add support for showing ring labels
2. Add support for showing slice labels
3. Add support for more blip shapes, to separate recent updates from older updates
4. Add support for event subscriptions
