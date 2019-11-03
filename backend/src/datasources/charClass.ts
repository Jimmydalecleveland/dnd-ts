import { DataSource } from 'apollo-datasource'
import db from '../db'

class CharClassAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getCharClass({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "CharClass" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
  }

  public getCharClasses() {
    return db
      .query('SELECT * FROM "CharClass"')
      .then((response) => response.rows)
  }

  public getFeatures({ classID }: { classID: string }) {
    return db
      .query(
        `
        SELECT "ClassLevelFeature".*, "ClassLevel"."classLevel" AS "level" FROM "ClassLevel"
        INNER JOIN "ClassLevelFeature" ON "ClassLevel"."ID" = "ClassLevelFeature"."classLevelID"
        WHERE "classID" = $1
        ORDER BY "level" ASC
        `,
        [Number(classID)]
      )
      .then((response) => response.rows)
  }

  public getSkills({ classID }: { classID: string }) {
    return db
      .query(
        `
        SELECT * FROM "Skill" 
        INNER JOIN "ClassSkillProficiency" ON "ClassSkillProficiency"."skillID" = "Skill"."ID" 
        WHERE "ClassSkillProficiency"."classID" = $1
        `,
        [Number(classID)]
      )
      .then((response) => response.rows)
  }
}

export default CharClassAPI
