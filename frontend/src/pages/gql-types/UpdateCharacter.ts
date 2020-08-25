/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeathsavesInput } from "./../../../gql-types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCharacter
// ====================================================

export interface UpdateCharacter {
  updateCharacter: number | null;
}

export interface UpdateCharacterVariables {
  ID: string;
  deathsaves?: DeathsavesInput | null;
}
