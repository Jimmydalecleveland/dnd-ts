import { ISkillAPI } from '../datasources/skill'
import { IBackgroundAPI } from '../datasources/background'
import { ICharacterAPI } from '../datasources/character'
import { ICharClassAPI } from '../datasources/charClass'
import { IRaceAPI } from '../datasources/race'
import { IItemAPI } from '../datasources/item'
import { ISpellAPI } from '../datasources/spell'

export interface ICreateCharacter {
  name: string
  raceID: string
  subraceID?: string
  charClassID: string
  backgroundID: string
  abilityScores: IAbilityScores
  skills: string[]
  weapons: Array<{
    ID: string
    quantity: number
  }>
  gear: Array<{
    ID: string
    quantity: number
  }>
}

export interface ICharClass {
  ID: string
  name: string
}

export interface ILevelSpecific {
  classID: string
  classLevel: number
}

export interface ICharacter {
  ID: string
  name: string
}

export interface IRace {
  ID: string
  name: string
  parentRaceID: number | null
}

export interface IBackground {
  ID: string
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

export interface IDataSources {
  backgroundAPI: IBackgroundAPI
  charClassAPI: ICharClassAPI
  characterAPI: ICharacterAPI
  raceAPI: IRaceAPI
  spellAPI: ISpellAPI
  skillAPI: ISkillAPI
  itemAPI: IItemAPI
}
