import { DataSource } from 'apollo-datasource'
import knex from '../db'

class CharacterAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getCharacter({ ID }: { ID: string }) {
    return knex('Character')
      .select()
      .where('ID', Number(ID))
      .first()
  }

  public getCharacters() {
    return knex('Character').select()
  }

  public createCharacter({
    name,
    raceID,
    subraceID,
    charClassID,
    backgroundID,
  }: {
    name: string
    raceID: string
    subraceID: string
    charClassID: string
    backgroundID: string
  }) {
    return knex('Character')
      .insert({
        name,
        raceID: Number(raceID),
        subraceID: Number(subraceID) || null,
        classID: Number(charClassID),
        backgroundID: Number(backgroundID),
      })
      .returning('*')
      .then((data: any) => data[0])
  }

  public deleteCharacter({ ID }: { ID: string }) {
    return knex('Character')
      .where('ID', Number(ID))
      .del()
  }

  public getCharacterRace({ ID }: { ID: string }) {
    return knex('Character')
      .select('Race.*')
      .innerJoin('Race', 'Race.ID', 'Character.raceID')
      .where('Character.ID', Number(ID))
      .first()
  }

  public getCharacterSubrace({ ID }: { ID: string }) {
    return knex('Character')
      .select('Race.*')
      .innerJoin('Race', 'Race.ID', 'Character.subraceID')
      .where('Character.ID', Number(ID))
      .first()
  }

  public getCharClass({ ID }: { ID: string }) {
    return knex('Character')
      .select('CharClass.*')
      .innerJoin('CharClass', 'CharClass.ID', 'Character.classID')
      .where('Character.ID', Number(ID))
      .first()
  }

  public getCharacterBackground({ ID }: { ID: string }) {
    return knex('Character')
      .select('Background.*')
      .innerJoin('Background', 'Background.ID', 'Character.backgroundID')
      .where('Character.ID', Number(ID))
      .first()
  }
}

export default CharacterAPI
