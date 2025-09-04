import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Secret key is not set' }, { status: 500 });
  }

  try {
    const { userId: authUserId } = getAuth(req);
    if (!authUserId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { organization_id, user_id } = params;
    if (!organization_id || !user_id) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const body = await req.json();
    const { role } = body;

    if (!role) {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 });
    }

    // Update the organization membership
    const updatedMembership = await clerkClient.organizations.updateMembership({
      organizationId: organization_id,
      userId: user_id,
      role: role,
    });

    return NextResponse.json(updatedMembership);
  } catch (error) {
    console.error("Error updating organization membership:", error);
    if (error.status === 404) {
      return NextResponse.json({ error: "Organization or user not found" }, { status: 404 });
    } else if (error.status === 422) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 422 });
    }
    return NextResponse.json({ error: "Error updating organization membership" }, { status: 500 });
  }
}