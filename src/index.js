import { scaleOrdinal, schemeCategory10 } from "d3";

const createColorScale = domain =>
  scaleOrdinal()
    .domain(domain)
    .range(schemeCategory10);

export default createColorScale;
