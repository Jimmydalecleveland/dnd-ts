/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharClassGearPack
// ====================================================

export interface CharClassGearPack_gearPack_items_GearPackCustomItem {
  __typename: "GearPackCustomItem";
  ID: string;
  name: string;
  type: string;
  quantity: number;
}

export interface CharClassGearPack_gearPack_items_GearPackAdventuringGear {
  __typename: "GearPackAdventuringGear";
  ID: string;
  name: string;
  description: string | null;
  quantity: number;
}

export interface CharClassGearPack_gearPack_items_GearPackTool {
  __typename: "GearPackTool";
  ID: string;
  name: string;
  cost: string | null;
  category: string | null;
  description: string | null;
  quantity: number;
}

export type CharClassGearPack_gearPack_items = CharClassGearPack_gearPack_items_GearPackCustomItem | CharClassGearPack_gearPack_items_GearPackAdventuringGear | CharClassGearPack_gearPack_items_GearPackTool;

export interface CharClassGearPack_gearPack {
  __typename: "GearPack";
  name: string;
  items: (CharClassGearPack_gearPack_items | null)[];
}

export interface CharClassGearPack {
  gearPack: CharClassGearPack_gearPack | null;
}

export interface CharClassGearPackVariables {
  ID: string;
}
