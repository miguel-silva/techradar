// @flow

type TechradarRing = {
  id: string,
  name: string,
};

type TechradarBlip = {
  name: string,
  description?: string,
  url?: string,
};

type TechradarSlice = {
  name: string,
  blipsByRing: {
    [ringId: string]: TechradarBlip[],
  },
};

export type TechradarData = {
  slices: TechradarSlice[],
  rings: TechradarRing[],
};

export type TechradarOptions = {
  radarSize?: number,
  blipRadius?: number,
};
