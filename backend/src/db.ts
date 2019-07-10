import { config } from 'dotenv'
config()

// Knex is stupid and still hasn't solved their es6 imports issue
// tslint:disable-next-line: no-var-requires
const db = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

export default db
