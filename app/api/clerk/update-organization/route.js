import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {

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
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const {
      public_metadata,
      private_metadata,
      name,
      slug,
      max_allowed_memberships,
      admin_delete_enabled
    } = body;

    // Prepare the update object
    const updateParams = {};
    if (public_metadata !== undefined) updateParams.public_metadata = public_metadata;
    if (private_metadata !== undefined) updateParams.private_metadata = private_metadata;
    if (name !== undefined) updateParams.name = name;
    if (slug !== undefined) updateParams.slug = slug;
    if (max_allowed_memberships !== undefined) updateParams.max_allowed_memberships = max_allowed_memberships;
    if (admin_delete_enabled !== undefined) updateParams.admin_delete_enabled = admin_delete_enabled;

    // Update the organization
    const updatedOrganization = await clerkClient.organizations.updateOrganization(organization_id, updateParams);

    return NextResponse.json(updatedOrganization);
  } catch (error) {
    console.error("Error updating organization:", error);
    if (error.status === 404) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Error updating organization" }, { status: 500 });
  }
}