import { DataSource } from 'apollo-datasource'
import knex from '../db'

class CharClassAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getCharClass({ ID }: { ID: string }) {
    return knex('CharClass')
      .select()
      .where('ID', Number(ID))
      .first()
  }

  public getCharClasses() {
    return knex('CharClass').select()
  }
}

export default CharClassAPI
