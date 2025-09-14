import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform, contentType, tone } = await request.json()

    if (!prompt || !platform) {
      return NextResponse.json(
        { error: 'Prompt and platform are required' },
        { status: 400 }
      )
    }

    // Initialize ZAI
    const zai = await ZAI.create()

    // Create a comprehensive prompt for content generation
    const systemPrompt = `You are an expert social media content creator for ${platform}. 
    Generate engaging content based on the user's request. 
    The content should be optimized for ${platform} and have a ${tone || 'professional'} tone.
    Content type: ${contentType || 'general'}.
    
    Your response should be a JSON object with the following structure:
    {
      "content": "The generated social media post",
      "hashtags": ["hashtag1", "hashtag2", "hashtag3"],
      "sentiment": "positive|neutral|negative",
      "viralityScore": 85,
      "platform": "${platform}"
    }
    
    Make the content engaging, platform-appropriate, and include relevant hashtags.`

    const userPrompt = `Generate social media content for ${platform} with the following requirements:
    - Topic: ${prompt}
    - Tone: ${tone || 'professional'}
    - Content Type: ${contentType || 'general'}
    
    Create content that will perform well on ${platform}.`

    // Generate content using ZAI
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    // Extract the response content
    const responseContent = completion.choices[0]?.message?.content

    if (!responseContent) {
      throw new Error('No content generated')
    }

    // Parse the JSON response
    let generatedContent
    try {
      generatedContent = JSON.parse(responseContent)
    } catch (parseError) {
      // If the response is not valid JSON, create a fallback structure
      generatedContent = {
        content: responseContent,
        hashtags: ['#socialmedia', '#content', '#marketing'],
        sentiment: 'positive',
        viralityScore: 75,
        platform: platform
      }
    }

    return NextResponse.json(generatedContent)

  } catch (error) {
    console.error('Error generating AI content:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}