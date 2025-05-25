const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
let client = null;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  const db = client.db('bulkform');
  const { name, email, password } = req.body;

  await db.collection('entries').insertOne({ name, email, password });
  res.status(200).json({ message: 'Berhasil disimpan' });
};
