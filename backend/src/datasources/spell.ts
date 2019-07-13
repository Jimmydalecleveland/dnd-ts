import { DataSource } from 'apollo-datasource'
import knex from '../db'

class SpellAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getSpells() {
    return knex('Spell').select()
  }

  public getSpell({ ID }: { ID: string }) {
    return knex('Spell')
      .select()
      .where('ID', Number(ID))
      .first()
  }
}

export default SpellAPI
