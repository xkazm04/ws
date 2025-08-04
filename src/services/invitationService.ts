import { createClient } from '@/lib/supabase/client';

export class InvitationService {
  private static supabase = createClient()

  // Register user and return invitation URL and login email
  static async registerUser(userName: string): Promise<{ success: boolean; invitationUrl?: string; loginEmail?: string; error?: string }> {
    try {
      // First check if this user is already registered
      const { data: existingInvitations, error: existingError } = await this.supabase
        .from('invitations')
        .select('*')
        .eq('user_name', userName)
        .eq('status', 'registered');

      if (existingError) {
        console.error('Error checking existing registration:', existingError);
        throw new Error('Failed to check existing registration');
      }

      if (existingInvitations && existingInvitations.length > 0) {
        // User already registered, return existing invitation
        const existingInvitation = existingInvitations[0];
        return {
          success: true,
          invitationUrl: existingInvitation.link,
          loginEmail: existingInvitation.login_email
        };
      }

      // Find an open invitation
      const { data: openInvitations, error: fetchError } = await this.supabase
        .from('invitations')
        .select('*')
        .eq('status', 'open')
        .limit(1);

      if (fetchError) {
        console.error('Error fetching open invitations:', fetchError);
        throw new Error('Failed to fetch invitations');
      }

      if (!openInvitations || openInvitations.length === 0) {
        return {
          success: false,
          error: 'All invitation slots are currently occupied. Please try again later.'
        };
      }

      const invitation = openInvitations[0];

      // Update the invitation with user registration
      const { data: updatedInvitations, error: updateError } = await this.supabase
        .from('invitations')
        .update({
          status: 'registered',
          user_name: userName,
        })
        .eq('id', invitation.id)
        .select('*');

      if (updateError) {
        console.error('Error updating invitation:', updateError);
        throw new Error('Failed to register user');
      }

      if (!updatedInvitations || updatedInvitations.length === 0) {
        throw new Error('No invitation was updated');
      }

      const updatedInvitation = updatedInvitations[0];
      
      return {
        success: true,
        invitationUrl: updatedInvitation.link,
        loginEmail: updatedInvitation.login_email
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed. Please try again.'
      };
    }
  }

  // Get registration info for a user
  static async getUserRegistration(userName: string): Promise<{ invitationUrl?: string; loginEmail?: string } | null> {
    try {
      const { data: invitations, error } = await this.supabase
        .from('invitations')
        .select('*')
        .eq('user_name', userName)
        .eq('status', 'registered');

      if (error) {
        console.error('Error fetching user registration:', error);
        return null;
      }

      if (!invitations || invitations.length === 0) {
        return null;
      }

      const invitation = invitations[0];

      return {
        invitationUrl: invitation.link,
        loginEmail: invitation.login_email
      };
    } catch (error) {
      console.error('Error fetching user registration:', error);
      return null;
    }
  }
}