import { DataSource } from 'apollo-datasource'
import knex from '../db'
import db from '../pg'
import { ICreateCharacter } from '../interfaces'

class CharacterAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getCharacter({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "Character" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
  }

  public getCharacters() {
    return db
      .query('SELECT * FROM "Character"')
      .then((response) => response.rows)
  }

  public createCharacter({
    name,
    raceID,
    subraceID,
    charClassID,
    backgroundID,
  }: ICreateCharacter) {
    return db
      .query(
        `INSERT INTO "Character" ("name", "raceID", "subraceID", "charClassID", "backgroundID") 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          name,
          Number(raceID),
          Number(subraceID) || null,
          Number(charClassID),
          Number(backgroundID),
        ]
      )
      .then((response) => response.rows[0])
  }

  public deleteCharacter({ ID }: { ID: string }) {
    return db
      .query('DELETE FROM "Character" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rowCount)
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
      .innerJoin('CharClass', 'CharClass.ID', 'Character.charClassID')
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
