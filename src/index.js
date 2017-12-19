// @flow

import {
  select,
  pie,
  arc,
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  schemeCategory10,
  event,
} from "d3";

import { Tooltip } from "./Tooltip";

const width = 600;
const height = 600;
const padding = 10;
const blipRadius = 10;

export type TechradarRing = {
  id: string,
  name: string,
};

export type TechradarBlip = {
  name: string,
  description?: string,
  url?: string,
};

export type TechradarSlice = {
  name: string,
  blipsByRing: {
    [ringId: string]: TechradarBlip[],
  },
};

export type TechradarData = {
  slices: TechradarSlice[],
  rings: TechradarRing[],
};

const createTechradar = (targetEl: any, data: TechradarData) => {
  const tooltip = new Tooltip();

  //setup base svg
  const techradar = select(targetEl)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //add centered container
  const container = techradar
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const sliceColorScale = scaleOrdinal()
    .domain(data.slices.map((slice, sliceIndex) => sliceIndex))
    .range(schemeCategory10);

  const ringColorScale = scaleLinear()
    .domain([0, data.rings.length - 1])
    .range(["#d2d2d2", "#f0f0f0"]);

  const radiusScale = scaleLog()
    .domain([1, data.rings.length + 1])
    .range([0, width / 2 - padding]);

  const arcs = pie().value(() => 1)(data.slices);

  //generate ring path info from data.rings
  const ringPathInfoList = data.rings.map((ringData, ringIndex) => {
    const innerRadius = radiusScale(ringIndex + 1);
    const outerRadius = radiusScale(ringIndex + 2);

    //arc path generator
    const generator = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    return {
      blipDistanceScale: scaleLinear().range([
        innerRadius + blipRadius,
        outerRadius - blipRadius,
      ]),
      generator,
    };
  });

  //generate viewData ({blips, areas}) from combining data.slices with data.rings
  const viewData = data.slices.reduce(
    (acc, sliceData, sliceIndex) => {
      const arc = arcs[sliceIndex];

      const blipAngleScale = scaleLinear().range([
        arc.startAngle,
        arc.endAngle,
      ]);

      const sliceViewData = data.rings.reduce(
        (acc, ringData, ringIndex) => {
          const ringPathInfo = ringPathInfoList[ringIndex];

          const blipDataList = sliceData.blipsByRing[ringData.id];

          const blips = blipDataList
            ? acc.blips.concat(
                blipDataList.map(blip => {
                  const distance = ringPathInfo.blipDistanceScale(
                    Math.random()
                  );
                  const angle = blipAngleScale(Math.random());

                  return {
                    ...blip,
                    sliceIndex,
                    ringIndex,
                    x: distance * Math.cos(angle - Math.PI / 2),
                    y: distance * Math.sin(angle - Math.PI / 2),
                  };
                })
              )
            : acc.blips;

          const area = {
            sliceIndex,
            ringIndex,
            path: ringPathInfo.generator(arc),
          };

          return {
            blips,
            areas: acc.areas.concat(area),
          };
        },
        {
          areas: [],
          blips: [],
        }
      );

      return {
        areas: acc.areas.concat(sliceViewData.areas),
        blips: acc.blips.concat(sliceViewData.blips),
      };
    },
    {
      areas: [],
      blips: [],
    }
  );

  //add areas
  container
    .selectAll("path")
    .data(viewData.areas)
    .enter()
    .append("path")
    .attr("fill", area => ringColorScale(area.ringIndex))
    .attr("stroke", "black")
    .attr("d", area => area.path);

  const showBlipTooltip = blip => {
    const blipRect = event.target.getBoundingClientRect();
    tooltip.show(blip.name, blipRect.x + blipRect.width / 2, blipRect.y);
  };

  //add blips
  container
    .selectAll("g")
    .data(viewData.blips)
    .enter()
    .append("g")
    .attr("transform", blip => `translate(${blip.x}, ${blip.y})`)
    .append("circle")
    .attr("r", blipRadius)
    .attr("fill", blip => sliceColorScale(blip.sliceIndex))
    .on("touchstart", showBlipTooltip)
    .on("mouseover", showBlipTooltip)
    .on("touchend", tooltip.hide)
    .on("mouseout", tooltip.hide);

  return techradar;
};

export default createTechradar;
