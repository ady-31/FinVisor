import axios from 'axios';
import { UserId } from './Controllers/authControllers.js';


export let data;
const apiKey = 'fiR1N2mNaCUUS6EGBcZQU59Hra8FM6jN';
const externalUserId = UserId;

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

async function submitQuery(sessionId, query) {
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
    data = response.data
    return data;
  } catch (error) {
    console.error('Error submitting query:', error);
  }
}
export { createChatSession, submitQuery };