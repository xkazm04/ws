import { UserProfile } from '@/types/user'

const USER_PROFILE_KEY = 'workshop-user-profile'

export class UserProfileService {
  // Save user profile to localStorage (simplified)
  static saveUserProfile(profile: UserProfile): boolean {
    try {
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))
      return true
    } catch (error) {
      console.error('Error saving user profile:', error)
      return false
    }
  }

  // Get user profile from localStorage
  static getUserProfile(): UserProfile | null {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY)
      if (!stored) return null
      
      return JSON.parse(stored)
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  // Clear user data from localStorage
  static clearUserData(): boolean {
    try {
      localStorage.removeItem(USER_PROFILE_KEY)
      return true
    } catch (error) {
      console.error('Error clearing user data:', error)
      return false
    }
  }

  // Check if user is registered
  static isUserRegistered(): boolean {
    return this.getUserProfile() !== null
  }
}