import { DataSource } from 'apollo-datasource'
import knex from '../db'

class CharacterAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getCharacter({ ID }: { ID: string }) {
    return knex('Character')
      .select()
      .where('ID', Number(ID))
      .first()
  }

  public getCharacters() {
    return knex('Character').select()
  }

  public createCharacter({ name }: { name: string }) {
    return knex('Character')
      .insert({ name })
      .returning('*')
      .then((data: any) => data[0])
  }

  public deleteCharacter({ ID }: { ID: string }) {
    return knex('Character')
      .where('ID', Number(ID))
      .del()
  }
}

export default CharacterAPI
