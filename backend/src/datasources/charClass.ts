import { DataSource } from 'apollo-datasource'
import db from '../db'

export interface ICharClassAPI extends DataSource {
  context: any
  getAll(): Promise<object[]>
  getByID({ ID }: { ID: string }): Promise<object>
  getFeatures({ ID }: { ID: string }): Promise<object[]>
  getSkills({ ID }: { ID: string }): Promise<object[]>
}

class CharClassAPI implements ICharClassAPI {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getAll() {
    return db
      .query('SELECT * FROM "CharClass"')
      .then((response) => response.rows)
  }

  public getByID({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "CharClass" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
  }

  public getFeatures({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT "ClassLevelFeature".*, "ClassLevel"."classLevel" AS "level" FROM "ClassLevel"
        INNER JOIN "ClassLevelFeature" ON "ClassLevel"."ID" = "ClassLevelFeature"."classLevelID"
        WHERE "classID" = $1
        ORDER BY "level" ASC
        `,
        [Number(ID)]
      )
      .then((response) => response.rows)
  }

  public getSkills({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT * FROM "Skill" 
        INNER JOIN "ClassSkillProficiency" ON "ClassSkillProficiency"."skillID" = "Skill"."ID" 
        WHERE "ClassSkillProficiency"."classID" = $1
        `,
        [Number(ID)]
      )
      .then((response) => response.rows)
  }
}

export default CharClassAPI
