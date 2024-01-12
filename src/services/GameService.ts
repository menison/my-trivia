import { useState } from 'react';

interface GameService {
  currentQuestionIndex: number;
  totalQuestions: number;
  nextQuestion: () => void;
  increaseScore: () => void;
  getScore: () => number;
  resetScore: () => void;
}

export const useGameService = (totalQuestions: number, initialScore: number): GameService => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(initialScore);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const increaseScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const getScore = () => {
    return score;
  };

  const resetScore = () => {
    setCurrentQuestionIndex(0);
    setScore(initialScore);
  };

  return {
    currentQuestionIndex,
    totalQuestions,
    nextQuestion,
    increaseScore,
    getScore,
    resetScore,
  };
};
