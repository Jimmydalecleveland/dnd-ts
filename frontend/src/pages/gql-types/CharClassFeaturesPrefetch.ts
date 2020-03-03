/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharClassFeaturesPrefetch
// ====================================================

export interface CharClassFeaturesPrefetch_charClass_features {
  __typename: "CharClassFeature";
  ID: string;
  name: string;
  description: string;
  classLevel: number;
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
