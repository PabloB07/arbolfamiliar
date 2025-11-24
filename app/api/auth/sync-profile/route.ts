import { NextResponse } from 'next/server';
import { syncUserProfile } from '@/lib/auth-prisma';

export async function POST(request: Request) {
    try {
        const { userId, email, fullName } = await request.json();

        if (!userId || !email) {
            return NextResponse.json(
                { error: 'User ID and email are required' },
                { status: 400 }
            );
        }

        const { profile, error } = await syncUserProfile(userId, email, fullName);

        if (error) {
            return NextResponse.json(
                { error: 'Failed to sync user profile' },
                { status: 500 }
            );
        }

        return NextResponse.json({ profile }, { status: 200 });
    } catch (error) {
        console.error('Error in sync-profile API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
