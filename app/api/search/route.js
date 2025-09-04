import Fuse from 'fuse.js';
import { NextResponse } from 'next/server';

// This is a placeholder for your actual data source
// In a real application, you'd fetch this from a database or other storage
const largeDataset = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  // ... more items ...
];

export async function POST(request) {
  const { query, options } = await request.json();

  if (!query) {
    return NextResponse.json({ message: 'Query is required' }, { status: 400 });
  }

  try {
    const fuse = new Fuse(largeDataset, {
      keys: ['title', 'author'],
      threshold: 0.4,
      ...options,
    });

    const results = fuse.search(query);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}