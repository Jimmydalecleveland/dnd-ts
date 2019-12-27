/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Races
// ====================================================

export interface Races_races_subraces {
  __typename: "Subrace";
  ID: string;
  name: string;
}

export interface Races_races {
  __typename: "Race";
  ID: string;
  name: string;
  subraces: (Races_races_subraces | null)[] | null;
}

export interface Races {
  races: (Races_races | null)[];
}
