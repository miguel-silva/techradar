import generateTechradarVizData from "./generateTechradarVizData";

import exampleData from "./example.json";

describe("generateTechradarVizData", () => {
  describe("with exampleData and default options", () => {
    let vizData;

    beforeAll(() => {
      vizData = generateTechradarVizData(exampleData);
    });

    it("should return rings, each containing their respective ring input data", () => {
      vizData.rings.forEach((ringVizData, ringIndex) => {
        expect(ringVizData).toEqual(
          expect.objectContaining(exampleData.rings[ringIndex])
        );
      });
    });

    it("should return rings, each containing a unique color", () => {
      const colorSet = new Set(
        vizData.rings.map(ringVizData => ringVizData.color)
      );

      expect(colorSet.size).toBe(vizData.rings.length);
    });

    it("should return slices, each containing their respective slice input data, except blipsPerRing", () => {
      vizData.slices.forEach((sliceVizData, sliceIndex) => {
        const { blipsByRing, ...sliceInputData } = exampleData.slices[
          sliceIndex
        ];

        expect(sliceVizData).toEqual(expect.objectContaining(sliceInputData));
      });
    });

    it("should return slices, each containing a unique color", () => {
      const colorSet = new Set(
        vizData.slices.map(sliceVizData => sliceVizData.color)
      );

      expect(colorSet.size).toBe(vizData.slices.length);
    });

    it("should return as many areas as there are combinations of slices and rings", () => {
      expect(vizData.areas).toHaveLength(
        vizData.slices.length * vizData.rings.length
      );
    });

    it("should return default global attributes", () => {
      expect(vizData.global).toMatchSnapshot();
    });

    it("should return blips, each containing their respective blip input data and correct slice and ring indexes", () => {
      //extract blip data, and their slice and ring index, in order
      const blips = exampleData.slices.reduce((acc, slice, sliceIndex) => {
        const { blipsByRing } = slice;
        const sliceBlips = Object.keys(blipsByRing).reduce((acc, ringId) => {
          const ringIndex = exampleData.rings.findIndex(
            ring => ring.id === ringId
          );
          if (ringIndex === -1) {
            return acc;
          }

          const ringBlips = blipsByRing[ringId].map(blip => ({
            ...blip,
            sliceIndex,
            ringIndex,
          }));

          return acc.concat(ringBlips);
        }, []);

        return acc.concat(sliceBlips);
      }, []);

      vizData.blips.forEach((blipVizData, blipIndex) => {
        const blipData = blips[blipIndex];
        expect(blipVizData).toEqual(expect.objectContaining(blipData));
      });
    });
  });
});
