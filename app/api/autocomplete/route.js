import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';

// This is a placeholder for your actual data source
// In a real application, you'd fetch this from a database or other storage
const largeDataset = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { title: '1984', author: 'George Orwell' },
  { title: 'Pride and Prejudice', author: 'Jane Austen' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
  // ... more items ...
];

export async function POST(request) {
  try {
    const { query, options } = await request.json();

    if (!query) {
      return NextResponse.json({ message: 'Query is required' }, { status: 400 });
    }

    const fuse = new Fuse(largeDataset, {
      keys: ['title', 'author'],
      threshold: 0.4,
      ...options,
    });

    const results = fuse.search(query).slice(0, options?.limit || 5);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Autocomplete failed:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}