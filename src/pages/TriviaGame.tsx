// TriviaGamePage.tsx
import React from 'react';
import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import QuestionCard from '../components/QuestionCard';
import ScoreCard from '../components/ScoreCard';
import ResultModal from '../components/ResultModal';
import { GameState } from '../hooks/useGameState';
import QProgress from '../components/QProgress';
import Loading from '../components/Loading';
import '../index.css';
import { useNavigate } from 'react-router-dom';

interface TriviaGameProps{
  gameService: GameState;
}

const TriviaGame: React.FC<TriviaGameProps> = ({gameService}) => {
  const navigate = useNavigate();
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
    if (gameService.currentQuestionIndex >= gameService.numOfQuestions - 1) {
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
    navigate('/');
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
          <QProgress questionsLeft={gameService.numOfQuestions - gameService.currentQuestionIndex} totalQuestions={gameService.numOfQuestions} />
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
                  {gameService.currentQuestionIndex < gameService.numOfQuestions - 1 ? 'Next' : 'Finish'}
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

export default TriviaGame;
