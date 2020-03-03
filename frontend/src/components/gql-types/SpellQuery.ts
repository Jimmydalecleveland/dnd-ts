/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SpellQuery
// ====================================================

export interface SpellQuery_spell {
  __typename: "Spell";
  ID: string;
  name: string;
}

export interface SpellQuery {
  spell: SpellQuery_spell | null;
}

export interface SpellQueryVariables {
  ID: string;
}
