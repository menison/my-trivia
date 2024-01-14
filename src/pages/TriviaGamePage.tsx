// TriviaGamePage.tsx
import React from 'react';
import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import QuestionCard from '../components/QuestionCard';
import ScoreCard from '../components/ScoreCard';
import ResultModal from '../components/ResultModal';
import { useGameService } from '../services/GameService';
import QProgress from '../components/QProgress';
import Loading from '../components/Loading';
import '../index.css';

const TriviaGamePage: React.FC = () => {
  const numQuestionsToFetch = 10;
  const difficultyToFetch = 'easy';
  const gameService = useGameService(numQuestionsToFetch, 0);

  React.useEffect(() => {
    const fetchQuestions = async () => {
      await gameService.fetchQuestions();
      gameService.startTimer(); 
    };
    if (!gameService.questionsFetched && !gameService.showLoading && !gameService.isGameOver) {
      fetchQuestions();
    }
  }, [gameService.isGameOver]);

  const handleAnswerClick = (selectedAnswer: string) => {
    const currentQuestionData = gameService.getCurrentQuestion();
    currentQuestionData.selectedAnswer = selectedAnswer;
    gameService.handleAnswerClick(selectedAnswer, currentQuestionData.correctAnswer);
  };

  const handleNextQuestion = () => {
    if (gameService.currentQuestionIndex >= numQuestionsToFetch - 1) {
      gameService.setIsGameOver(true);
      gameService.resetTimer();
    } else if (gameService.timer <= 0) {
      gameService.resetTimer();
      gameService.setIsGameOver(true);
    } else {
      gameService.handleNextQuestion();
    }
  };

  const handleRestartGame = async () => {
    await gameService.handleRestartGame();
  };

  const handleGoHome = () => {
    gameService.handleGoHome();
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ScoreCard score={gameService.getScore()} />
          <Typography variant="h6" component="div">
            Time Left: {Math.floor(gameService.timer / 60).toString().padStart(2, '0')}:{(gameService.timer % 60).toString().padStart(2, '0')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <QProgress questionsLeft={numQuestionsToFetch - gameService.currentQuestionIndex} totalQuestions={numQuestionsToFetch} />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ width: 700, height: 350, borderRadius: 5 }}>
            <CardContent sx={{ width: 600, height: 800, borderRadius: 5 }}>
              <Grid container justifyContent="center" align-items="center">
                <QuestionCard
                  question={gameService.getCurrentQuestion()?.question}
                  category={gameService.getCurrentQuestion()?.category}
                  answerChoices={gameService.getAnswerChoices()}
                  onAnswerClick={handleAnswerClick}
                  answerFeedback={gameService.getAnswerFeedback()}
                  gameService={gameService}
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth onClick={handleNextQuestion} disabled={!gameService.isAnyAnswerSelected}>
                  {gameService.currentQuestionIndex < numQuestionsToFetch - 1 ? 'Next' : 'Finish'}
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ResultModal
        open={gameService.isGameOver}
        score={gameService.getScore() ?? 0}
        onRestart={handleRestartGame}
        onGoHome={handleGoHome}
      />
      <Loading showLoading={gameService.showLoading} onClose={() => gameService.setShowLoading(false)} />
    </Container>
  );
};

export default TriviaGamePage;
