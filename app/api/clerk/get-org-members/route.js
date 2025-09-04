// /api/clerk/get-org-members.js

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

        // Get organizationId from request body
        const { organizationId, limit = 10, offset = 0, orderBy = '' } = await request.json();
        if (!organizationId) {
            return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
        }

        // Validate and parse parameters
        const parsedLimit = Math.min(Math.max(parseInt(limit), 1), 500);
        const parsedOffset = Math.max(parseInt(offset), 0);

        // Fetch organization members from Clerk
        const members = await clerkClient.organizations.getOrganizationMembershipList({
            organizationId,
            limit: parsedLimit,
            offset: parsedOffset,
            orderBy,
        });

        // Return the organization members
        return NextResponse.json({
            data: members,
            total_count: members.length
        });
    } catch (error) {
        console.error("Error fetching organization members:", error);
        return NextResponse.json({ error: "Error fetching organization members" }, { status: 500 });
    }
}