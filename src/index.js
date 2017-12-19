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
  //create shared tooltip
  const tooltip = select("body")
    .append("div")
    .style("font-size", "12px")
    .style("color", "white")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("border-radius", "3px")
    .style("background-color", "black")
    .style("padding", "5px 8px");

  //add shared tooltip's text container
  const tooltipSpan = tooltip.append("span");

  //add tooltip's box arrow
  tooltip
    .append("div")
    .text("▼")
    .style("color", "black")
    .style("position", "absolute")
    .style("margin-top", "-3px")
    .style("top", "100%")
    .style("left", 0)
    .style("width", "100%")
    .style("text-align", "center");

  const showTooltip = blip => {
    tooltipSpan.text(blip.name);
    tooltip
      .style("opacity", 1)
      .style("left", event.x - tooltip.node().offsetWidth / 2 + "px")
      .style("top", event.y - tooltip.node().offsetHeight - 10 + "px");
  };

  const hideTooltip = () => {
    tooltip.style("opacity", 0);
    tooltipSpan.text("");
  };

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
    .on("touchstart", showTooltip)
    .on("mousemove", showTooltip)
    .on("touchend", hideTooltip)
    .on("mouseout", hideTooltip);

  return techradar;
};

export default createTechradar;
