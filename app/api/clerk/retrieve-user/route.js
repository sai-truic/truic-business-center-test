import { getAuth } from "@clerk/nextjs/server";
import { createClerkClient } from '@clerk/backend';
import { NextResponse } from "next/server";

export async function POST(request) {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Secret key is not set' }, { status: 500 });
  }

  // Initialize Clerk client with the secret key
  const clerkClient = createClerkClient({ secretKey });

  try {
    const { userId } = getAuth(request, { secretKey });
    if (!userId) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { orgMemberId } = await request.json();

    if (!orgMemberId) {
        return NextResponse.json({ error: 'Organization Member ID is required' }, { status: 400 });
    }

    // Fetch the organization from Clerk
    const user = await clerkClient.users.getUser({
        userId: orgMemberId,
    });

    if (!user) {
        return NextResponse.json({ error: 'User is not found' }, { status: 400 });
    }

    // Return the organization
    return NextResponse.json({
        data: user    
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Error fetching organization" }, { status: 500 });
  }
}