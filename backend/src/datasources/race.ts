import { DataSource } from 'apollo-datasource'
import logger from '../logger'
import db from '../db'

export interface IRaceAPI extends DataSource {
  context: any
  getAll(): Promise<object[]>
  getByID({ ID }: { ID: string }): Promise<object>
  getSubraces({ ID }: { ID: string }): Promise<object[]>
  getTraits({ ID }: { ID: string }): Promise<object[]>
  getSkills({ ID }: { ID: string }): Promise<object[]>
}

class RaceAPI implements IRaceAPI {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getAll() {
    return db
      .query('SELECT * FROM "Race" WHERE "parentRaceID" IS NULL')
      .then((response) => response.rows)
  }

  public getByID({ ID }: { ID: string }) {
    logger.info('getRace request sent:', { ID })
    return db
      .query('SELECT * FROM "Race" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
      .catch((error) => {
        logger.error(`getRace request returned an error: ${error.message}`)
      })
  }

  public getSubraces({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "Race" WHERE "parentRaceID" = $1', [Number(ID)])
      .then((response) => response.rows)
  }

  public getTraits({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "RaceTrait" WHERE "raceID" = $1', [Number(ID)])
      .then((response) => response.rows)
  }

  public getSkills({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT * FROM "Skill" 
        INNER JOIN "RaceSkillProficiency" ON "RaceSkillProficiency"."skillID" = "Skill"."ID" 
        WHERE "RaceSkillProficiency"."raceID" = $1
        `,
        [Number(ID)]
      )
      .then((response) => response.rows)
  }
}

export default RaceAPI
