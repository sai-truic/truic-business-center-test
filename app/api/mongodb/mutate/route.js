import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

export async function POST(request) {
  const { queryKey, data, pipeline = [] } = await request.json();

  if (!queryKey || !data) {
    return NextResponse.json({ message: 'Query key and data are required' }, { status: 400 });
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);

    const [collectionName, documentId] = queryKey.split(':');
    const collection = db.collection(collectionName);
    
    const parsedData = JSON.parse(data);

    let result;
    if (pipeline.length > 0) {
      // Use aggregation pipeline for complex updates
      pipeline.push({ $merge: { into: collectionName, on: "_id", whenMatched: "replace", whenNotMatched: "insert" } });
      result = await collection.aggregate(pipeline).toArray();
    } else if (documentId) {
      result = await collection.updateOne(
        { _id: documentId },
        { $set: parsedData },
        { upsert: true }
      );
    } else {
      result = await collection.insertOne(parsedData);
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Database mutation failed:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}