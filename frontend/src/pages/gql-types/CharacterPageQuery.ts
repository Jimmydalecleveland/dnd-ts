/* tslint:disable */
/* eslint-disable */
// @generated
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

export interface CharacterPageQuery_character_charClass_features {
  __typename: "CharClassFeature";
  ID: string;
  name: string;
  description: string;
  classLevel: number;
}

export interface CharacterPageQuery_character_charClass_levelSpecifics {
  __typename: "LevelSpecific";
  classLevel: number;
  proficiencyBonus: number;
}

export interface CharacterPageQuery_character_charClass {
  __typename: "CharacterClass";
  ID: string;
  level: number;
  name: string;
  numSkillProficiencies: number;
  savingThrowProficiencies: string[];
  hitDice: string;
  features: (CharacterPageQuery_character_charClass_features | null)[];
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
  __typename: "QuantifiedWeapon";
  ID: string;
  name: string;
  type: string;
  cost: string;
  weight: string | null;
  damage: string;
  skillType: string;
  rangeType: string;
  quantity: number;
}

export interface CharacterPageQuery_character_armor {
  __typename: "QuantifiedArmor";
  ID: string;
  name: string;
  type: string;
  category: string;
  ac: number;
  isDexAdded: boolean;
  maxDex: number | null;
  cost: string;
  weight: string | null;
  quantity: number;
}

export interface CharacterPageQuery_character_customItems {
  __typename: "QuantifiedCustomItem";
  ID: string;
  type: string;
  name: string;
  quantity: number;
}

export interface CharacterPageQuery_character_adventuringGear {
  __typename: "QuantifiedAdventuringGear";
  ID: string;
  name: string;
  type: string;
  cost: string | null;
  weight: string | null;
  category: string | null;
  categoryDescription: string | null;
  quantity: number;
}

export interface CharacterPageQuery_character_tools {
  __typename: "QuantifiedTool";
  ID: string;
  name: string;
  type: string;
  cost: string | null;
  weight: string | null;
  category: string | null;
  description: string | null;
  quantity: number;
}

export interface CharacterPageQuery_character {
  __typename: "Character";
  ID: string;
  name: string;
  maxHP: number;
  HP: number;
  cp: number | null;
  sp: number | null;
  gp: number | null;
  ep: number | null;
  pp: number | null;
  abilityScores: CharacterPageQuery_character_abilityScores;
  race: CharacterPageQuery_character_race;
  subrace: CharacterPageQuery_character_subrace | null;
  charClass: CharacterPageQuery_character_charClass;
  background: CharacterPageQuery_character_background;
  skills: (CharacterPageQuery_character_skills | null)[];
  weapons: (CharacterPageQuery_character_weapons | null)[];
  armor: (CharacterPageQuery_character_armor | null)[] | null;
  customItems: (CharacterPageQuery_character_customItems | null)[] | null;
  adventuringGear: (CharacterPageQuery_character_adventuringGear | null)[] | null;
  tools: (CharacterPageQuery_character_tools | null)[] | null;
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
