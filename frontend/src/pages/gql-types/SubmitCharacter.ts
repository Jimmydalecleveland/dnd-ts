/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AbilityScoresInput, WeaponInput } from "./../../../gql-types/globalTypes";

// ====================================================
// GraphQL mutation operation: SubmitCharacter
// ====================================================

export interface SubmitCharacter {
  createCharacter: string;
}

export interface SubmitCharacterVariables {
  name: string;
  raceID: string;
  subraceID?: string | null;
  charClassID: string;
  backgroundID: string;
  abilityScores: AbilityScoresInput;
  skills: (string | null)[];
  weapons: (WeaponInput | null)[];
}
