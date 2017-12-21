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

  const minBlipCenterDistance = blipRadius * 2;

  //generate viewData ({blips, areas}) from combining data.slices with data.rings
  const viewData = data.slices.reduce(
    (acc, sliceData, sliceIndex) => {
      const arc = arcs[sliceIndex];

      //generate areas and blips for all of this slice's rings
      const sliceViewData = data.rings.reduce(
        (acc, ringData, ringIndex) => {
          const ringPathInfo = ringPathInfoList[ringIndex];

          //generate area that is the interception of current slice and ring
          const area = {
            sliceIndex,
            ringIndex,
            path: ringPathInfo.generator(arc),
          };

          acc.areas.push(area);

          const blipDataList = sliceData.blipsByRing[ringData.id];

          //avoid generating blips for the current slice's ring, if there aren't any
          if (!blipDataList) {
            return acc;
          }

          //calculate blip positions
          const positions = blipDataList.reduce(acc => {
            //repetively try to generate a new random position that doesn't collide with other existing ones
            for (let tries = 1; ; tries++) {
              //calculate random distance within the current ring
              const distance = ringPathInfo.blipDistanceScale(Math.random());

              //calculate angle padding to avoid blip overlapping adjacent slices
              const anglePadding = Math.asin(blipRadius / distance);

              const minAngle = arc.startAngle + anglePadding;
              const maxAngle = arc.endAngle - anglePadding;

              const blipAngleScale = scaleLinear().range([minAngle, maxAngle]);

              //if there is enough space, calculate random angle within the current ring, otherwise center it
              const angle =
                maxAngle > minAngle
                  ? blipAngleScale(Math.random())
                  : blipAngleScale(0.5);

              //convert to polar coords
              const x = distance * Math.cos(angle - Math.PI / 2);
              const y = distance * Math.sin(angle - Math.PI / 2);

              //if it hasn't hit the limit of tries and overlaps another blip, go for another try
              if (
                tries < 10 &&
                acc.some(
                  other =>
                    Math.hypot(other.x - x, other.y - y) < minBlipCenterDistance
                )
              ) {
                //go for another try since it collided with others
                continue;
              }

              return acc.concat({
                angle,
                distance,
                x,
                y,
              });
            }

            return acc;
          }, []);

          //generate and add new blips
          acc.blips = acc.blips.concat(
            blipDataList.map((blip, blipIndex) => {
              const position = positions[blipIndex];

              return {
                ...blip,
                sliceIndex,
                ringIndex,
                x: position.x,
                y: position.y,
              };
            })
          );

          return acc;
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
    .attr("fill", blip => sliceColorScale(blip.sliceIndex));

  blips
    .append("text")
    .style("pointer-events", "none")
    .attr("dy", 4)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text((blip, blipIndex) => blipIndex + 1);

  return techradar;
};

export default createTechradar;
