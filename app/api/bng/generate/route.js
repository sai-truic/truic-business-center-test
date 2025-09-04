import { NextResponse } from 'next/server';
import { streamText } from "ai";
import { createOpenAI } from '@ai-sdk/openai';
import { extractKeyword, extractIndustry, extractLocation } from '../../utils/keywordExtractor';

// Force dynamic rendering for streaming
export const dynamic = 'force-dynamic';
// Remove runtime export - let Vercel handle it automatically

/**
 * API route handler for business name generation
 * This is modeled after the successful implementation in epicbusinessnames
 */
export async function POST(request) {
  
  try {
    // Parse the request body
    const body = await request.json();
    const { query } = body;
    
    // Extract the business name keyword from the query
    const businessName = extractKeyword(query);
    
    if (!businessName) {
      console.error("No business name found in input");
      return NextResponse.json({ message: 'Business name not found in input' }, { status: 400 });
    }

    // Get industry from the query if available
    const industry = extractIndustry(query);
    
    // Check if OpenAI API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key not found in environment variables");
      return NextResponse.json({ message: 'OpenAI API key not found in environment variables' }, { status: 500 });
    }
    
    // Initialize OpenAI with API key
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create the prompt for business name generation
    let prompt;
    if (industry) {
      prompt = `Generate 100 unique brandable names for a ${industry} business focused on "${businessName}". The names should be relevant to the ${industry} industry and appropriate for this type of business.`;
    } else {
      prompt = `Generate 100 unique brandable names for the business described in the user input "${businessName}"`;
    }

    // Set up messages for OpenAI
    const article_messages = [
      {
        role: 'system',
        content: 'You are a helpful assistant that generates complete business name suggestions. Each name must be a complete business name of 1-3 words maximum. Place each business name on its own separate line with no additional text. Do not number the names, add prefixes, explanations, or descriptions. Each line should contain EXACTLY ONE complete business name and nothing else. Do not truncate or abbreviate names - each name should be complete. Ensure each business name makes sense as a standalone brand name.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];


    // Use OpenAI to generate the business names with streaming
    const { textStream } = await streamText({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o"),
      temperature: 1.0,
      maxTokens: 2046,
      messages: article_messages,
    });


    // Create encoder for SSE format
    const encoder = new TextEncoder();
    
    // Create a ReadableStream for proper Vercel streaming
    const stream = new ReadableStream({
      async start(controller) {
        try {
          
          // Process the text stream
          for await (const textPart of textStream) {
            if (textPart) {
              
              // Encode and send as SSE format
              const encodedTextPart = encodeURIComponent(textPart);
              const sseMessage = `data: ${encodedTextPart}\n\n`;
              controller.enqueue(encoder.encode(sseMessage));
              
              // Small delay for network throughput optimization
              await new Promise(resolve => setTimeout(resolve, 20));
            } else {
              break;
            }
          }
        } catch (error) {
          console.error("Error while processing the text stream:", error);
          controller.error(error);
        } finally {
          // Send a final newline to indicate the end of the stream
          const encodedTextPart = encodeURIComponent(`\n`);
          const finalMessage = `data: ${encodedTextPart}\n\n`;
          controller.enqueue(encoder.encode(finalMessage));
          controller.close();
        }
      }
    });
    
    // Return the streaming response with proper SSE headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable Nginx buffering
        'Transfer-Encoding': 'chunked', // Enable chunked transfer
      },
    });
  } catch (error) {
    console.error("Error in BNG generate endpoint:", error);
    
    // Provide more specific error messages based on the error type
    if (error.message?.includes('API key')) {
      return NextResponse.json({ 
        error: 'OpenAI API key error. Please check your .env.local file and ensure the key is valid.', 
        detail: error.message 
      }, { status: 401 });
    } else if (error.message?.includes('rate limit')) {
      return NextResponse.json({ 
        error: 'OpenAI API rate limit exceeded. Please try again later or use a different API key.', 
        detail: error.message 
      }, { status: 429 });
    } else if (error.message?.includes('quota') || error.message?.includes('exceeded your current quota')) {
      return NextResponse.json({ 
        error: 'OpenAI API quota exceeded. Please check your account billing status.', 
        detail: error.message 
      }, { status: 402 });
    }
    
    // Default generic error
    return NextResponse.json({ 
      error: 'Error generating business names with OpenAI', 
      detail: error.message 
    }, { status: 500 });
  }
}