/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RaceTraits
// ====================================================

export interface RaceTraits_raceTraits {
  __typename: "RaceTrait";
  ID: string;
  name: string;
  description: string;
}

export interface RaceTraits {
  raceTraits: (RaceTraits_raceTraits | null)[];
}

export interface RaceTraitsVariables {
  raceID: string;
}
