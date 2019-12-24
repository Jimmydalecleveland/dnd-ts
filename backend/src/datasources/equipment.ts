import { DataSource } from 'apollo-datasource'
import db from '../db'

export interface IEquipmentAPI extends DataSource {
  context: any
  getWeapons(filter?: {
    skillType?: string
    rangeType?: string
    [key: string]: string | undefined
  }): Promise<object[]>
}

class EquipmentAPI implements IEquipmentAPI {
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

export default EquipmentAPI
