// app/api/completion/route.js
export const runtime = 'edge';

import { streamText } from "ai"
import { createOpenAI } from '@ai-sdk/openai';

const system_message = `
You are an AI assistant specialized in helping users create comprehensive business plans. Your role is to provide templates with sample answers for specific sections of a business plan as requested by the user.

When the user specifies a section of the business plan and includes details about the company (name, description, city, and state), you should:

1. Understand the context of the given section and the company details.
2. Provide a template for that section, with placeholders for the user to fill in.
3. Include sample answers that are relevant to the company's industry and details.
4. Ensure the template and sample answers are specific to the business plan section and incorporate the company details where appropriate.
5. Include prompts or questions to guide the user in filling out the template.

Remember to:
- Be professional and business-focused
- Provide practical, actionable content
- Use proper business terminology
- Include relevant industry insights when applicable
- Format the response clearly with appropriate headings and structure
`;

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      system: system_message,
      messages,
      temperature: 0.7,
      maxTokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Completion API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}