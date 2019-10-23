import { DataSource } from 'apollo-datasource'
import db from '../db'
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
        `
        INSERT INTO "Character" ("name", "raceID", "subraceID", "charClassID", "backgroundID") 
        VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
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
    return db
      .query(
        `
        SELECT "Race".* FROM "Character"
        INNER JOIN "Race" ON "Race"."ID" = "Character"."raceID"
        WHERE "Character"."ID" = $1
        `,
        [Number(ID)]
      )
      .then((response) => response.rows[0])
  }

  public getCharacterSubrace({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT "Race".* FROM "Character"
        INNER JOIN "Race" ON "Race"."ID" = "Character"."subraceID"
        WHERE "Character"."ID" = $1
        `,
        [Number(ID)]
      )
      .then((response) => response.rows[0])
  }

  public getCharClass({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT "CharClass".* FROM "Character"
        INNER JOIN "CharClass" ON "CharClass"."ID" = "Character"."charClassID"
        WHERE "Character"."ID" = $1
        `,
        [Number(ID)]
      )
      .then((response) => response.rows[0])
  }

  public getCharacterBackground({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT "Background".* FROM "Character"
        INNER JOIN "Background" ON "Background"."ID" = "Character"."backgroundID"
        WHERE "Character"."ID" = $1
        `,
        ['woof']
      )
      .then((response) => response.rows[0])
  }
}

export default CharacterAPI
