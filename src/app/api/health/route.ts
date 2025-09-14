import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Social Media Empire Platform is running',
    timestamp: new Date().toISOString()
  })
}