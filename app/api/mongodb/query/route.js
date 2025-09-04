import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

export async function POST(request) {
  const { queryKey, pipeline = [] } = await request.json();

  if (!queryKey) {
    return NextResponse.json({ message: 'Query key is required' }, { status: 400 });
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);

    const [collectionName, documentId] = queryKey.split(':');
    const collection = db.collection(collectionName);
    
    let data;
    if (documentId) {
      pipeline.unshift({ $match: { _id: documentId } });
    }

    if (pipeline.length > 0) {
      data = await collection.aggregate(pipeline).toArray();
    } else {
      data = documentId 
        ? await collection.findOne({ _id: documentId })
        : await collection.find().toArray();
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}