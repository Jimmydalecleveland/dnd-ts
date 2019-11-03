import { DataSource } from 'apollo-datasource'
import db from '../db'

class SkillAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getSkills() {
    return db.query('SELECT * FROM "Skill"').then((response) => response.rows)
  }
}

export default SkillAPI
