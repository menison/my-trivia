import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Grid, Snackbar, Stack } from '@mui/material';
import QuestionCard from '../components/QuestionCard';
import ScoreCard from '../components/ScoreCard';
import GameEndModal from '../components/GameEndModal';
import { TriviaQuestion, fetchTriviaQuestions } from '../services/TriviaService';
import { useGameService } from '../services/GameService';
import { useLocation } from 'react-router-dom';
import { createTimerService } from '../services/TimerService';
import MyTimer from '../components/QProgress';
import QProgress from '../components/QProgress';
import '../index.css'

const TriviaGamePage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const numQuestionsParam = searchParams.get('numQuestions');
  const difficultyParam = searchParams.get('difficulty');

  const numQuestionsToFetch = numQuestionsParam ? parseInt(numQuestionsParam, 10) : 5;
  const difficultyToFetch = difficultyParam || 'easy';

  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showEndModal, setShowEndModal] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState<Array<{ choice: string; isCorrect: boolean; isSelected: boolean }>>([]);
 
  useEffect(() => {
    const fetchQuestionsEffect = async () => {
      try {
        const triviaQuestions: TriviaQuestion[] = await fetchTriviaQuestions(numQuestionsToFetch, difficultyToFetch);
        setQuestions(triviaQuestions);
      } catch (error) {
        console.log('fetching error');
        console.error(error);
      }
    };

    fetchQuestionsEffect();
  }, [numQuestionsToFetch, difficultyToFetch]);

  const getAnswerChoices = () => {
    const currentQuestionData = questions[currentQuestion];
    if (!currentQuestionData) return [];

    const { correctAnswer, incorrectAnswers } = currentQuestionData;
    if (!correctAnswer || !incorrectAnswers || !Array.isArray(incorrectAnswers)) return [];

    //return shuffleArray([correctAnswer, ...incorrectAnswers]);
    return [correctAnswer, ...incorrectAnswers]
  };

  const answerChoices = getAnswerChoices();
  const gameService = useGameService(questions.length, 0);


  //AnswerClicked Handler
  const handleAnswerClick = (selectedAnswer: string) => {
    const currentQuestionData = questions[currentQuestion];
  
    // Update the score first
    if (selectedAnswer === currentQuestionData.correctAnswer) {
      gameService.increaseScore();
      console.log('correct answer');
    } else {
      console.log('WRONG answer');
    }
    setScore(gameService.getScore());
    
    const feedback = answerChoices.map((choice) => ({
      choice,
      isCorrect: choice === currentQuestionData.correctAnswer,
      isSelected: choice === selectedAnswer,
    }));
    
    setAnswerFeedback(feedback);

    // Check if it's the last question
    // if (currentQuestion >= questions.length-1) {
    //   // If the current question is the last one, set the final score and show the modal
    //   setShowEndModal(true);
    // } else {
    //   // If there are more questions, proceed to the next question and reset the timer
    //   gameService.nextQuestion();
    //   setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    // }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    // Check if it's the last question
    if (currentQuestion >= questions.length-1) {
      // If the current question is the last one, set the final score and show the modal
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setShowEndModal(true);
    } else {
      // If there are more questions, proceed to the next question and reset the timer
      gameService.nextQuestion();
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };
  
  const handleRestartGame = () => {
    //go to results page probably
    gameService.resetScore();
    setScore(0);
    setCurrentQuestion(0);
    setShowEndModal(false);
  };

  //Shuffle the answerChoices array
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <>
      <Container className="con">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <ScoreCard score={gameService.getScore()} />
          </Grid>
          <Grid className="progressBarContainer" item xs={12}>
            <QProgress questionsLeft={numQuestionsToFetch-currentQuestion} totalQuestions={numQuestionsToFetch} />
          </Grid>
          <Grid className="con">
            <QuestionCard
              question={questions[currentQuestion]?.question}
              category={questions[currentQuestion]?.category} 
              answerChoices={answerChoices}
              onAnswerClick={handleAnswerClick}
              answerFeedback={answerFeedback}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleNextQuestion}>Next</Button>
          </Grid>
        </Grid>
        <GameEndModal open={showEndModal} score={gameService.getScore() ?? 0} onClose={() => handleRestartGame()} />
      </Container>
    </>
  );
};

export default TriviaGamePage;
