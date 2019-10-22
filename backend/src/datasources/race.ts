import { DataSource } from 'apollo-datasource'
import db from '../pg'

class RaceAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getRaces() {
    return db.query('SELECT * FROM "Race"').then((response) => response.rows)
  }

  public getRace({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "Race" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
  }

  public getSubraces({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "Race" WHERE "parentRaceID" = $1', [Number(ID)])
      .then((response) => response.rows)
  }

  public getRaceTraits({ raceID }: { raceID: string }) {
    return db
      .query('SELECT * FROM "RaceTrait" WHERE "raceID" = $1', [Number(raceID)])
      .then((response) => response.rows)
  }
}

export default RaceAPI
