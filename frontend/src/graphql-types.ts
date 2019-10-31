

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
// GraphQL query operation: CharacterQuery
// ====================================================

export interface CharacterQuery_character_race {
  __typename: "Race";
  ID: string;
  name: string;
}

export interface CharacterQuery_character_subrace {
  __typename: "Subrace";
  ID: string;
  name: string;
}

export interface CharacterQuery_character {
  __typename: "Character";
  ID: string;
  name: string;
  race: CharacterQuery_character_race;
  subrace: CharacterQuery_character_subrace | null;
}

export interface CharacterQuery {
  character: CharacterQuery_character | null;
}

export interface CharacterQueryVariables {
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
// GraphQL query operation: CharClasses
// ====================================================

export interface CharClasses_charClasses {
  __typename: "CharClass";
  ID: string;
  name: string;
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
// GraphQL mutation operation: SubmitCharacter
// ====================================================

export interface SubmitCharacter_createCharacter_charClass {
  __typename: "CharClass";
  ID: string;
  name: string;
}

export interface SubmitCharacter_createCharacter_background {
  __typename: "Background";
  ID: string;
  name: string;
}

export interface SubmitCharacter_createCharacter {
  __typename: "Character";
  ID: string;
  name: string;
  charClass: SubmitCharacter_createCharacter_charClass;
  background: SubmitCharacter_createCharacter_background;
}

export interface SubmitCharacter {
  createCharacter: SubmitCharacter_createCharacter;
}

export interface SubmitCharacterVariables {
  name: string;
  raceID: string;
  subraceID?: string | null;
  charClassID: string;
  backgroundID: string;
  abilityScores?: AbilityScoresInput | null;
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

//==============================================================
// END Enums and Input Objects
//==============================================================