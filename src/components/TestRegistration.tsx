'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InvitationService } from '@/services/invitationService'
import { UserProfileService } from '@/services/userProfileService'
import { createClient } from '@/lib/supabase/client'

export function TestRegistration() {
  const [testName, setTestName] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testRegistration = async () => {
    if (!testName.trim()) return
    
    setLoading(true)
    try {
      const result = await InvitationService.registerUser(testName.trim())
      setResult({ type: 'registration', data: result })
      console.log('Registration result:', result)
    } catch (error) {
      console.error('Test error:', error)
      setResult({ type: 'error', data: { error: 'Test failed', details: error } })
    } finally {
      setLoading(false)
    }
  }

  const testDirectSupabaseRead = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .limit(5)
      
      setResult({ 
        type: 'direct_read', 
        data: { data, error },
        headers: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      })
      console.log('Direct read result:', { data, error })
    } catch (error) {
      console.error('Direct read error:', error)
      setResult({ type: 'error', data: { error: 'Direct read failed', details: error } })
    } finally {
      setLoading(false)
    }
  }

  const testDirectSupabaseUpdate = async () => {
    if (!testName.trim()) return
    
    setLoading(true)
    try {
      const supabase = createClient()
      
      // First, get an open invitation
      const { data: openInvitations, error: fetchError } = await supabase
        .from('invitations')
        .select('*')
        .eq('status', 'open')
        .limit(1)
      
      if (fetchError || !openInvitations || openInvitations.length === 0) {
        setResult({ 
          type: 'update_error', 
          data: { error: 'No open invitations found', fetchError, openInvitations } 
        })
        return
      }

      const invitation = openInvitations[0]
      
      // Try to update it
      const { data: updateData, error: updateError } = await supabase
        .from('invitations')
        .update({
          status: 'registered',
          user_name: testName.trim()
        })
        .eq('id', invitation.id)
        .select('*')
      
      setResult({ 
        type: 'direct_update', 
        data: { 
          originalInvitation: invitation,
          updateData, 
          updateError 
        } 
      })
      console.log('Direct update result:', { updateData, updateError })
    } catch (error) {
      console.error('Direct update error:', error)
      setResult({ type: 'error', data: { error: 'Direct update failed', details: error } })
    } finally {
      setLoading(false)
    }
  }

  const clearLocalStorage = () => {
    UserProfileService.clearUserData()
    setResult(null)
    console.log('Local storage cleared')
  }

  const resetInvitations = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('invitations')
        .update({ status: 'open', user_name: null })
        .neq('id', 'nonexistent')
        .select('*')
      
      setResult({ 
        type: 'reset', 
        data: { data, error, message: 'All invitations reset to open' } 
      })
      console.log('Reset result:', { data, error })
    } catch (error) {
      console.error('Reset error:', error)
      setResult({ type: 'error', data: { error: 'Reset failed', details: error } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Debug Registration System</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Enter test name"
          />
          <Button onClick={testRegistration} disabled={loading}>
            {loading ? 'Testing...' : 'Register'}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={testDirectSupabaseRead} variant="outline" disabled={loading}>
            Test Read
          </Button>
          <Button onClick={testDirectSupabaseUpdate} variant="outline" disabled={loading}>
            Test Update
          </Button>
          <Button onClick={clearLocalStorage} variant="outline">
            Clear LocalStorage
          </Button>
          <Button onClick={resetInvitations} variant="outline" disabled={loading}>
            Reset All Invitations
          </Button>
        </div>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Result ({result.type}):</h4>
            <pre className="text-sm overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 