// GameService.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTriviaQuestions, TriviaQuestion } from './ApiFetchService';

export interface GameService {
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
  startTimer: () => void;
  resetTimer: () => void;
  fetchQuestions: () => Promise<void>;
  getCurrentQuestion: () => TriviaQuestion;
  getAnswerChoices: () => string[];
  getAnswerFeedback: () => Array<{ choice: string; isCorrect: boolean; isSelected: boolean }>
  isAnyAnswerSelected: boolean;
  questionsFetched: boolean;
}

export const useGameService = (totalQuestions: number, initialScore: number): GameService => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [showLoading, setShowLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(totalQuestions);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [isAnyAnswerSelected, setIsAnyAnswerSelected] = useState(false);

  const startTimer = () => {
    setTimer(totalQuestions*30);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const fetchQuestions = async () => {
    try {
      setShowLoading(true);
      const triviaQuestions: TriviaQuestion[] = await fetchTriviaQuestions(totalQuestions, 'easy');
      setQuestionsFetched(true);
      setShowLoading(false);
      setQuestions(triviaQuestions);
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
      setShowLoading(false);
    }
  };

  const getCurrentQuestion = (): TriviaQuestion => {
    return questions[currentQuestionIndex];
  };

  const getAnswerChoices = (): string[] => {
    const currentQuestionData = questions[currentQuestionIndex];
    if (!currentQuestionData) return [];
    const { correctAnswer, incorrectAnswers } = currentQuestionData;
    if (!correctAnswer || !incorrectAnswers || !Array.isArray(incorrectAnswers)) return [];
    return [correctAnswer, ...incorrectAnswers];
  };

  const getAnswerFeedback = (): Array<{ choice: string; isCorrect: boolean; isSelected: boolean }> => {
    const feedback = getAnswerChoices().map((choice) => ({
      choice,
      isCorrect: choice === getCurrentQuestion().correctAnswer,
      isSelected: choice === getCurrentQuestion().selectedAnswer,
    }));
    return feedback;
  };

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
    setIsAnyAnswerSelected(true);
    
    if (selectedAnswer === correctAnswer) {
      increaseScore();
    }
  };

  const handleNextQuestion = () => {
    setIsAnyAnswerSelected(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // const commonOperations = () {

  // }
  const handleRestartGame = async () => {
    setShowLoading(true);
    setIsAnyAnswerSelected(false);
    setIsGameOver(false);
    setCurrentQuestionIndex(0);
    setScore(initialScore);
    setShowLoading(false);
    setQuestionsFetched(false);
  };

  const handleGoHome = () => {
    setIsGameOver(false);
    setShowLoading(true);
    setIsAnyAnswerSelected(false);
    setCurrentQuestionIndex(0);
    setScore(initialScore);
    setShowLoading(false);
    setQuestionsFetched(false);
    navigate('/');
  };

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
    startTimer,
    resetTimer,
    fetchQuestions,
    getCurrentQuestion,
    getAnswerChoices,
    getAnswerFeedback,
    isAnyAnswerSelected,
    questionsFetched,
  };
};
