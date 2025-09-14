"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ApiHealthCheck() {
  const [status, setStatus] = useState<{ status: string; message?: string; timestamp?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setStatus(data)
    } catch (err) {
      setError('Failed to connect to the API')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Health Check</CardTitle>
        <CardDescription>Verify that the backend API is working correctly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={checkHealth} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check API Health"
          )}
        </Button>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        
        {status && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              Status: {status.status} - {status.message}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Checked at: {status.timestamp}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}