export interface ICreateCharacter {
  name: string
  raceID: string
  subraceID?: string
  charClassID: string
  backgroundID: string
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
