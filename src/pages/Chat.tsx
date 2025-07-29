import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from '../components/Button';
import Card from '../components/Card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const generateConversationId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const startNewSession = () => {
    const newConversationId = generateConversationId();
    setConversationId(newConversationId);
    setMessages([{
      id: generateId(),
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  useEffect(() => {
    startNewSession();
  }, []);

  const callChatAPI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationId: conversationId
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response || data.message || 'Sorry, I couldn\'t process your request.';
    } catch (error) {
      console.error('Error calling chat API:', error);
      return 'Sorry, I\'m having trouble connecting to the server. Please check your API configuration.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const botResponse = await callChatAPI(userMessage.text);
      
      const botMessage: Message = {
        id: generateId(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: generateId(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message: Message) => {
    if (message.sender === 'bot') {
      return (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              code: ({ node, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                return !isInline ? (
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-xs" {...props}>
                    {children}
                  </code>
                );
              },
              a: ({ children, href, ...props }: any) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                  {...props}
                >
                  {children}
                </a>
              ),
              ul: ({ children, ...props }: any) => (
                <ul className="list-disc space-y-1 ml-4" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }: any) => (
                <ol className="list-decimal space-y-1 ml-4" {...props}>
                  {children}
                </ol>
              ),
              h1: ({ children, ...props }: any) => (
                <h1 className="text-lg font-bold mb-2" {...props}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }: any) => (
                <h2 className="text-base font-semibold mb-2" {...props}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }: any) => (
                <h3 className="text-sm font-semibold mb-1" {...props}>
                  {children}
                </h3>
              ),
              blockquote: ({ children, ...props }: any) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600" {...props}>
                  {children}
                </blockquote>
              ),
              table: ({ children, ...props }: any) => (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300" {...props}>
                    {children}
                  </table>
                </div>
              ),
              th: ({ children, ...props }: any) => (
                <th className="border border-gray-300 px-2 py-1 bg-gray-100 font-semibold text-left" {...props}>
                  {children}
                </th>
              ),
              td: ({ children, ...props }: any) => (
                <td className="border border-gray-300 px-2 py-1" {...props}>
                  {children}
                </td>
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
      );
    } else {
      return <p className="text-sm">{message.text}</p>;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-full border-2 border-gray-200 rounded-lg shadow-lg bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold">AI Assistant</h1>
                <p className="text-blue-100 text-sm">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-blue-100 text-sm">
                <span className="font-medium">Session:</span> {conversationId}
              </div>
              <Button
                onClick={startNewSession}
                variant="secondary"
                size="small"
                className="text-white border-white/30 hover:bg-white/20"
              >
                New Session
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                {renderMessageContent(message)}
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-lg rounded-bl-none shadow-sm px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
          <div className="flex space-x-2">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 