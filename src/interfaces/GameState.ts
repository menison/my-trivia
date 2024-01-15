import { Dispatch, SetStateAction } from "react";
import {TriviaQuestion} from '../interfaces/TriviaQuestion'

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