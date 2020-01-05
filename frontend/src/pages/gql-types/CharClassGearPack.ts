/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharClassGearPack
// ====================================================

export interface CharClassGearPack_gearPack_items_CustomItem {
  __typename: "CustomItem";
  ID: string;
  name: string;
  type: string;
}

export interface CharClassGearPack_gearPack_items_AdventuringGear {
  __typename: "AdventuringGear";
  ID: string;
  name: string;
  description: string | null;
}

export interface CharClassGearPack_gearPack_items_Tool {
  __typename: "Tool";
  ID: string;
  name: string;
  cost: string | null;
  category: string | null;
  description: string | null;
}

export type CharClassGearPack_gearPack_items = CharClassGearPack_gearPack_items_CustomItem | CharClassGearPack_gearPack_items_AdventuringGear | CharClassGearPack_gearPack_items_Tool;

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
