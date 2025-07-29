import React from 'react';
import Button from './Button';

interface ChatHeaderProps {
  conversationId: string;
  onNewSession: () => void;
  onBackToHome: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ conversationId, onNewSession, onBackToHome }) => {
  return (
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
            onClick={onBackToHome}
            variant="secondary"
            size="small"
            className="text-white border-white/30 hover:bg-white/20"
          >
            Back to Home
          </Button>
          <Button
            onClick={onNewSession}
            variant="secondary"
            size="small"
            className="text-white border-white/30 hover:bg-white/20"
          >
            New Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader; 