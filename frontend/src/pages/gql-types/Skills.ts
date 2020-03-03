/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Skills
// ====================================================

export interface Skills_skills {
  __typename: "Skill";
  ID: string;
  name: string;
  ability: string;
}

export interface Skills_charClass_skills {
  __typename: "Skill";
  ID: string;
  name: string;
}

export interface Skills_charClass {
  __typename: "CharClass";
  skills: (Skills_charClass_skills | null)[] | null;
}

export interface Skills_race_skills {
  __typename: "Skill";
  ID: string;
  name: string;
}

export interface Skills_race {
  __typename: "Race";
  skills: (Skills_race_skills | null)[] | null;
}

export interface Skills_background_skills {
  __typename: "Skill";
  ID: string;
  name: string;
}

export interface Skills_background {
  __typename: "Background";
  skills: (Skills_background_skills | null)[] | null;
}

export interface Skills {
  skills: (Skills_skills | null)[];
  charClass: Skills_charClass | null;
  race: Skills_race | null;
  background: Skills_background | null;
}

export interface SkillsVariables {
  charClassID: string;
  raceID: string;
  backgroundID: string;
}
