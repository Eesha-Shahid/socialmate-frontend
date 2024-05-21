import React, { useState } from 'react';
import './styles.css'; // Importing the CSS file
import { sendQuery } from './chatbot';
import { Button, Divider, Spin } from 'antd'; // Import Spin component from Ant Design

interface ChatMessage {
  query: string;
  response: string;
}

const Chat: React.FC = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const storedChatHistory = localStorage.getItem('chatHistory');
    return storedChatHistory ? JSON.parse(storedChatHistory) : [];
  });
  const [loading, setLoading] = useState(false); // State to indicate whether response is loading

  const handleSend = async () => {
    if (query.trim() === '') return;

    try {
      setLoading(true); // Set loading to true before sending the query
      const result = await sendQuery(query);
      const newChatMessage: ChatMessage = { query, response: result.answer };
      const updatedChatHistory = [...chatHistory, newChatMessage];
      setChatHistory(updatedChatHistory);
      localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
      setQuery('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading to false after receiving the response
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with the Bot</div>
      <div className="chat-body">
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <p className='query'><strong>You -</strong> {chat.query}</p>
            <p className='response'><strong>Bot -</strong> {chat.response}</p>
            <Divider />
          </div>
        ))}
      </div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your query here..."
      />
      <Button className='send-btn' type='primary' color='white' onClick={handleSend} disabled={loading}>
        {loading ? <Spin /> : 'Send'}
      </Button>
    </div>
  );
};

export default Chat;
