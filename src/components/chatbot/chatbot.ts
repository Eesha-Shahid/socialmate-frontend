// api/chatbot.ts
import axios from 'axios';

const API_URL = 'http://localhost:9000/query';

interface ChatResponse {
  answer: string;
}

export const sendQuery = async (query: string): Promise<ChatResponse> => {
  try {
    const response = await axios.post<ChatResponse>(API_URL, { query });
    return response.data;
  } catch (error) {
    console.error('Error sending query:', error);
    throw error;
  }
};
