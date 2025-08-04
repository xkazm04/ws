import { NextRequest, NextResponse } from 'next/server';
import { db, invitations, ensureTableExists } from '../../../lib/db';
import { eq } from 'drizzle-orm';

function generateInvitationUrl(id: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/workshop/${id}`;
}

export async function GET() {
  try {
    // Ensure table exists (for quick development)
    await ensureTableExists();
    
    const allInvitations = await db.select().from(invitations);
    return NextResponse.json(allInvitations);
  } catch (error) {
    console.error('Failed to fetch invitations:', error);
    return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure table exists (for quick development)
    await ensureTableExists();
    
    const { id, loginEmail } = await request.json();
    
    const newInvitation = {
      id,
      link: generateInvitationUrl(id),
      status: 'open' as const,
      user: null,
      loginEmail,
      createdAt: new Date(),
    };

    const result = await db.insert(invitations).values(newInvitation).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Failed to create invitation:', error);
    return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    
    const result = await db.update(invitations)
      .set(updates)
      .where(eq(invitations.id, id))
      .returning();
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Failed to update invitation:', error);
    return NextResponse.json({ error: 'Failed to update invitation' }, { status: 500 });
  }
} 