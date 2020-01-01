/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharClassStartingEquipment
// ====================================================

export interface CharClassStartingEquipment_charClass_startingEquipment {
  __typename: "CharWeapon";
  name: string;
  quantity: number;
}

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
