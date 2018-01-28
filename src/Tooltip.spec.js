import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  let tooltip: Tooltip;

  beforeEach(() => {
    tooltip = new Tooltip();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should inject a hidden div into the body when created", () => {
    const tooltipEl = document.querySelector("body > div");

    expect(tooltipEl.style.getPropertyValue("opacity")).toEqual("0");

    expect(tooltipEl).toMatchSnapshot();
  });

  it("should make tooltip visible with specified text, on top of a certain anchor point, after calling the show method", () => {
    const text = "Hello!";
    const anchorX = 500;
    const anchorY = 1000;

    tooltip.show(text, anchorX, anchorY);

    const tooltipEl = document.querySelector("body > div");
    expect(tooltipEl.style.getPropertyValue("opacity")).toEqual("1");

    //horizontally centered on the anchorX
    const expectedLeft = anchorX - tooltipEl.offsetWidth / 2 + "px";
    expect(tooltipEl.style.getPropertyValue("left")).toEqual(expectedLeft);

    //vertically above the anchorY (with some margin)
    const expectedTop = anchorY - tooltipEl.offsetHeight - 10 + "px";
    expect(tooltipEl.style.getPropertyValue("top")).toEqual(expectedTop);

    const tooltipSpanEl = tooltipEl.querySelector("span");
    expect(tooltipSpanEl.textContent).toBe(text);
  });
});
