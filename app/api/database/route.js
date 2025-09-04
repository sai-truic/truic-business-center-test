import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleMysql } from 'drizzle-orm/mysql2';
import { Pool } from 'pg';
import mysql from 'mysql2/promise';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbType = process.env.DB_TYPE;
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let db;

const initializeDatabase = async () => {
  if (db) return db;

  switch (dbType) {
    case 'postgres':
      const pool = new Pool(dbConfig);
      db = drizzle(pool);
      break;
    case 'mysql':
      const connection = await mysql.createConnection(dbConfig);
      db = drizzleMysql(connection);
      break;
    case 'sqlite':
      const sqliteDb = await open({
        filename: dbConfig.database,
        driver: sqlite3.Database,
      });
      // Using regular database connection for SQLite instead of drizzle
      db = sqliteDb;
      break;
    default:
      throw new Error(`Unsupported database type: ${dbType}`);
  }

  return db;
};

// Remove edge runtime config as it's incompatible with Node.js database packages
// export const config = {
//   runtime: 'edge',
// };

export async function POST(request) {
  const { operation, queryKey, query, params, data } = await request.json();

  try {
    const db = await initializeDatabase();

    let result;
    switch (operation) {
      case 'query':
        result = await db.execute(query, params);
        break;
      case 'mutate':
        result = await db.execute(query, data);
        break;
      default:
        return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database operation failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}