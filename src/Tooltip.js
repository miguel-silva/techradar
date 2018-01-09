import { select } from "d3";

export class Tooltip {
  constructor() {
    //create tooltip
    this.tooltip = select("body")
      .append("div")
      .style("font-size", "12px")
      .style("color", "white")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("border-radius", "3px")
      .style("background-color", "black")
      .style("padding", "5px 8px");

    //add tooltip's text container
    this.tooltipSpan = this.tooltip.append("span");

    //add tooltip's box arrow
    this.tooltip
      .append("div")
      .text("▼")
      .style("color", "black")
      .style("position", "absolute")
      .style("margin-top", "-3px")
      .style("top", "100%")
      .style("left", 0)
      .style("width", "100%")
      .style("text-align", "center");
  }

  show = (text, anchorX, anchorY) => {
    this.tooltipSpan.text(text);
    this.tooltip
      .style("opacity", 1)
      .style("left", anchorX - this.tooltip.node().offsetWidth / 2 + "px")
      .style("top", anchorY - this.tooltip.node().offsetHeight - 10 + "px");
  };

  hide = () => {
    this.tooltip.style("opacity", 0);
    this.tooltipSpan.text("");
  };

  destroy = () => {
    this.tooltip.remove();
    this.tooltipSpan = this.tooltip = null;
  };
}
