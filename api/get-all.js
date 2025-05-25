const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
let client = null;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { adminpass } = req.body;
  if (adminpass !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  const db = client.db('bulkform');
  const data = await db.collection('entries').find().sort({ _id: -1 }).toArray();
  res.status(200).json(data);
};
