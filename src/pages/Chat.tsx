import React, { useState, useEffect } from 'react';
import { ChatHeader, ChatMessages, ChatInput } from '../components';
import { Message } from '../types/chat';
import { generateMessageId, generateConversationId } from '../utils/idUtils';
import { callChatAPI } from '../utils/apiUtils';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');

  const startNewSession = () => {
    const newConversationId = generateConversationId();
    setConversationId(newConversationId);
    setMessages([{
      id: generateMessageId(),
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  useEffect(() => {
    startNewSession();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateMessageId(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const botResponse = await callChatAPI(userMessage.text, conversationId);
      
      const botMessage: Message = {
        id: generateMessageId(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: generateMessageId(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-full border-2 border-gray-200 rounded-lg shadow-lg bg-white flex flex-col overflow-hidden">
        <ChatHeader 
          conversationId={conversationId}
          onNewSession={startNewSession}
        />
        
        <ChatMessages 
          messages={messages}
          isTyping={isTyping}
        />
        
        <ChatInput
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default Chat; 