import { DataSource } from 'apollo-datasource'
import knex from '../db'

class RaceAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getRace({ ID }: { ID: string }) {
    return knex('Race')
      .select()
      .where('ID', Number(ID))
      .first()
  }

  public getSubraces({ ID }: { ID: string }) {
    return knex('Race')
      .select()
      .where('parentRaceID', Number(ID))
  }

  public getRaces() {
    return knex('Race')
      .select()
      .whereNull('parentRaceID')
  }

  public getRaceTraits({ raceID }: { raceID: string }) {
    return knex('RaceTrait')
      .select()
      .where('raceID', Number(raceID))
  }
}

export default RaceAPI
