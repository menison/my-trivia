// GameContext.ts
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchTriviaQuestions } from "../services/apiService";
import { shuffleArray } from "../utils";
import { IGameContext } from "../interfaces/IGameContext";
import { ITriviaQuestion } from "../interfaces/ITriviaQuestion";

interface GameContextProps {
  children: React.ReactNode;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

export const useGameContext = (): IGameContext => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<GameContextProps> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(10 * 30);
  const [questions, setQuestions] = useState<ITriviaQuestion[]>([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [isAnyAnswerSelected, setIsAnyAnswerSelected] = useState(false);
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");
  const [isFiftyUsed, setIsFiftyUsed] = useState<boolean>(false);
  const [numFiftyLeft, setNumFiftyLeft] = useState<number>(numOfQuestions / 5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const startTimer = () => {
    setTimer(numOfQuestions * 30);
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
      const triviaQuestions: ITriviaQuestion[] = await fetchTriviaQuestions(
        numOfQuestions,
        difficulty
      );

      setQuestionsFetched(true);
      setShowLoading(false);
      setQuestions(triviaQuestions);
    } catch (error) {
      console.error("Error fetching trivia questions:", error);
      setShowLoading(false);
    }
  };

  const getCurrentQuestion = (): ITriviaQuestion => {
    return questions[currentQuestionIndex];
  };

  const getActualNumOfQuestions = (): number => {
    return questions.length;
  };

  const getAnswerChoices = useMemo(() => {
    const currentQuestionData = questions[currentQuestionIndex];
    if (!currentQuestionData) return [];
    const { correctAnswer, incorrectAnswers } = currentQuestionData;
    if (!correctAnswer || !incorrectAnswers || !Array.isArray(incorrectAnswers))
      return [];
    // return shuffleArray([correctAnswer, ...incorrectAnswers]);
    return [correctAnswer, ...incorrectAnswers];
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
    setScore(0);
  };

  const resetNumFiftyLeft = () => {
    setNumFiftyLeft(numOfQuestions / 5);
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

  const handleGoHomeOrRestart = () => {
    setIsGameOver(false);
    setShowLoading(true);
    setIsAnyAnswerSelected(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowLoading(false);
    setQuestionsFetched(false);
    setIsFiftyUsed(false);
    resetNumFiftyLeft();
  };

  const contextValue: IGameContext = {
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

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
