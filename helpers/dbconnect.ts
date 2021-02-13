import { init, MongoClient } from 'https://deno.land/x/mongo@v0.6.0/mod.ts'

await init()

const client = new MongoClient()
client.connectWithUri("mongodb://localhost:27017")

const dbname : string = 'products_list'
const db = client.database(dbname)

const products = db.collection('products')

export {db, products}
