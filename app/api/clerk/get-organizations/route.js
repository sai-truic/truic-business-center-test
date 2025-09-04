import { getAuth } from "@clerk/nextjs/server";
import { createClerkClient } from '@clerk/backend';
import { NextResponse } from "next/server";

export async function GET(request) {
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

    // Get query parameters
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get('limit') || "20";
    const offset = searchParams.get('offset') || "0";
    const includeMembersCount = searchParams.get('include_members_count') || "true";
    const orderBy = searchParams.get('order_by') || "-created_at";

    // Validate and parse parameters
    const parsedLimit = Math.min(Math.max(parseInt(limit), 1), 500);
    const parsedOffset = Math.max(parseInt(offset), 0);

    // Fetch organizations from Clerk
    const orgList = await clerkClient.organizations.getOrganizationList({
      limit: parsedLimit,
      offset: parsedOffset,
      includeMembersCount,
      orderBy,
    });

    console.log("Organizations fetched:", orgList);

    // Return the organizations
    return NextResponse.json({ orgList });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json({ error: "Error fetching organizations", details: error.message }, { status: 500 });
  }
}