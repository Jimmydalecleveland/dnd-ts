import { DataSource } from 'apollo-datasource'
import db from '../db'

export interface IBackgroundAPI extends DataSource {
  context: any
  getAll(): Promise<object[]>
  getByID({ ID }: { ID: string }): Promise<object>
  getFeatures({ ID }: { ID: string }): Promise<object[]>
  getSkills({ ID }: { ID: string }): Promise<object[]>
}

class BackgroundAPI implements IBackgroundAPI {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getAll() {
    return db
      .query('SELECT * FROM "Background"')
      .then((response) => response.rows)
  }

  public getByID({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "Background" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
  }

  public getFeatures({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "BackgroundFeature" WHERE "backgroundID" = $1', [
        Number(ID),
      ])
      .then((response) => response.rows)
  }

  public getSkills({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT * FROM "Skill" 
        INNER JOIN "BackgroundSkillProficiency" ON "BackgroundSkillProficiency"."skillID" = "Skill"."ID" 
        WHERE "BackgroundSkillProficiency"."backgroundID" = $1
        `,
        [Number(ID)]
      )
      .then((response) => response.rows)
  }
}

export default BackgroundAPI
