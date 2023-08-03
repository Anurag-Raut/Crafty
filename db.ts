import { MongoClient, Db } from 'mongodb';

// Connection URL
const uri = 'mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/?retryWrites=true&w=majority';

// Database Name
const dbName = 'crafty';

// Create a new MongoClient
const client = new MongoClient(uri);

// Export a function to connect to the database
export async function connectToDatabase(): Promise<Db> {
  // if (!client.is()) {
    await client.connect();
    // console.log(client)
  // }
  return client.db(dbName);
}
