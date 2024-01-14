// GameService.ts
import { useEffect, useState } from 'react';
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
  timer: number;
  resetTimer: () => void;
}

export const useGameService = (totalQuestions: number, initialScore: number): GameService => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [showLoading, setShowLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const navigate = useNavigate();
  const INIT_TIMER_VAL = totalQuestions*30;

  const [timer, setTimer] = useState(INIT_TIMER_VAL);

  const startTimer = () => {
    setTimer(INIT_TIMER_VAL);
  };

  const resetTimer = () => {
    setTimer(0);
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      if (timer === 0) {
        setIsGameOver(true);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);
  
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
    startTimer();
  };

  const handleGoHome = () => {
    setShowLoading(true);
    setCurrentQuestionIndex(0);
    setScore(initialScore);
    setShowLoading(false);
    navigate('/');
    startTimer();
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
    timer,
    resetTimer,
  };
};
