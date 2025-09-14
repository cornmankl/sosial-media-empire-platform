import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection by counting users
    const userCount = await db.user.count()
    
    // Test creating a sample user
    const sampleUser = await db.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: "Test User",
        role: "USER"
      }
    })
    
    // Delete the sample user to keep the database clean
    await db.user.delete({
      where: {
        id: sampleUser.id
      }
    })
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'Database connection is working correctly',
      userCount: userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to connect to the database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}