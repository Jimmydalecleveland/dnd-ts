import { DataSource } from 'apollo-datasource'
import db from '../pg'

class BackgroundAPI extends DataSource {
  public context: any

  public initialize(config: any) {
    this.context = config.context
  }

  public getBackgrounds() {
    return db
      .query('SELECT * FROM "Background"')
      .then((response) => response.rows)
  }

  public getBackground({ ID }: { ID: string }) {
    return db
      .query('SELECT * FROM "Background" WHERE "ID" = $1', [Number(ID)])
      .then((response) => response.rows[0])
  }

  public getFeatures({ backgroundID }: { backgroundID: string }) {
    return db
      .query('SELECT * FROM "BackgroundFeature" WHERE "backgroundID" = $1', [
        Number(backgroundID),
      ])
      .then((response) => response.rows)
  }
}

export default BackgroundAPI
