import axios from 'axios';
import { UserId } from './Controllers/authControllers.js';

export let data;
// Replace with your actual API key and external user ID
const apiKey = 'fiR1N2mNaCUUS6EGBcZQU59Hra8FM6jN';
const externalUserId = UserId;

// Function to create a chat session
async function createChatSession() {
  try {
    const response = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      {
        pluginIds: [],
        externalUserId: externalUserId
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    return response.data.data.id; // Extract session ID
  } catch (error) {
    console.error('Error creating chat session:', error);
  }
}

// Function to submit a query
async function submitQuery(sessionId) {
  try {
    const response = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query: query,
        pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
        responseMode: 'sync'
      },
      {
        headers: {
          apikey: apiKey
        }
      }
    );
    console.log('Query response:', response.data);
    data = response.data.data.answer;
  } catch (error) {
    console.error('Error submitting query:', error);
  }
}

// Main function to execute the API calls
async function main() {
  const sessionId = await createChatSession();
  if (sessionId) {
    await submitQuery(sessionId);
  }
}

main();
