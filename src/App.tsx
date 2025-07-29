import React, { useState } from 'react';
import './styles/App.css';
import Chat from './pages/Chat';
import Home from './pages/Home';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartChat = () => {
    setIsAnimating(true);
    // Add a small delay to allow the slide-out animation to complete
    setTimeout(() => {
      setIsChatOpen(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleBackToHome = () => {
    setIsAnimating(true);
    // Add a small delay to allow the slide-out animation to complete
    setTimeout(() => {
      setIsChatOpen(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {isChatOpen ? (
        <div className={`animate-slide-in ${isAnimating ? 'animate-slide-out' : ''}`}>
          <Chat onBackToHome={handleBackToHome} />
        </div>
      ) : (
        <div className={`animate-slide-in ${isAnimating ? 'animate-slide-out' : ''}`}>
          <Home onStartChat={handleStartChat} />
        </div>
      )}
    </div>
  );
};

export default App;
