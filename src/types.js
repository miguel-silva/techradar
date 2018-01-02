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

export type TechradarOptions = {
  radarSize?: number,
  blipRadius?: number,
};

export type TechradarAreaViewData = {
  sliceIndex: number,
  ringIndex: number,
  path: string,
};

export type TechradarBlipViewData = {
  ...TechradarBlipData,
  sliceIndex: number,
  ringIndex: number,
  x: number,
  y: number,
};

export type TechradarSliceViewData = {
  name: string,
  color: string,
  textColor: string,
};

export type TechradarRingViewData = {
  ...TechradarRingData,
  color: string,
};

export type TechradarViewData = {
  global: {
    radarSize: number,
    blipRadius: number,
  },
  areas: TechradarAreaViewData[],
  blips: TechradarBlipViewData[],
  slices: TechradarSliceViewData[],
  rings: TechradarRingViewData[],
};
