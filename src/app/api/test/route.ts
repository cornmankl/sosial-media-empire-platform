import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'success', 
    message: 'Social Media Empire Platform API is working',
    timestamp: new Date().toISOString()
  })
}