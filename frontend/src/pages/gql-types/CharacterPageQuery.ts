/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharacterPageQuery
// ====================================================

export interface CharacterPageQuery_character_abilityScores {
  __typename: "AbilityScores";
  str: number;
  dex: number;
  wis: number;
  cha: number;
  int: number;
  con: number;
}

export interface CharacterPageQuery_character_race_skills {
  __typename: "Skill";
  ID: string;
  name: string;
  ability: string;
}

export interface CharacterPageQuery_character_race {
  __typename: "Race";
  ID: string;
  name: string;
  speed: number;
  skills: (CharacterPageQuery_character_race_skills | null)[] | null;
}

export interface CharacterPageQuery_character_subrace {
  __typename: "Subrace";
  ID: string;
  name: string;
  speed: number;
}

export interface CharacterPageQuery_character_charClass_levelSpecifics {
  __typename: "LevelSpecific";
  classLevel: number;
  proficiencyBonus: number;
}

export interface CharacterPageQuery_character_charClass {
  __typename: "CharClass";
  ID: string;
  name: string;
  numSkillProficiencies: number;
  hitDice: string | null;
  levelSpecifics: (CharacterPageQuery_character_charClass_levelSpecifics | null)[];
}

export interface CharacterPageQuery_character_background_skills {
  __typename: "Skill";
  ID: string;
  name: string;
  ability: string;
}

export interface CharacterPageQuery_character_background {
  __typename: "Background";
  ID: string;
  name: string;
  skills: (CharacterPageQuery_character_background_skills | null)[] | null;
}

export interface CharacterPageQuery_character_skills {
  __typename: "Skill";
  ID: string;
  name: string;
  ability: string;
}

export interface CharacterPageQuery_character_weapons {
  __typename: "CharWeapon";
  ID: string;
  name: string;
  damage: string;
  skillType: string;
  quantity: number;
}

export interface CharacterPageQuery_character {
  __typename: "Character";
  ID: string;
  name: string;
  abilityScores: CharacterPageQuery_character_abilityScores;
  race: CharacterPageQuery_character_race;
  subrace: CharacterPageQuery_character_subrace | null;
  charClass: CharacterPageQuery_character_charClass;
  background: CharacterPageQuery_character_background;
  skills: (CharacterPageQuery_character_skills | null)[];
  weapons: (CharacterPageQuery_character_weapons | null)[];
}

export interface CharacterPageQuery_skills {
  __typename: "Skill";
  ID: string;
  name: string;
  ability: string;
}

export interface CharacterPageQuery {
  character: CharacterPageQuery_character | null;
  skills: (CharacterPageQuery_skills | null)[];
}

export interface CharacterPageQueryVariables {
  ID: string;
}
