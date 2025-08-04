export interface UserProfile {
  name: string
  invitationUrl: string
  loginEmail: string
  registrationDate: string
}

export interface RegistrationResult {
  success: boolean
  invitationUrl?: string
  loginEmail?: string
  error?: string
}