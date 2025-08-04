import { InvitationLink } from '@/types/invitation';

interface InvitationDbRecord {
  id: string;
  link: string;
  status: 'open' | 'registered';
  user: string | null;
  loginEmail: string;
  createdAt: string;
  registeredAt?: string;
}

export class InvitationService {
  private static generateUniqueId(): string {
    return 'inv_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private static generateLoginEmail(index: number): string {
    return `ws${index}@groupon.com`;
  }

  // Fetch all invitations from API
  static async fetchInvitations(): Promise<InvitationLink[]> {
    try {
      const response = await fetch('/api/invitations');
      if (!response.ok) {
        throw new Error('Failed to fetch invitations');
      }
      const data = await response.json();
      
      // Transform database format to frontend format
      return data.map((inv: InvitationDbRecord) => ({
        id: inv.id,
        link: inv.link,
        status: inv.status,
        user: inv.user,
        loginEmail: inv.loginEmail,
        createdAt: new Date(inv.createdAt),
        registeredAt: inv.registeredAt ? new Date(inv.registeredAt) : undefined,
      }));
    } catch (error) {
      console.error('Error fetching invitations:', error);
      return [];
    }
  }

  // Initialize sample data via API if no invitations exist
  static async initializeSampleData(): Promise<InvitationLink[]> {
    const existingInvitations = await this.fetchInvitations();
    
    if (existingInvitations.length > 0) {
      return existingInvitations;
    }

    // Create sample invitations
    const sampleData = [
      { id: 'inv_sample1', loginEmail: 'ws1@groupon.com' },
      { id: 'inv_sample2', loginEmail: 'ws2@groupon.com' },
      { id: 'inv_sample3', loginEmail: 'ws3@groupon.com' },
      { id: 'inv_sample4', loginEmail: 'ws4@groupon.com' },
      { id: 'inv_sample5', loginEmail: 'ws5@groupon.com' },
      { id: 'inv_sample6', loginEmail: 'ws6@groupon.com' },
      { id: 'inv_sample7', loginEmail: 'ws7@groupon.com' },
      { id: 'inv_sample8', loginEmail: 'ws8@groupon.com' },
    ];

    const createdInvitations: InvitationLink[] = [];
    
    for (const sample of sampleData) {
      try {
        const response = await fetch('/api/invitations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sample),
        });
        
        if (response.ok) {
          const created = await response.json();
          createdInvitations.push({
            id: created.id,
            link: created.link,
            status: created.status,
            user: created.user,
            loginEmail: created.loginEmail,
            createdAt: new Date(created.createdAt),
          });
        }
      } catch (error) {
        console.error('Error creating sample invitation:', error);
      }
    }

    return createdInvitations;
  }

  static findOpenInvitation(invitations: InvitationLink[]): InvitationLink | null {
    return invitations.find(inv => inv.status === 'open') || null;
  }

  // Register user via API
  static async registerUser(userName: string): Promise<{ invitation: InvitationLink | null; invitationUrl: string | null }> {
    try {
      // First fetch current invitations
      const invitations = await this.fetchInvitations();
      const openInvitation = this.findOpenInvitation(invitations);
      
      if (!openInvitation) {
        // Create a new invitation if none available
        const newInvitation = await this.createNewInvitation();
        if (!newInvitation) {
          return { invitation: null, invitationUrl: null };
        }
        
        // Register user to the new invitation
        return this.registerUser(userName);
      }

      // Update the invitation with user registration
      const response = await fetch('/api/invitations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: openInvitation.id,
          status: 'registered',
          user: userName,
          registeredAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const updatedInvitation = await response.json();
      
      return {
        invitation: {
          id: updatedInvitation.id,
          link: updatedInvitation.link,
          status: updatedInvitation.status,
          user: updatedInvitation.user,
          loginEmail: updatedInvitation.loginEmail,
          createdAt: new Date(updatedInvitation.createdAt),
          registeredAt: updatedInvitation.registeredAt ? new Date(updatedInvitation.registeredAt) : undefined,
        },
        invitationUrl: updatedInvitation.link,
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return { invitation: null, invitationUrl: null };
    }
  }

  // Create new invitation via API
  static async createNewInvitation(): Promise<InvitationLink | null> {
    try {
      const existingInvitations = await this.fetchInvitations();
      
      // Find the next available email index
      const usedIndexes = existingInvitations.map(inv => {
        const match = inv.loginEmail.match(/ws(\d+)@groupon\.com/);
        return match ? parseInt(match[1]) : 0;
      });
      const nextIndex = Math.max(0, ...usedIndexes) + 1;
      
      const id = this.generateUniqueId();
      const loginEmail = this.generateLoginEmail(nextIndex);
      
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, loginEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to create invitation');
      }

      const created = await response.json();
      
      return {
        id: created.id,
        link: created.link,
        status: created.status,
        user: created.user,
        loginEmail: created.loginEmail,
        createdAt: new Date(created.createdAt),
      };
    } catch (error) {
      console.error('Error creating new invitation:', error);
      return null;
    }
  }
}