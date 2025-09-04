import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Secret key is not set' }, { status: 500 });
  }

  try {
    const { userId: authenticatedUserId } = getAuth(req);
    if (!authenticatedUserId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Extract organization_id and user_id from the URL parameters
    const { organization_id, user_id } = params;

    if (!organization_id || !user_id) {
      return NextResponse.json({ error: 'Missing organization_id or user_id' }, { status: 400 });
    }

    // Remove the member from the organization
    await clerkClient.organizations.removeMember(organization_id, user_id);

    return NextResponse.json({ message: 'Member removed successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error removing member from organization:", error);

    if (error.status === 404) {
      return NextResponse.json({ error: "Organization or user not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Error removing member from organization" }, { status: 500 });
  }
}