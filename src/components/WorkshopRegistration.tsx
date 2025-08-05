'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { InvitationService } from '@/services/invitationService'
import { UserProfileService } from '@/services/userProfileService'
import { UserProfile } from '@/types/user'
import { toast } from 'sonner'
import { CheckCircleIcon, CopyIcon, AlertTriangleIcon, LinkIcon } from 'lucide-react'

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
  const [showSuccess, setShowSuccess] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied'>('idle')

  // Check for existing user registration
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check for existing user registration in localStorage
        const existingUser = UserProfileService.getUserProfile()
        
        if (existingUser) {
          setUserProfile(existingUser)
          setShowSuccess(true)
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
      setShowSuccess(true)
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
    setCopyState('copying')
    try {
      await navigator.clipboard.writeText(text)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch (err) {
      console.error('Failed to copy link', err)
      setCopyState('idle')
      toast.error('Failed to copy link')
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        delay: 0.1
      }
    }
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.3
      }
    }
  }

  if (isLoading) {
    return (
      <div className="my-6 p-4 rounded-lg border border-slate-200 bg-slate-50/50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center space-x-3"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full"
          />
          <p className="text-slate-600">Loading registration form...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="my-6"
    >
      <AnimatePresence mode="wait">
        {showSuccess && userProfile ? (
          <motion.div
            key="success"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={successVariants}
            className="space-y-6"
          >
                          {/* Success Content - Markdown-friendly styling */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-lg border border-slate-200 bg-white"
              >
                {/* Login Email */}
                <div className="space-y-3 mb-6">
                  <Label className="text-base font-semibold text-slate-700 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" />
                    Login Email
                  </Label>
                  <div className="flex gap-3">
                    <div className="flex-1 p-4 bg-slate-50 rounded-lg border">
                      <p className="font-mono text-base text-slate-800">{userProfile.loginEmail}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => copyToClipboard(userProfile.loginEmail)}
                        variant="outline"
                        size="lg"
                        className="h-14 px-4 border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                        disabled={copyState === 'copying'}
                      >
                        <AnimatePresence mode="wait">
                          {copyState === 'idle' && (
                            <motion.div
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <CopyIcon className="w-5 h-5" />
                            </motion.div>
                          )}
                          {copyState === 'copying' && (
                            <motion.div
                              key="copying"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"
                              />
                            </motion.div>
                          )}
                          {copyState === 'copied' && (
                            <motion.div
                              key="copied"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            >
                              <CheckCircleIcon className="w-5 h-5 text-green-600" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Workshop App Access */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-slate-700">
                    Workshop Access
                  </Label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      onClick={() => window.open(userProfile.invitationUrl, '_blank')}
                      size="lg"
                      className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open n8n App
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="space-y-6"
          >
            {/* Form Header - More markdown-like */}
            <div className="space-y-2">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-slate-800"
              >
                Workshop Registration
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-600 text-base leading-relaxed"
              >
                Reserve your spot in our upcoming automation workshop by filling out the form below.
              </motion.p>
            </div>

            {/* Registration Form - Integrated styling */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-lg border border-slate-200 bg-white"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-base font-semibold text-slate-700">
                    Full Name *
                  </Label>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      className={`h-12 text-base transition-all duration-200 ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Alert variant="destructive" className="py-3">
                          <AlertTriangleIcon className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            {errors.name}
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                      />
                    ) : null}
                    {isSubmitting ? 'Creating Registration...' : 'Register for Workshop'}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}