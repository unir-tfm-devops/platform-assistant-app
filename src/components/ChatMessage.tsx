import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
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
    <div
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
  );
};

export default ChatMessage; 