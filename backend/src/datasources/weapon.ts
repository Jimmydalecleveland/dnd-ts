import { DataSource } from 'apollo-datasource'
import db from '../db'
import SkillAPI from './skill'

class WeaponAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getWeapons(filter?: {
    skillType?: string
    rangeType?: string
    [key: string]: string | undefined
  }) {
    let queryText = 'SELECT * FROM "Weapon"'

    if (filter) {
      Object.keys(filter).forEach((key, index) => {
        if (index === 0) {
          queryText += ' WHERE '
        } else {
          queryText += ' AND '
        }

        queryText += `"${key}" = $${index + 1}`
      })
    }

    return db
      .query(queryText, filter && Object.values(filter))
      .then((response) => response.rows)
  }
}

export default WeaponAPI