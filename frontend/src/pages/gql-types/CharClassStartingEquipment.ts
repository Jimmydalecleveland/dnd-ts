/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharClassStartingEquipment
// ====================================================

export interface CharClassStartingEquipment_charClass_startingEquipment_CharArmor {
  __typename: "CharArmor";
}

export interface CharClassStartingEquipment_charClass_startingEquipment_CharWeapon {
  __typename: "CharWeapon";
  name: string;
  quantity: number;
}

export interface CharClassStartingEquipment_charClass_startingEquipment_GearPack {
  __typename: "GearPack";
  name: string;
  quantity: number;
}

export type CharClassStartingEquipment_charClass_startingEquipment = CharClassStartingEquipment_charClass_startingEquipment_CharArmor | CharClassStartingEquipment_charClass_startingEquipment_CharWeapon | CharClassStartingEquipment_charClass_startingEquipment_GearPack;

export interface CharClassStartingEquipment_charClass {
  __typename: "CharClass";
  startingEquipment: (CharClassStartingEquipment_charClass_startingEquipment | null)[] | null;
}

export interface CharClassStartingEquipment {
  charClass: CharClassStartingEquipment_charClass | null;
}

export interface CharClassStartingEquipmentVariables {
  ID: string;
}
