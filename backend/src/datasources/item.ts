import { DataSource } from 'apollo-datasource'
import format from 'pg-format'

import db from '../db'

export interface IItemAPI extends DataSource {
  context: any
  getCustomItems(): Promise<object[]>
  getArmor(): Promise<object[]>
  getWeapons(filter?: {
    skillType?: string
    rangeType?: string
    [key: string]: string | undefined
  }): Promise<object[]>
  getGearPacks(): Promise<object[]>
  getGearPack({ ID }: { ID: string }): Promise<object>
  getGearPackItems({ ID }: { ID: string }): Promise<object[]>
}

class ItemAPI implements IItemAPI {
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

  public getArmor() {
    return db
      .query(
        `SELECT * FROM "Item" INNER JOIN "Armor" ON "Armor"."itemID" = "Item"."ID"`
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

  public getGearPacks() {
    return db
      .query(
        `
        SELECT * FROM "GearPack"
        `
      )
      .then((response) => response.rows)
  }

  public getGearPack({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT * FROM "GearPack" WHERE "GearPack"."ID" = $1
        `,
        [Number(ID)]
      )
      .then((response) => response.rows[0])
  }

  public getGearPackItems({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT "Item".*, "GearPackItem".quantity FROM "GearPack"
        INNER JOIN "GearPackItem" ON "GearPackItem"."gearPackID" = "GearPack"."ID"
        INNER JOIN "Item" ON "Item"."ID" = "GearPackItem"."itemID"
        WHERE "GearPack"."ID" = $1
        `,
        [Number(ID)]
      )
      .then((response) => {
        const adventuringGearIDs: number[] = []
        const toolIDs: number[] = []
        const queries: Array<Promise<{
          rows: Array<{ ID: number; quantity: number }>
        }>> = []
        const allItems: Array<{ ID: number; quantity: number }> = []

        response.rows.forEach((item) => {
          switch (item.type) {
            case 'AdventuringGear':
              adventuringGearIDs.push(item.ID)
              break
            case 'Tool':
              toolIDs.push(item.ID)
              break
            case 'CustomItem':
              allItems.push(item)
          }
        })

        if (adventuringGearIDs.length > 0) {
          // pg-format is required for parsed params when passing an array as a single argument
          queries.push(
            db.query(
              format(
                `
                SELECT "Item".*, "AdventuringGear".*, "GearPackItem".quantity FROM "AdventuringGear" 
                INNER JOIN "Item" ON "Item"."ID" = "AdventuringGear"."itemID"
                INNER JOIN "GearPackItem" ON "GearPackItem"."itemID" = "Item"."ID"
                WHERE "Item"."ID" IN (%L) AND "GearPackItem"."gearPackID" = %L
                `,
                adventuringGearIDs,
                Number(ID)
              )
            )
          )
        }

        if (toolIDs.length > 0) {
          queries.push(
            db.query(
              format(
                `
                SELECT "Item".*, "Tool".*, "GearPackItem".quantity FROM "Tool" 
                INNER JOIN "Item" ON "Item"."ID" = "Tool"."itemID"
                INNER JOIN "GearPackItem" ON "GearPackItem"."itemID" = "Item"."ID"
                WHERE "Item"."ID" IN (%L) AND "GearPackItem"."gearPackID" = %L
                `,
                toolIDs,
                Number(ID)
              )
            )
          )
        }

        return Promise.all(queries)
          .then((results) =>
            results.forEach((result) => allItems.push(...result.rows))
          )
          .then(() => allItems)
      })
  }
}

export default ItemAPI
