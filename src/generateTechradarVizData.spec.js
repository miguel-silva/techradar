import generateTechradarVizData from "./generateTechradarVizData";

import exampleData from "./example.json";

describe("generateTechradarVizData", () => {
  describe("with exampleData and default options", () => {
    let vizData;

    beforeAll(() => {
      vizData = generateTechradarVizData(exampleData);
    });

    it("should return rings, each containing their respective ring input data", () => {
      vizData.rings.forEach((vizRing, ringIndex) => {
        expect(vizRing).toEqual(
          expect.objectContaining(exampleData.rings[ringIndex])
        );
      });
    });

    it("should return rings, each containing a unique color", () => {
      const colorSet = new Set(vizData.rings.map(vizRing => vizRing.color));

      expect(colorSet.size).toBe(vizData.rings.length);
    });

    it("should return slices, each containing their respective slice input data, except blipsPerRing", () => {
      vizData.slices.forEach((vizSlice, sliceIndex) => {
        const { blipsByRing, ...inputSlice } = exampleData.slices[sliceIndex];

        expect(vizSlice).toEqual(expect.objectContaining(inputSlice));
      });
    });

    it("should return slices, each containing a unique color", () => {
      const colorSet = new Set(vizData.slices.map(vizSlice => vizSlice.color));

      expect(colorSet.size).toBe(vizData.slices.length);
    });

    it("should return as many areas as there are combinations of slices and rings", () => {
      expect(vizData.areas).toHaveLength(
        vizData.slices.length * vizData.rings.length
      );
    });
  });
});
