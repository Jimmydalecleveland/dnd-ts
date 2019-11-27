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

        queryText += `"${key}" = '${filter[key]}'`
      })
    }

    return db.query(queryText).then((response) => response.rows)
  }

  public getWeaponsByType(skillType: string) {
    return db.query('SELECT * FROM "Weapon" WHERE type = $1', [skillType])
  }
}

export default WeaponAPI
