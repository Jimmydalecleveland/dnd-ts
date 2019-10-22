import { DataSource } from 'apollo-datasource'
import db from '../pg'

class SpellAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getSpells() {
    return db.query('SELECT * FROM "Spell"').then((response) => response.rows)
  }

  public getSpell({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "Spell" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
  }
}

export default SpellAPI
