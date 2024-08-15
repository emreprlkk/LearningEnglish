

import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';

const app = express();
app.use(cors());

const uri =  'mongodb+srv://emreprlk:emreprlk8@clusterprlk.ijc4p.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPrlk';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/data', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Library');
    const collection = database.collection('LibraryPrlk');
    const users = await collection.find({}).toArray();
   // console.log('users:', users); // Veriyi doğru şekilde konsola yazdırıyoruz
    res.json(users); // Veriyi JSON formatında döndürüyoruz
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
   finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 5000; // Port numarası burada belirlenir
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
