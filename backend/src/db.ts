import { Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client()

client.connect()

export default client
