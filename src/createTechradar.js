// @flow

import { select, event } from "d3";

import generateTechradarViewData from "./generateTechradarViewData";

import { Tooltip } from "./Tooltip";

import type { TechradarData, TechradarOptions } from "./types";

export type { TechradarData, TechradarOptions };

const createTechradar = (
  targetEl: any,
  data: TechradarData,
  options?: TechradarOptions
) => {
  const { radarSize = 600, blipRadius = 10 } = options || {};

  const tooltip = new Tooltip();

  //setup base svg
  const techradar = select(targetEl)
    .append("svg")
    .attr("width", radarSize)
    .attr("height", radarSize);

  const radarCenter = radarSize / 2;

  //add centered container
  const container = techradar
    .append("g")
    .attr("transform", `translate(${radarCenter}, ${radarCenter})`);

  //generate areas and blips
  const viewData = generateTechradarViewData(data, radarSize, blipRadius);

  //add areas
  container
    .selectAll("path")
    .data(viewData.areas)
    .enter()
    .append("path")
    .attr("fill", area => area.bgColor)
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
    .attr("r", blipRadius)
    .attr("stroke", "black")
    .attr("fill", blip => blip.bgColor);

  blips
    .append("text")
    .style("pointer-events", "none")
    .attr("dy", 4)
    .attr("text-anchor", "middle")
    .attr("fill", blip => blip.textColor)
    .text((blip, blipIndex) => blipIndex + 1);

  return techradar;
};

export default createTechradar;
