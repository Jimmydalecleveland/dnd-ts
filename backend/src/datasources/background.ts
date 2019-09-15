import { DataSource } from 'apollo-datasource'
import knex from '../db'

class BackgroundAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getBackgrounds() {
    return knex('Background').select()
  }

  public getBackground({ ID }: { ID: string }) {
    return knex('Background')
      .select()
      .where('ID', Number(ID))
      .first()
  }

  public getFeatures({ backgroundID }: { backgroundID: string }) {
    return knex('BackgroundFeature')
      .select()
      .where('backgroundID', Number(backgroundID))
  }
}

export default BackgroundAPI
