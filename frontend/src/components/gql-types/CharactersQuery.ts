/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharactersQuery
// ====================================================

export interface CharactersQuery_characters {
  __typename: "Character";
  ID: string;
  name: string;
}

export interface CharactersQuery {
  characters: (CharactersQuery_characters | null)[];
}
