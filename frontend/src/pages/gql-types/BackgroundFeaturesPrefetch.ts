/* tslint:disable */
/* eslint-disable */
// @generated
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
