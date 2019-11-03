import { DataSource } from 'apollo-datasource'
import db from '../db'

class RaceAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getRaces() {
    return db
      .query('SELECT * FROM "Race" WHERE "parentRaceID" IS NULL')
      .then((response) => response.rows)
  }

  public getRace({ raceID }: { raceID: string }) {
    return db
      .query('SELECT * FROM "Race" WHERE "ID" = $1', [Number(raceID)])
      .then((response) => response.rows[0])
  }

  public getSubraces({ raceID }: { raceID: string }) {
    return db
      .query('SELECT * FROM "Race" WHERE "parentRaceID" = $1', [Number(raceID)])
      .then((response) => response.rows)
  }

  public getRaceTraits({ raceID }: { raceID: string }) {
    return db
      .query('SELECT * FROM "RaceTrait" WHERE "raceID" = $1', [Number(raceID)])
      .then((response) => response.rows)
  }

  public getSkills({ raceID }: { raceID: string }) {
    return db
      .query(
        `
        SELECT * FROM "Skill" 
        INNER JOIN "RaceSkillProficiency" ON "RaceSkillProficiency"."skillID" = "Skill"."ID" 
        WHERE "RaceSkillProficiency"."raceID" = $1
        `,
        [Number(raceID)]
      )
      .then((response) => response.rows)
  }
}

export default RaceAPI
