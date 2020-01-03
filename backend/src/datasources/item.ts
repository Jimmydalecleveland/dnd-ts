import { DataSource } from 'apollo-datasource'
import db from '../db'

export interface IItemAPI extends DataSource {
  context: any
  getCustomItems(): Promise<object[]>
  getWeapons(filter?: {
    skillType?: string
    rangeType?: string
    [key: string]: string | undefined
  }): Promise<object[]>
}

class EquipmentAPI implements IItemAPI {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getCustomItems() {
    return db
      .query(
        `
        SELECT * FROM "Item"
        WHERE type = 'CustomItem'
        `
      )
      .then((response) => response.rows)
  }

  public getWeapons(filter?: {
    skillType?: string
    rangeType?: string
    [key: string]: string | undefined
  }) {
    let queryText =
      'SELECT * FROM "Item" INNER JOIN "Weapon" ON "Weapon"."itemID" = "Item"."ID"'

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
