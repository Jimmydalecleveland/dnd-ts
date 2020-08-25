import { Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client()

client.connect().catch((error) => {
  console.log(error)
  throw Error(error)
})

export default client
