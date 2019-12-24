import { DataSource } from 'apollo-datasource'
import db from '../db'

export interface ISpellAPI extends DataSource {
  context: any
  getAll(): Promise<object[]>
  getByID({ ID }: { ID: string }): Promise<object>
}

class SpellAPI implements ISpellAPI {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getAll() {
    return db.query('SELECT * FROM "Spell"').then((response) => response.rows)
  }

  public getByID({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "Spell" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
  }
}

export default SpellAPI
