import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TriviaGamePage from './pages/TriviaGamePage';
import StartPage from './pages/StartPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<TriviaGamePage />} />
      </Routes>
    </Router>
  );
};



export default App;
