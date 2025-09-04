```bash
npm install
```

## Configuration

1. Create a `.env.local` file in the root directory with your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o
```

You can copy the example configuration file:

```bash
cp .env.local.sample .env.local
```

Then edit the file to add your actual OpenAI API key.

You can verify your configuration is correct by running:

```bash
node tools/check-env.js
```

**Important Note:** The Business Name Generator requires a valid OpenAI API key to function. Without a valid API key, the generator will display an error message.

2. Run the development server:

```bash
npm run dev
```

This will start the Next.js server at [http://localhost:3000](http://localhost:3000).

## Features

The following features are added to the Business Center:
- 1. Business Plan Generator
- 2. Operating Agreement
- 3. Business Name Generator

## Business Name Generator

The Business Name Generator creates business name suggestions based on the user's business type, industry, and location. The system:

- Generates up to 100 unique business name suggestions
- Uses OpenAI's GPT models for context-aware name generation (when configured)
- Suggests domain extensions for each business name
- Streams results in real-time for a smooth user experience
- Provides contextually relevant names based on industry and location

The implementation uses Next.js App Router API routes for the backend functionality, ensuring a fast and reliable experience.

### Technical Details

- Streaming API: Uses Server-Sent Events (SSE) for real-time name streaming
- Rate Limiting: Implements a smooth delivery mechanism to present names gradually
- Error Handling: Comprehensive error handling for network issues, timeouts, and API failures
- Contextual Awareness: Uses industry and location for more relevant name generation
- OpenAI Integration: Uses OpenAI's powerful language models for high-quality business name generation

## Troubleshooting

If you encounter issues with the Business Name Generator:

1. **API Key Configuration**:
   - Check the `.env.local` file for the proper OpenAI API key format
   - The key should be prefixed with `OPENAI_API_KEY=` with no spaces
   - Even without an API key, the generator will use a fallback mechanism

2. **No Business Names Appearing**:
   - Check the browser console (F12) for error messages
   - Verify your input contains a valid business keyword
   - If you see "Checking domains..." but no names, try refreshing and trying again
   - Make sure you're running the latest version of the code

3. **Debug Mode**:
   - Add `?debug=1` to the URL to enable debug mode (e.g., `http://localhost:3000/?debug=1`)
   - Debug mode shows additional information about the request and response
   - This can help identify issues with the API or response processing

4. **Common Errors and Solutions**:

   | Error | Solution |
   |-------|----------|
   | "Request timed out" | Try again with a simpler business keyword |
   | "Failed to generate business names" | Check your internet connection and API key |
   | "OpenAI API key not configured" | Add your key to `.env.local` file and restart the server |
   | "Cannot read properties of undefined" | Clear browser cache and refresh the page |

5. **Testing the API Directly**:
   You can test the API endpoint directly using the included test tool:
   ```bash
   node tools/test-api.js "coffee shop"
   ```
   This bypasses the frontend and helps identify if the issue is in the API or UI.

6. **Still Having Issues?**:
   - Verify your OpenAI API key is valid and has sufficient quota remaining
   - Check if your API key has rate limiting issues
   - Try using a different OpenAI model by setting `OPENAI_MODEL` in your `.env.local` file
   - Restart the development server with `npm run dev`
   - Clear browser cache and cookies