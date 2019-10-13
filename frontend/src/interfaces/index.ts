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
  features: IBackgroundFeature[]
}

export interface IBackgroundFeature {
  ID: string
  name: string
  description: string
}

export interface ICharClass {
  ID: string
  name: string
  features: ICharClassFeature[]
}

export interface ICharClassFeature {
  ID: string
  name: string
  description: string
  level: string
}

export interface IAbilityScores {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
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
