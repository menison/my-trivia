import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TriviaGame from './pages/TriviaGame';
import Settings from './pages/Settings';
import { useGameState } from './hooks/useGameState';

const App: React.FC = () => {
  const gameService = useGameState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Settings gameService={gameService} />} />
        <Route path="/game" element={<TriviaGame gameService={gameService}/>} />
      </Routes>
    </Router>
  );
};

export default App;
