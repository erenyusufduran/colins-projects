import * as mongoDB from "mongodb";

const DB_CONN_STRING = "mongodb://localhost:27017/";
const DB_NAME = "gamesDB";
const GAMES_COLLECTION_NAME = "games";
const USERS_COLLECTION_NAME = "users";

export const collections: { games?: mongoDB.Collection; users?: mongoDB.Collection } = {};

export async function connectDatabase() {
  const client = new mongoDB.MongoClient(DB_CONN_STRING);
  await client.connect();
  const db = client.db(DB_NAME);
  const gamesCollection = db.collection(GAMES_COLLECTION_NAME);
  const usersCollection = db.collection(USERS_COLLECTION_NAME);
  collections.games = gamesCollection;
  collections.users = usersCollection;
  console.log(
    `Successfully connectod to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
  );
}
