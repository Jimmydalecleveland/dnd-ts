import { DataSource } from 'apollo-datasource'
import db from '../db'

class CharacterAPI extends DataSource {
  context: any;

  initialize(config: any) {
    this.context = config.context
  }

  getCharacter({ ID }: { ID: string }) {
    return db('Character').select().where('ID', Number(ID)).first()
  }

  getCharacters() {
    return db('Character').select()
  }
}

export default CharacterAPI