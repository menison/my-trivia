import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, CardContent, Container, Grid } from '@mui/material';
import QuestionCard from '../components/QuestionCard';
import ScoreCard from '../components/ScoreCard';
import ResultModal from '../components/ResultModal';
import { TriviaQuestion, fetchTriviaQuestions } from '../services/TriviaService';
import { useGameService } from '../services/GameService';
import QProgress from '../components/QProgress';
import Loading from '../components/Loading';

const TriviaGamePage: React.FC = () => {
  const numQuestionsToFetch = 10;
  const difficultyToFetch = 'easy';
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState<Array<{ choice: string; isCorrect: boolean; isSelected: boolean }>>([]);
  
  const gameService = useGameService(numQuestionsToFetch, 0);

  useEffect(() => {
    const fetchQuestionsEffect = async () => {
      try {
        gameService.setShowLoading(true);
        const triviaQuestions: TriviaQuestion[] = await fetchTriviaQuestions(numQuestionsToFetch, difficultyToFetch);
        setQuestions(triviaQuestions);
        gameService.setShowLoading(false);
      } catch (error) {
        console.log('fetching error');
        console.error(error);
        gameService.setShowLoading(false);
      }
    };
    fetchQuestionsEffect();
  }, [gameService.isGameOver]);

  const getAnswerChoices = useMemo(() => {
    const currentQuestionData = questions[gameService.currentQuestionIndex];
    if (!currentQuestionData) return [];
    const { correctAnswer, incorrectAnswers } = currentQuestionData;
    if (!correctAnswer || !incorrectAnswers || !Array.isArray(incorrectAnswers)) return [];
    return [correctAnswer, ...incorrectAnswers];
  }, [gameService.currentQuestionIndex, questions]);

  const answerChoices = getAnswerChoices;

  const handleAnswerClick = (selectedAnswer: string) => {
    const currentQuestionData = questions[gameService.currentQuestionIndex];
    setIsAnswerSelected(true);
    const feedback = answerChoices.map((choice) => ({
      choice,
      isCorrect: choice === currentQuestionData.correctAnswer,
      isSelected: choice === selectedAnswer,
    }));
    gameService.handleAnswerClick(selectedAnswer, currentQuestionData.correctAnswer);
    setAnswerFeedback(feedback);
  };

  const handleNextQuestion = () => {
    setIsAnswerSelected(false);

    if (gameService.currentQuestionIndex >= numQuestionsToFetch - 1) {
      setShowResultModal(true);
      gameService.setIsGameOver(true);
    } else {
      gameService.handleNextQuestion();
    }
  };

  const handleRestartGame = async () => {
    try {
      gameService.setShowLoading(true);
      const triviaQuestions: TriviaQuestion[] = await fetchTriviaQuestions(numQuestionsToFetch, difficultyToFetch);
      setQuestions(triviaQuestions);
      gameService.setShowLoading(false);
    } catch (error) {
      console.log('fetching error');
      console.error(error);
      gameService.setShowLoading(false);
    }
    setShowResultModal(false);
    gameService.setIsGameOver(false);
    gameService.handleRestartGame();
  };

  const handleGoHome = () => {
    setShowResultModal(false);
    gameService.setIsGameOver(false);
    gameService.handleGoHome();
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ScoreCard score={gameService.getScore()} />
        </Grid>
        <Grid item xs={12}>
          <QProgress questionsLeft={numQuestionsToFetch - gameService.currentQuestionIndex} totalQuestions={numQuestionsToFetch} />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ width: 700, height: 350, borderRadius: 5 }}>
            <CardContent sx={{ width: 600, height: 800, borderRadius: 5 }}>
              <Container>
                <Grid container justifyContent="center" align-items="center">
                  <QuestionCard
                    question={questions[gameService.currentQuestionIndex]?.question}
                    category={questions[gameService.currentQuestionIndex]?.category}
                    answerChoices={answerChoices}
                    onAnswerClick={handleAnswerClick}
                    answerFeedback={answerFeedback}
                  />
                </Grid>
              </Container>
              <Grid item xs={12}>
                <Button fullWidth onClick={handleNextQuestion} disabled={!isAnswerSelected}>
                  Next
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ResultModal open={showResultModal} score={gameService.getScore() ?? 0} onRestart={handleRestartGame} onGoHome={handleGoHome} />
      <Loading showLoading={gameService.showLoading} onClose={() => {gameService.setShowLoading(false); setShowResultModal(false);}} />
    </Container>
  );
};

export default TriviaGamePage;
