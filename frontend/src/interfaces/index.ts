export interface IRace {
  ID: string
  name: string
  subraces?: ISubrace[]
}

export interface ISubrace {
  ID: string
  name: string
}

export interface IRaceTrait {
  ID: string
  name: string
  description: string
}

export interface IBackground {
  ID: string
  name: string
}

export interface IBackgroundFeature {
  ID: string
  name: string
  description: string
}

export interface ICharClass {
  ID: string
  name: string
  numSkillProficiencies: number
}

export interface ICharClassFeature {
  ID: string
  name: string
  description: string
  level: string
}

export interface IAbilityScores {
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
}

export interface ISkill {
  ID: string
  name: string
  ability: string
}

export interface IEquipment {
  tableName: string
  ID?: string
  text: string
  quantity: number
}

export interface ICharacter {
  ID?: string
  name?: string
  race?: IRace
  subrace?: ISubrace
  charClass?: ICharClass
  background?: IBackground
  abilityScores?: IAbilityScores
  skills?: string[]
  startingEquipment?: Array<{
    ID: string
    quantity: number
  }>
}
