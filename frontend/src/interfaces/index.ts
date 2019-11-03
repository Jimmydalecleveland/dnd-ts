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
  [key: string]: number
}

export interface ICharacter {
  ID: string
  name: string
  race: IRace
  subrace: ISubrace
  charClass: ICharClass
  background: IBackground
  abilityScores: IAbilityScores
}
