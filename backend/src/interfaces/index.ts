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
  items: Array<{
    ID: string
    quantity: number
  }>
  maxHP: number
  HP: number
  startingGp: number
}

export interface IUpdateCharacter {
  ID: string
  deathsaveSuccesses?: number
  deathsaveFailures?: number
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

export interface ICharacterRow {
  ID: number,
  name: string,
  charClassID: number,
  raceID: number,
  maxHP: number,
  str: number,
  dex: number,
  con: number,
  int: number,
  wis: number,
  cha: number,
  HP: number,
  gp?: number,
  sp?: number,
  cp?: number,
  userID?: number,
  backgroundID?: number,
  specID?: number,
  subraceID?: number,
  ep?: number,
  pp?: number,
  tempHP?: number,
  deathSaveSuccesses?: number,
  deathSaveFailures?: number
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
