import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Secret key is not set' }, { status: 500 });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const organizationId = params.organizationId;
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Delete the organization
    await clerkClient.organizations.deleteOrganization(organizationId);

    return NextResponse.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error("Error deleting organization:", error);
    if (error.status === 404) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Error deleting organization" }, { status: 500 });
  }
}