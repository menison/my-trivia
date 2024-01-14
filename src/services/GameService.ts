// GameService.ts
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface GameService {
  currentQuestionIndex: number;
  totalQuestions: number;
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  nextQuestion: () => void;
  increaseScore: () => void;
  getScore: () => number;
  resetScore: () => void;
  handleAnswerClick: (selectedAnswer: string, correctAnswer: string) => void;
  handleNextQuestion: () => void;
  handleRestartGame: () => Promise<void>;
  handleGoHome: () => void;
}

export const useGameService = (totalQuestions: number, initialScore: number): GameService => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [showLoading, setShowLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const navigate = useNavigate();

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

  const handleAnswerClick = (selectedAnswer: string, correctAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      increaseScore();
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleRestartGame = async () => {
    setShowLoading(true);
    setCurrentQuestionIndex(0);
    setScore(initialScore);
    setShowLoading(false);
  };

  const handleGoHome = () => {
    setShowLoading(true);
    setCurrentQuestionIndex(0);
    setScore(initialScore);
    setShowLoading(false);
    navigate('/');
  }

  return {
    currentQuestionIndex,
    totalQuestions,
    showLoading,
    setShowLoading,
    isGameOver,
    setIsGameOver,
    nextQuestion,
    increaseScore,
    getScore,
    resetScore,
    handleAnswerClick,
    handleNextQuestion,
    handleRestartGame,
    handleGoHome,
  };
};
