import { DataSource } from 'apollo-datasource'
import db from '../db'
import logger from '../logger'

const startingEquipment: {
  [key: string]: Array<{ ID: string; tableName: string; quantity: number }>
} = {
  5: [
    {
      ID: '14',
      tableName: 'Weapon',
      quantity: 4,
    },
    {
      ID: '5',
      tableName: 'GearPack',
      quantity: 1,
    },
  ],
}

export interface ICharClassAPI extends DataSource {
  context: any
  getAll(): Promise<object[]>
  getByID({ ID }: { ID: string }): Promise<object>
  getFeatures({ ID }: { ID: string }): Promise<object[]>
  getSkills({ ID }: { ID: string }): Promise<object[]>
  getStartingEquipment({ ID }: { ID: string }): Promise<object[]>
  getLevelSpecifics({ ID }: { ID: string }): Promise<object[]>
  getLevelFeatures({
    charClassID,
    classLevel,
  }: {
    charClassID: string
    classLevel: number
  }): Promise<object[]>
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
        SELECT "ClassLevelFeature".*, "ClassLevel"."classLevel" FROM "ClassLevel"
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

  public getStartingEquipment({ ID }: { ID: string }) {
    const equipmentToQuery = startingEquipment[ID] || []

    return Promise.all(
      equipmentToQuery.map((equipment) => {
        if (equipment.tableName === 'Weapon') {
          return db
            .query(
              `
              SELECT * FROM "Weapon"
              WHERE "ID" = $1
              `,
              [equipment.ID]
            )
            .then((response) => ({
              ...response.rows[0],
              equipmentType: 'weapon',
              quantity: equipment.quantity,
            }))
        }
        if (equipment.tableName === 'Armor') {
          return db
            .query(
              `
              SELECT * FROM "Armor"
              WHERE "ID" = $1
              `,
              [equipment.ID]
            )
            .then((response) => ({
              ...response.rows[0],
              equipmentType: 'armor',
              quantity: equipment.quantity,
            }))
        }
        if (equipment.tableName === 'GearPack') {
          return db
            .query(
              `
              SELECT * FROM "GearPack"
              WHERE "ID" = $1
              `,
              [equipment.ID]
            )
            .then((response) => ({
              ...response.rows[0],
              equipmentType: 'gear pack',
              quantity: equipment.quantity,
            }))
        }
      })
    ).catch((error) => {
      logger.error('getStartingEquipment returned an error: ', error)
      throw new Error(error)
    })
  }

  public getLevelSpecifics({ ID }: { ID: string }) {
    return db
      .query(
        `
        SELECT * FROM "ClassLevel"
        WHERE "classID" = $1
        ORDER BY "classLevel" ASC
        `,
        [Number(ID)]
      )
      .then((response) => response.rows)
  }

  public getLevelFeatures({
    charClassID,
    classLevel,
  }: {
    charClassID: string
    classLevel: number
  }) {
    return db
      .query(
        `
        SELECT * FROM "ClassLevelFeature"
        INNER JOIN "ClassLevel" ON "ClassLevelFeature"."classLevelID" = "ClassLevel"."ID"
        WHERE "classID" = $1 AND "classLevel" = $2
        `,
        [Number(charClassID), classLevel]
      )
      .then((response) => response.rows)
  }
}

export default CharClassAPI
