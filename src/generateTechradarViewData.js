// @flow

import {
  pie,
  arc,
  scaleLinear,
  scaleLog,
  scaleSequential,
  interpolateRainbow,
} from "d3";

import { readableColor } from "polished";

import type { TechradarData, TechradarOptions } from "./types";

const OUTER_PADDING = 5;

const generateTechradarViewData = (
  data: TechradarData,
  radarSize: number,
  blipRadius: number
) => {
  //setup base scales
  const sliceColorScale = scaleSequential()
    .domain([0, data.slices.length])
    .interpolator(interpolateRainbow);

  const ringColorScale = scaleLinear()
    .domain([0, data.rings.length - 1])
    .range(["#d2d2d2", "#f0f0f0"]);

  const radiusScale = scaleLog()
    .domain([1, data.rings.length + 1])
    .range([0, radarSize / 2 - OUTER_PADDING]);

  //generate arc per slice
  const arcs = pie()
    .value(1)(data.slices)
    .sort();

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
  return data.slices.reduce(
    (acc, sliceData, sliceIndex) => {
      const arc = arcs[sliceIndex];

      const blipBgColor = sliceColorScale(sliceIndex);
      const blipTextColor = readableColor(blipBgColor);

      //generate areas and blips for all of this slice's rings
      const sliceViewData = data.rings.reduce(
        (acc, ringData, ringIndex) => {
          const ringPathInfo = ringPathInfoList[ringIndex];

          //generate area that is the interception of current slice and ring
          const area = {
            sliceIndex,
            ringIndex,
            bgColor: ringColorScale(ringIndex),
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
                //go for another try since it overlaps another
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

          //sort positions taking into account their angle and distance
          positions.sort(function(a, b) {
            const angleDiff = a.angle - b.angle;
            const distanceDiff = a.distance - b.distance;

            //if the angle difference is greater than the distance (to the center) difference, return angleDiff as the sorting factor otherwise return distanceDiff
            return Math.abs(
              Math.sin(angleDiff) * (b.distance + distanceDiff / 2)
            ) > Math.abs(distanceDiff)
              ? angleDiff
              : distanceDiff;
          });

          //generate and add new blips
          acc.blips = acc.blips.concat(
            blipDataList.map((blip, blipIndex) => {
              const position = positions[blipIndex];

              return {
                ...blip,
                sliceIndex,
                ringIndex,
                bgColor: blipBgColor,
                textColor: blipTextColor,
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
};

export default generateTechradarViewData;
