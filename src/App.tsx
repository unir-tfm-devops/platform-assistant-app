import React from 'react';
import './styles/App.css';
import Chat from './pages/Chat';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Chat />
    </div>
  );
};

export default App;
