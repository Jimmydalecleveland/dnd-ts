/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allWeaponsFiltered
// ====================================================

export interface allWeaponsFiltered_weapons {
  __typename: "Weapon";
  ID: string;
  name: string;
}

export interface allWeaponsFiltered {
  weapons: (allWeaponsFiltered_weapons | null)[];
}

export interface allWeaponsFilteredVariables {
  skillType?: string | null;
  rangeType?: string | null;
}
