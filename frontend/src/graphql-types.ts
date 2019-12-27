

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BackgroundFeatures
// ====================================================

export interface BackgroundFeatures_background_features {
  __typename: "BackgroundFeature";
  ID: string;
  name: string;
  description: string;
}

export interface BackgroundFeatures_background {
  __typename: "Background";
  features: (BackgroundFeatures_background_features | null)[];
}

export interface BackgroundFeatures {
  background: BackgroundFeatures_background | null;
}

export interface BackgroundFeaturesVariables {
  backgroundID: string;
}


/* tslint:disable */
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


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharClassFeatures
// ====================================================

export interface CharClassFeatures_charClass_features {
  __typename: "CharClassFeature";
  ID: string;
  name: string;
  description: string;
  level: number;
}

export interface CharClassFeatures_charClass {
  __typename: "CharClass";
  features: (CharClassFeatures_charClass_features | null)[];
}

export interface CharClassFeatures {
  charClass: CharClassFeatures_charClass | null;
}

export interface CharClassFeaturesVariables {
  charClassID: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RaceTraits
// ====================================================

export interface RaceTraits_raceTraits {
  __typename: "RaceTrait";
  ID: string;
  name: string;
  description: string;
}

export interface RaceTraits {
  raceTraits: (RaceTraits_raceTraits | null)[];
}

export interface RaceTraitsVariables {
  raceID: string;
}


/* tslint:disable */
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


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Backgrounds
// ====================================================

export interface Backgrounds_backgrounds {
  __typename: "Background";
  ID: string;
  name: string;
}

export interface Backgrounds {
  backgrounds: (Backgrounds_backgrounds | null)[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BackgroundFeaturesPrefetch
// ====================================================

export interface BackgroundFeaturesPrefetch_background_features {
  __typename: "BackgroundFeature";
  ID: string;
  name: string;
  description: string;
}

export interface BackgroundFeaturesPrefetch_background {
  __typename: "Background";
  features: (BackgroundFeaturesPrefetch_background_features | null)[];
}

export interface BackgroundFeaturesPrefetch {
  background: BackgroundFeaturesPrefetch_background | null;
}

export interface BackgroundFeaturesPrefetchVariables {
  backgroundID: string;
}


/* tslint:disable */
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

export interface CharacterPageQuery_character_race {
  __typename: "Race";
  ID: string;
  name: string;
}

export interface CharacterPageQuery_character_subrace {
  __typename: "Subrace";
  ID: string;
  name: string;
}

export interface CharacterPageQuery_character_charClass {
  __typename: "CharClass";
  ID: string;
  name: string;
}

export interface CharacterPageQuery_character_background {
  __typename: "Background";
  ID: string;
  name: string;
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


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCharacter
// ====================================================

export interface DeleteCharacter {
  deleteCharacter: number | null;
}

export interface DeleteCharacterVariables {
  ID: string;
}


/* tslint:disable */
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


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharClassFeaturesPrefetch
// ====================================================

export interface CharClassFeaturesPrefetch_charClass_features {
  __typename: "CharClassFeature";
  ID: string;
  name: string;
  description: string;
  level: number;
}

export interface CharClassFeaturesPrefetch_charClass {
  __typename: "CharClass";
  features: (CharClassFeaturesPrefetch_charClass_features | null)[];
}

export interface CharClassFeaturesPrefetch {
  charClass: CharClassFeaturesPrefetch_charClass | null;
}

export interface CharClassFeaturesPrefetchVariables {
  charClassID: string;
}


/* tslint:disable */
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


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RaceTraitsPrefetch
// ====================================================

export interface RaceTraitsPrefetch_raceTraits {
  __typename: "RaceTrait";
  ID: string;
  name: string;
  description: string;
}

export interface RaceTraitsPrefetch {
  raceTraits: (RaceTraitsPrefetch_raceTraits | null)[];
}

export interface RaceTraitsPrefetchVariables {
  raceID: string;
}


/* tslint:disable */
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


/* tslint:disable */
// This file was automatically generated and should not be edited.

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

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// 
export interface AbilityScoresInput {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

// 
export interface WeaponInput {
  ID: string;
  quantity?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================