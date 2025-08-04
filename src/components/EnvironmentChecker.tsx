'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircleIcon, AlertTriangleIcon } from 'lucide-react'

export function EnvironmentChecker() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const checks = [
    {
      name: 'Supabase URL',
      value: supabaseUrl,
      isValid: !!supabaseUrl && supabaseUrl.includes('supabase.co'),
      displayValue: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'Not set'
    },
    {
      name: 'Supabase Anon Key',
      value: supabaseKey,
      isValid: !!supabaseKey && supabaseKey.length > 100,
      displayValue: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'Not set'
    }
  ]

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Environment Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {checks.map((check) => (
          <div key={check.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex-1">
              <div className="font-medium">{check.name}</div>
              <div className="text-sm text-muted-foreground">{check.displayValue}</div>
            </div>
            <div className="ml-3">
              {check.isValid ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangleIcon className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>
        ))}
        
        <div className="text-sm text-muted-foreground">
          <p>Environment variables should be set in your <code>.env.local</code> file:</p>
          <pre className="mt-2 p-2 bg-background rounded text-xs">
{`NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
} 