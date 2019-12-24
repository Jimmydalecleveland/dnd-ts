import { DataSource } from 'apollo-datasource'
import db from '../db'

export interface ISkillAPI extends DataSource {
  context: any
  getAll(): Promise<object[]>
}

class SkillAPI implements ISkillAPI {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getAll() {
    return db.query('SELECT * FROM "Skill"').then((response) => response.rows)
  }
}

export default SkillAPI
