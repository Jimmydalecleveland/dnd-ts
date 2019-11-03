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
      .then((response) => {
        const { str, dex, con, int, wis, cha, ...rest } = response.rows[0]
        return { abilityScores: { str, dex, con, int, wis, cha }, ...rest }
      })
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
    abilityScores,
  }: ICreateCharacter) {
    const { str, dex, con, wis, int, cha } = abilityScores
    return db
      .query(
        `
        INSERT INTO "Character" ("name", "raceID", "subraceID", "charClassID", "backgroundID", str, dex, con, wis, int, cha) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *
        `,
        [
          name,
          Number(raceID),
          Number(subraceID) || null,
          Number(charClassID),
          Number(backgroundID),
          str,
          dex,
          con,
          wis,
          int,
          cha,
        ]
      )
      .then((response) => response.rows[0])
  }

  public deleteCharacter({ ID }: { ID: string }) {
    return db
      .query('DELETE FROM "Character" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rowCount)
  }

  public getCharacterRace({ characterID }: { characterID: string }) {
    return db
      .query(
        `
        SELECT "Race".* FROM "Character"
        INNER JOIN "Race" ON "Race"."ID" = "Character"."raceID"
        WHERE "Character"."ID" = $1
        `,
        [Number(characterID)]
      )
      .then((response) => response.rows[0])
  }

  public getCharacterSubrace({ characterID }: { characterID: string }) {
    return db
      .query(
        `
        SELECT "Race".* FROM "Character"
        INNER JOIN "Race" ON "Race"."ID" = "Character"."subraceID"
        WHERE "Character"."ID" = $1
        `,
        [Number(characterID)]
      )
      .then((response) => response.rows[0])
  }

  public getCharClass({ characterID }: { characterID: string }) {
    return db
      .query(
        `
        SELECT "CharClass".* FROM "Character"
        INNER JOIN "CharClass" ON "CharClass"."ID" = "Character"."charClassID"
        WHERE "Character"."ID" = $1
        `,
        [Number(characterID)]
      )
      .then((response) => response.rows[0])
  }

  public getCharacterBackground({ characterID }: { characterID: string }) {
    return db
      .query(
        `
        SELECT "Background".* FROM "Character"
        INNER JOIN "Background" ON "Background"."ID" = "Character"."backgroundID"
        WHERE "Character"."ID" = $1
        `,
        [Number(characterID)]
      )
      .then((response) => response.rows[0])
  }
}

export default CharacterAPI
