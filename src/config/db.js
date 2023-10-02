const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wndd9z6.mongodb.net/?retryWrites=true&w=majority`;

let _db;

async function connect() {
  if (!_db) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      maxPoolSize: 10,
    });

    try {
      await client.connect();
      _db = client.db('wraply');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  }
  return _db;
}

module.exports = { connect };
