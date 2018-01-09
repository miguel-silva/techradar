// @flow

import { select, event } from "d3";

import generateTechradarViewData from "./generateTechradarViewData";

import { Tooltip } from "./Tooltip";

import type {
  TechradarData,
  TechradarOptions,
  TechradarViewData,
} from "./types";

const createTechradar = (
  targetEl: any,
  data: TechradarData,
  options?: TechradarOptions
): {
  viewData: TechradarViewData,
  destroy: () => void,
} => {
  const tooltip = new Tooltip();

  //generate areas and blips
  const viewData = generateTechradarViewData(data, options);

  //setup base svg
  const techradar = select(targetEl)
    .append("svg")
    .attr("width", viewData.global.radarSize)
    .attr("height", viewData.global.radarSize);

  const radarCenter = viewData.global.radarSize / 2;

  //add centered container
  const container = techradar
    .append("g")
    .attr("transform", `translate(${radarCenter}, ${radarCenter})`);

  //add areas
  container
    .selectAll("path")
    .data(viewData.areas)
    .enter()
    .append("path")
    .attr("fill", area => viewData.rings[area.ringIndex].color)
    .attr("stroke", "black")
    .attr("d", area => area.path);

  const showBlipTooltip = blip => {
    const blipRect = event.target.getBoundingClientRect();
    tooltip.show(blip.name, blipRect.x + blipRect.width / 2, blipRect.y);
  };

  //add blips
  const blips = container
    .selectAll("g")
    .data(viewData.blips)
    .enter()
    .append("g")
    .style("font-size", "12")
    .attr("transform", blip => `translate(${blip.x}, ${blip.y})`)
    .on("touchstart", showBlipTooltip)
    .on("mouseover", showBlipTooltip)
    .on("touchend", tooltip.hide)
    .on("mouseout", tooltip.hide);

  blips
    .append("circle")
    .attr("r", viewData.global.blipRadius)
    .attr("stroke", "black")
    .attr("fill", blip => viewData.slices[blip.sliceIndex].color);

  blips
    .append("text")
    .style("pointer-events", "none")
    .attr("dy", 4)
    .attr("text-anchor", "middle")
    .attr("fill", blip => viewData.slices[blip.sliceIndex].textColor)
    .text((blip, blipIndex) => blipIndex + 1);

  const destroy = () => {
    tooltip.destroy();
    techradar.remove();
  };

  return {
    viewData,
    destroy,
  };
};

export default createTechradar;
