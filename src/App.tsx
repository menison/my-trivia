import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TriviaGamePage from './pages/TriviaGamePage';
import LandingPage from './pages/LandingPage';
import ResultPage from './pages/ResultPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<TriviaGamePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};



export default App;
