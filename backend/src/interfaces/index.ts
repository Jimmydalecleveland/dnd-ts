export interface ICreateCharacter {
  name: string
  raceID: string
  subraceID?: string
  charClassID: string
  backgroundID: string
  abilityScores: IAbilityScores
}

export interface ICharClass {
  ID: number
  name: string
}

export interface ICharacter {
  ID: number
  name: string
}

export interface IRace {
  ID: number
  name: string
  parentRaceID: number | null
}

export interface IBackground {
  ID: number
  name: string
}

export interface IAbilityScores {
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
}
