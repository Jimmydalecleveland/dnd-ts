import { DataSource } from 'apollo-datasource'
import { ISkillAPI } from '../datasources/skill'
import { IBackgroundAPI } from '../datasources/background'
import { ICharacterAPI } from '../datasources/character'
import { ICharClassAPI } from '../datasources/charClass'
import { IRaceAPI } from '../datasources/race'
import { IEquipmentAPI } from '../datasources/equipment'
import { ISpellAPI } from '../datasources/spell'

export interface ICreateCharacter {
  name: string
  raceID: string
  subraceID?: string
  charClassID: string
  backgroundID: string
  abilityScores: IAbilityScores
}

export interface ICharClass {
  ID: string
  name: string
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
  equipmentAPI: IEquipmentAPI
}
