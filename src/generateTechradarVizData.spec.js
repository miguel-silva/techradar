import generateTechradarVizData from "./generateTechradarVizData";

import exampleData from "./example.json";

describe("generateTechradarVizData", () => {
  describe("with exampleData and default options", () => {
    let vizData;

    beforeAll(() => {
      vizData = generateTechradarVizData(exampleData);
    });

    it("rings should contain all ring input data", () => {
      vizData.rings.forEach((vizRing, ringIndex) => {
        expect(vizRing).toEqual(
          expect.objectContaining(exampleData.rings[ringIndex])
        );
      });
    });

    it("rings should have a unique color", () => {
      const colorSet = new Set(vizData.rings.map(vizRing => vizRing.color));

      expect(colorSet.size).toBe(vizData.rings.length);
    });

    it("slices should contain all slice input data, except blipsPerRing", () => {
      vizData.slices.forEach((vizSlice, sliceIndex) => {
        const { blipsByRing, ...inputSlice } = exampleData.slices[sliceIndex];

        expect(vizSlice).toEqual(expect.objectContaining(inputSlice));
      });
    });

    it("slices should have a unique color", () => {
      const colorSet = new Set(vizData.slices.map(vizSlice => vizSlice.color));

      expect(colorSet.size).toBe(vizData.slices.length);
    });
  });
});
