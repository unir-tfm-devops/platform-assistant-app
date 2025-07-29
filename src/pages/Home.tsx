import React, { useState } from 'react';

interface HomeProps {
  onStartChat: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartChat }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleStartChat = () => {
    setIsButtonClicked(true);
    setIsLoading(true);
    
    // Add a small delay to show the button animation before transitioning
    setTimeout(() => {
      onStartChat();
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
          Talk to your Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in-delay">
          Get instant answers and assistance from your AI platform assistant
        </p>
        <button
          onClick={handleStartChat}
          disabled={isLoading || isButtonClicked}
          className={`
            bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg 
            transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl 
            transform hover:scale-105 active:scale-95
            ${isLoading || isButtonClicked ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}
            ${isButtonClicked ? 'animate-button-click' : 'animate-fade-in-delay-2'}
          `}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Starting...</span>
            </div>
          ) : (
            'Start Chatting'
          )}
        </button>
      </div>
    </div>
  );
};

export default Home; 