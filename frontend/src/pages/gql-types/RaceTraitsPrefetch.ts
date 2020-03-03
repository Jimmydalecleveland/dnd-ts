/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RaceTraitsPrefetch
// ====================================================

export interface RaceTraitsPrefetch_raceTraits {
  __typename: "RaceTrait";
  ID: string;
  name: string;
  description: string;
}

export interface RaceTraitsPrefetch {
  raceTraits: (RaceTraitsPrefetch_raceTraits | null)[];
}

export interface RaceTraitsPrefetchVariables {
  raceID: string;
}
