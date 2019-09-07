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

export interface ICharClass {
  ID: string
  name: string
}

export interface ICharacter {
  ID: string
  name: string
  race: IRace
  subrace: ISubrace
  charClass: ICharClass
}
