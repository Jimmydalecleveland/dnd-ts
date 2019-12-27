/* tslint:disable */
/* eslint-disable */
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
