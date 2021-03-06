// @flow

export type TechradarRingData = {
  id: string,
  name: string,
};

export type TechradarBlipData = {
  name: string,
  description?: string,
  url?: string,
};

export type TechradarSliceData = {
  name: string,
  blipsByRing: {
    [ringId: string]: TechradarBlipData[],
  },
};

export type TechradarData = {
  slices: TechradarSliceData[],
  rings: TechradarRingData[],
};

export type TechradarVizOptions = {
  radarSize?: number,
  blipRadius?: number,
};

export type TechradarOptions = {
  ...TechradarVizOptions,
  blipTooltipEnabled?: boolean,
};

export type TechradarAreaVizData = {
  sliceIndex: number,
  ringIndex: number,
  path: string,
};

export type TechradarBlipVizData = {
  ...TechradarBlipData,
  sliceIndex: number,
  ringIndex: number,
  x: number,
  y: number,
};

export type TechradarSliceVizData = {
  name: string,
  color: string,
  textColor: string,
};

export type TechradarRingVizData = {
  ...TechradarRingData,
  color: string,
};

export type TechradarVizData = {
  global: {
    radarSize: number,
    blipRadius: number,
  },
  areas: TechradarAreaVizData[],
  blips: TechradarBlipVizData[],
  slices: TechradarSliceVizData[],
  rings: TechradarRingVizData[],
};
