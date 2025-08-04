import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function generateInvitationUrl(id: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/invite/${id}`;
}

export async function GET() {
  const supabase = await createClient();
  
  const { data: invitations, error } = await supabase
    .from('invitations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(invitations);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();
  const { id, loginEmail } = body;

  const newInvitation = {
    id,
    link: generateInvitationUrl(id),
    status: 'open',
    user_name: null,
    login_email: loginEmail,
  };

  const { data, error } = await supabase
    .from('invitations')
    .insert([newInvitation])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();
  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from('invitations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}