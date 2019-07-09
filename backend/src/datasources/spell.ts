import { DataSource } from 'apollo-datasource'
import db from '../db'

class SpellAPI extends DataSource {
  context: any

  initialize(config: any) {
    this.context = config.context
  }

  getSpells() {
    return db('Spell').select()
  }

  getSpell({ ID }: { ID: string }) {
    return db('Spell').select().where('ID', Number(ID)).first()
  }
}

export default SpellAPI