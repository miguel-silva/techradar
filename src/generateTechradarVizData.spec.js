import generateTechradarVizData from "./generateTechradarVizData";

import exampleData from "./example.json";

describe("generateTechradarVizData", () => {
  describe("with exampleData and default options", () => {
    let vizData;

    beforeAll(() => {
      vizData = generateTechradarVizData(exampleData);
    });

    it("should return some visualization data", () => {
      expect(vizData).toBeDefined();
    });
  });
});
