/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharClasses
// ====================================================

export interface CharClasses_charClasses {
  __typename: "CharClass";
  ID: string;
  name: string;
  numSkillProficiencies: number;
}

export interface CharClasses {
  charClasses: (CharClasses_charClasses | null)[];
}
