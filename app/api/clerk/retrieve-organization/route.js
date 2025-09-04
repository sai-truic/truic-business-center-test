import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Secret key is not set' }, { status: 500 });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { organization_id } = params;

    if (!organization_id) {
      return NextResponse.json({ error: 'Organization ID or slug is required' }, { status: 400 });
    }

    // Fetch the organization from Clerk
    const organization = await clerkClient.organizations.getOrganization({
      organizationId: organization_id,
    });

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Return the organization
    return NextResponse.json(organization);
  } catch (error) {
    console.error("Error fetching organization:", error);
    
    if (error.status === 404) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Error fetching organization" }, { status: 500 });
  }
}