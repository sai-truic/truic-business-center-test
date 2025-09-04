import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import { CosmosClient } from '@azure/cosmos';

export const runtime = 'edge';

const cosmosConnectionString = process.env.COSMOS_CONNECTION_STRING;
const cosmosDatabase = process.env.COSMOS_DATABASE;

if (!cosmosConnectionString || !cosmosDatabase) {
  console.error('Missing required environment variables:');
  if (!cosmosConnectionString) console.error('- COSMOS_CONNECTION_STRING');
  if (!cosmosDatabase) console.error('- COSMOS_DATABASE');
  throw new Error('Server configuration error');
}

const client = new CosmosClient(cosmosConnectionString);
const database = client.database(cosmosDatabase);

export async function POST(request) {
  console.log('Received request to /api/cosmosdb');
  
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Unauthorized request: Missing or invalid Authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const auth = await getAuth(request);
    if (!auth.userId) {
      console.log('Unauthorized request: Invalid token');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { operation, containerId, querySpec, data } = await request.json();
    console.log('Request details:', { operation, containerId, userId: auth.userId, querySpec, data });

    const container = database.container(containerId);
    let result;

    switch (operation) {
      case 'query':
        console.log('Executing query operation');
        if (!querySpec) {
          return NextResponse.json({ error: 'Query spec is undefined' }, { status: 400 });
        }
        const { resources } = await container.items.query(querySpec).fetchAll();
        console.log('Query result:', resources);
        result = resources;
        break;
      case 'create':
        console.log('Executing create operation');
        const newItem = { ...data, userId: auth.userId, id: uuidv4() };
        console.log('New item to create:', newItem);
        const { resource: createdItem } = await container.items.create(newItem);
        console.log('Created item:', createdItem);
        result = createdItem;
        break;
      case 'upsert':
        console.log('Executing upsert operation');
        const itemToUpsert = { ...data, userId: auth.userId };
        console.log('Item to upsert:', itemToUpsert);
        const { resource: upsertedItem } = await container.items.upsert(itemToUpsert);
        console.log('Upserted item:', upsertedItem);
        result = upsertedItem;
        break;
      case 'delete':
        console.log('Executing delete operation');
        console.log('Item to delete:', { id: data.id, userId: auth.userId });
        await container.item(data.id, auth.userId).delete();
        result = { status: 'Deleted' };
        break;
      default:
        console.log('Invalid operation:', operation);
        return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
    }

    console.log('Operation successful, returning result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in Cosmos DB operation:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}