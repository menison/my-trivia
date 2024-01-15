// GameService.ts
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { fetchTriviaQuestions, TriviaQuestion } from "./useApiService";
import { shuffleArray } from "../utils";

export interface GameState {
  currentQuestionIndex: number;
  numOfQuestions: number;
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
  handleGoHomeOrRestart: () => void;
  timer: number;
  startTimer: () => void;
  resetTimer: () => void;
  fetchQuestions: () => Promise<void>;
  getCurrentQuestion: () => TriviaQuestion;
  // getAnswerChoices: () => string[];
  getAnswerChoices: string[];
  getAnswerFeedback: () => Array<{
    choice: string;
    isCorrect: boolean;
    isSelected: boolean;
  }>;
  isAnyAnswerSelected: boolean;
  questionsFetched: boolean;
  setNumOfQuestions: Dispatch<SetStateAction<number>>;
  setDifficulty: Dispatch<SetStateAction<string>>;
  difficulty: string;
  isFiftyUsed: boolean;
  setIsFiftyUsed: React.Dispatch<React.SetStateAction<boolean>>;
  numFiftyLeft: number;
  setNumFiftyLeft: Dispatch<SetStateAction<number>>;
  snackbarOpen: boolean;
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  snackbarMessage: string;
  setSnackbarMessage: Dispatch<SetStateAction<string>>;
  getActualNumOfQuestions: () => number;
}

export const useGameState = (
  totalQuestions: number,
  initialScore: number,
  difficultyLevel: string
): GameState => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [showLoading, setShowLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(totalQuestions);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [isAnyAnswerSelected, setIsAnyAnswerSelected] = useState(false);
  const [numOfQuestions, setNumOfQuestions] = useState(totalQuestions);
  const [difficulty, setDifficulty] = useState(difficultyLevel);
  const [isFiftyUsed, setIsFiftyUsed] = useState<boolean>(false);
  const [numFiftyLeft, setNumFiftyLeft] = useState<number>(numOfQuestions);
  // const [numFiftyLeft, setNumFiftyLeft] = useState<number>(numOfQuestions / 5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const startTimer = () => {
    setTimer(totalQuestions * 30);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    console.log("useEffect from timer");
    return () => clearInterval(timerInterval);
  }, [timer]);

  const fetchQuestions = async () => {
    try {
      setShowLoading(true);
      const triviaQuestions: TriviaQuestion[] = await fetchTriviaQuestions(
        totalQuestions,
        "easy"
      );

      setQuestionsFetched(true);
      setShowLoading(false);
      setQuestions(triviaQuestions);
    } catch (error) {
      console.error("Error fetching trivia questions:", error);
      setShowLoading(false);
    }
  };

  const getCurrentQuestion = (): TriviaQuestion => {
    return questions[currentQuestionIndex];
  };

  const getActualNumOfQuestions = (): number => {
    return questions.length;
  }

  // const getAnswerChoices = (): string[] => {
  //   const currentQuestionData = questions[currentQuestionIndex];
  //   if (!currentQuestionData) return [];
  //   const { correctAnswer, incorrectAnswers } = currentQuestionData;
  //   if (!correctAnswer || !incorrectAnswers || !Array.isArray(incorrectAnswers))
  //     return [];
  //   return [correctAnswer, ...incorrectAnswers];
  // };

  const getAnswerChoices = useMemo(() => {
    const currentQuestionData = questions[currentQuestionIndex];
    if (!currentQuestionData) return [];
    const { correctAnswer, incorrectAnswers } = currentQuestionData;
    if (!correctAnswer || !incorrectAnswers || !Array.isArray(incorrectAnswers)) return [];
    return shuffleArray([correctAnswer, ...incorrectAnswers]);
  }, [currentQuestionIndex, questions]);

  const getAnswerFeedback = (): Array<{
    choice: string;
    isCorrect: boolean;
    isSelected: boolean;
  }> => {
    const feedback = getAnswerChoices.map((choice) => ({
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

  const resetNumFiftyLeft = () => {
    setNumFiftyLeft(numOfQuestions/5);
  }

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

  const handleGoHomeOrRestart = () => {
    setIsGameOver(false);
    setShowLoading(true);
    setIsAnyAnswerSelected(false);
    setCurrentQuestionIndex(0);
    setScore(initialScore);
    setShowLoading(false);
    setQuestionsFetched(false);
    setIsFiftyUsed(false);
    resetNumFiftyLeft();
  };

  return {
    currentQuestionIndex,
    numOfQuestions,
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
    handleGoHomeOrRestart,
    timer,
    startTimer,
    resetTimer,
    fetchQuestions,
    getCurrentQuestion,
    getAnswerChoices,
    getAnswerFeedback,
    isAnyAnswerSelected,
    questionsFetched,
    setNumOfQuestions,
    setDifficulty,
    difficulty,
    isFiftyUsed,
    setIsFiftyUsed,
    numFiftyLeft,
    setNumFiftyLeft,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    setSnackbarMessage,
    getActualNumOfQuestions,
  };
};

