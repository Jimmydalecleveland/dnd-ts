/* tslint:disable */
/* eslint-disable */
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
