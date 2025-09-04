/**
 * Simple utility to check if the environment variables are properly configured
 * Run with: node tools/check-env.js
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Check if OpenAI API key is configured
function checkOpenAIConfig() {
  console.log('Checking OpenAI API configuration...');

  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY is missing in your .env.local file');
    console.log('');
    console.log('Please create or edit .env.local file in the project root with:');
    console.log('OPENAI_API_KEY=your-openai-api-key-here');
    console.log('');
    console.log('You can copy from the template:');
    console.log('cp .env.local.sample .env.local');
    console.log('Then edit the file to add your actual API key.');
    return false;
  }
  
  if (apiKey === 'your-openai-api-key-here') {
    console.error('❌ OPENAI_API_KEY is still set to the default placeholder value');
    console.log('');
    console.log('Please edit your .env.local file and replace the placeholder with your actual OpenAI API key.');
    return false;
  }

  // Check if the key looks like a valid OpenAI key format
  // OpenAI keys typically start with "sk-" followed by a long string
  if (!apiKey.startsWith('sk-')) {
    console.warn('⚠️ OPENAI_API_KEY may not be in the expected format (should start with "sk-")');
    console.log('');
    console.log('This may still work if you are using a custom API key format.');
  } else {
    console.log('✅ OPENAI_API_KEY is properly configured');
  }
  
  // Check for model configuration
  const model = process.env.OPENAI_MODEL;
  if (!model) {
    console.log('ℹ️ OPENAI_MODEL not specified, will use default (gpt-4o)');
  } else {
    console.log(`✅ OPENAI_MODEL is set to: ${model}`);
  }
  
  return true;
}

// Main function to run all checks
function runChecks() {
  console.log('Environment Configuration Check');
  console.log('==============================');
  
  const openaiConfigValid = checkOpenAIConfig();
  
  console.log('');
  console.log('==============================');
  
  if (!openaiConfigValid) {
    console.log('⚠️ Some issues were found with your configuration.');
    console.log('The Business Name Generator requires a valid OpenAI API key to function.');
    console.log('');
    console.log('Please fix the issues above and try again.');
    process.exit(1);
  } else {
    console.log('✅ All necessary environment variables are configured.');
    console.log('Your Business Name Generator should be ready to use!');
  }
}

runChecks();