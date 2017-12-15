// @flow

import {
  select,
  pie,
  arc,
  scaleLinear,
  scaleLog,
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
    .domain(data.slices.map((slice, sliceIndex) => sliceIndex))
    .range(schemeCategory10);

  const ringColorScale = scaleLinear()
    .domain([0, data.rings.length - 1])
    .range(["#d2d2d2", "#f0f0f0"]);

  const radiusScale = scaleLog()
    .domain([1, data.rings.length + 1])
    .range([0, width / 2 - padding]);

  const arcs = pie().value(() => 1)(data.slices);

  const ringInfoList = data.rings.map((ring, ringIndex) => {
    const innerRadius = radiusScale(ringIndex + 1);
    const outerRadius = radiusScale(ringIndex + 2);
    const pathGenerator = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    return {
      innerRadius,
      outerRadius,
      pathGenerator,
    };
  });

  const areas = data.slices.reduce((acc, slice, sliceIndex) => {
    const arc = arcs[sliceIndex];

    //TEST: middle point angle
    const angle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;

    const ringsPerSlice = data.rings.map((ring, ringIndex) => {
      const ringInfo = ringInfoList[ringIndex];

      //TEST: middle point distance
      const distance =
        ringInfo.innerRadius +
        (ringInfo.outerRadius - ringInfo.innerRadius) / 2;

      //TEST: middle point coords
      const point = {
        x: distance * Math.cos(angle - Math.PI / 2),
        y: distance * Math.sin(angle - Math.PI / 2),
      };

      return {
        sliceIndex,
        ringIndex,
        point,
        path: ringInfo.pathGenerator(arc),
      };
    });

    return acc.concat(ringsPerSlice);
  }, []);

  //add areas
  container
    .selectAll("path")
    .data(areas)
    .enter()
    .append("path")
    .attr("fill", d => ringColorScale(d.ringIndex))
    .attr("stroke", "black")
    .attr("d", d => d.path);

  //TEST: add middle points
  container
    .selectAll("circle")
    .data(areas)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", d => sliceColorScale(d.sliceIndex))
    .attr("cx", d => d.point.x)
    .attr("cy", d => d.point.y);

  return techradar;
};

export default createTechradar;
