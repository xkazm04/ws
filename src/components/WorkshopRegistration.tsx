'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { InvitationService } from '@/services/invitationService'
import { UserProfileService } from '@/services/userProfileService'
import { UserProfile } from '@/types/user'
import { toast } from 'sonner'
import { CheckCircleIcon, CopyIcon, AlertTriangleIcon } from 'lucide-react'

interface FormData {
  name: string
}

interface FormErrors {
  name?: string
}

export function WorkshopRegistration() {
  const [formData, setFormData] = useState<FormData>({ name: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing user registration
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check for existing user registration in localStorage
        const existingUser = UserProfileService.getUserProfile()
        
        if (existingUser) {
          setUserProfile(existingUser)
        }
      } catch (error) {
        console.error('Error initializing data:', error)
        toast.error('Failed to load user data')
      } finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const result = await InvitationService.registerUser(formData.name.trim())
      
      if (!result.success) {
        toast.error(result.error || 'Registration failed. Please try again.')
        return
      }
      
      // Save user profile to localStorage
      const userProfile: UserProfile = {
        name: formData.name.trim(),
        invitationUrl: result.invitationUrl!,
        loginEmail: result.loginEmail!,
        registrationDate: new Date().toISOString()
      }
      
      const saved = UserProfileService.saveUserProfile(userProfile)
      
      if (!saved) {
        toast.error('Failed to save registration data locally.')
        return
      }
      
      setUserProfile(userProfile)
      toast.success('Registration successful!')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Invitation link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link', err)
      toast.error('Failed to copy link')
    }
  }

  if (isLoading) {
    return (
      <div className="h-full bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (userProfile) {
    return (
      <div className="h-full bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md relative">          
          <CardHeader className="text-center pr-16">
            <div className="flex justify-center mb-4">
              <CheckCircleIcon className="w-16 h-16 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Welcome back, {userProfile.name}!
            </CardTitle>
            <CardDescription>
              Your spot in the n8n workshop is confirmed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <Label className="text-sm font-medium text-muted-foreground">
                Workshop Invitation Link
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => copyToClipboard(userProfile.invitationUrl)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <CopyIcon className="w-4 h-4" />
                  Copy Link
                </Button>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Login: <span className="font-mono font-medium text-foreground">{userProfile.loginEmail}</span>
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="text-center">Registered on: {new Date(userProfile.registrationDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-full bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md relative">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            N8N Workshop Registration
          </CardTitle>
          <CardDescription>
            Reserve your spot in our upcoming automation workshop
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  className={`transition-colors ${
                    errors.name 
                      ? 'border-destructive focus:ring-destructive' 
                      : 'border-input focus:ring-ring'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <Alert variant="destructive" className="py-2">
                    <AlertTriangleIcon className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {errors.name}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-accent text-primary-foreground transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}