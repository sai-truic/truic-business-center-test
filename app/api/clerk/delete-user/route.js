import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    
    const secretKey = process.env.CLERK_SECRET_KEY;  // Ensure this is read correctly
    if (!secretKey) {
      return NextResponse.json({ error: 'Secret key is not set' }, { status: 500 });
    }
  
    try {
      const { userId } = getAuth(request, { secretKey });  // Using the secretKey
      if (!userId) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }
  
      await clerkClient.users.deleteUser(userId);
      return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}