import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TriviaGame from './pages/TriviaGame';
import Settings from './pages/Settings';
import { GameProvider } from './context/gameContext';

const App: React.FC = () => {
  return (
    <Router>
      <GameProvider>
      <Routes>
        <Route path="/" element={<Settings  />} />
        <Route path="/game" element={<TriviaGame />} />
      </Routes>
      </GameProvider>
    </Router>
  );
};

export default App;
