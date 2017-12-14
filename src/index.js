// @flow

import {
  select,
  pie,
  arc,
  scaleLinear,
  scaleOrdinal,
  schemeCategory10,
} from "d3";

const width = 600;
const height = 600;
const padding = 10;

export type TechradarSlice = {
  name: string,
};

export type TechradarData = {
  slices: TechradarSlice[],
  rings: string[],
};

const createTechradar = (svgEl: any, data: TechradarData) => {
  const techradar = select(svgEl)
    .attr("width", width)
    .attr("height", height);

  const container = techradar
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const sliceColorScale = scaleOrdinal()
    .domain(data.slices.map(slice => slice.name))
    .range(schemeCategory10);

  const ringColorScale = scaleLinear()
    .domain([0, data.rings.length - 1])
    .range(["#d2d2d2", "#f0f0f0"]);

  const radiusScale = scaleLinear()
    .domain([0, data.rings.length])
    .range([0, width / 2 - padding]);

  const arcs = pie().value(() => 1)(data.slices);

  const ringPathGenerators = data.rings.map((ring, ringIndex) =>
    arc()
      .innerRadius(radiusScale(ringIndex))
      .outerRadius(radiusScale(ringIndex + 1))
  );

  const areas = data.slices.reduce((acc, slice, sliceIndex) => {
    const arc = arcs[sliceIndex];

    const ringsPerSlice = data.rings.map((ring, ringIndex) => {
      const ringPathGenerator = ringPathGenerators[ringIndex];

      return {
        sliceIndex,
        ringIndex,
        path: ringPathGenerator(arc),
      };
    });

    return acc.concat(ringsPerSlice);
  }, []);

  container
    .selectAll("path")
    .data(areas)
    .enter()
    .append("path")
    .attr("fill", d => ringColorScale(d.ringIndex))
    .attr("stroke", "black")
    .attr("d", d => d.path);

  return techradar;
};

export default createTechradar;
