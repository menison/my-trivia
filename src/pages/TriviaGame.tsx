import React from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import QuestionCard from "../components/QuestionCard";
import ScoreCard from "../components/ScoreCard";
import ResultModal from "../components/ResultModal";
import QProgress from "../components/QProgress";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/gameContext";

const TriviaGame: React.FC = () => {
  const navigate = useNavigate();
  const gameService = useGameContext();
  
  React.useEffect(() => {
    console.log(gameService.numOfQuestions, gameService.difficulty);
    const fetchQuestions = async () => {
      await gameService.fetchQuestions();
      gameService.startTimer();
    };
    if (
      !gameService.questionsFetched &&
      !gameService.showLoading &&
      !gameService.isGameOver
    ) {
      fetchQuestions();
    }
  },[gameService.questionsFetched] );

  const handleAnswerClick = (selectedAnswer: string) => {
    const currentQuestionData = gameService.getCurrentQuestion();
    currentQuestionData.selectedAnswer = selectedAnswer;
    gameService.handleAnswerClick(
      selectedAnswer,
      currentQuestionData.correctAnswer
    );
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
    gameService.setIsFiftyUsed(false);
  };

  const handleRestartGame = async () => {
    await gameService.handleGoHomeOrRestart();
    gameService.setSnackbarOpen(false);
  };

  const handleGoHome = () => {
    gameService.handleGoHomeOrRestart();
    gameService.setSnackbarOpen(false);
    navigate("/");
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ScoreCard score={gameService.getScore()} />
          <Typography variant="h6" component="div">
            Time Left:{" "}
            {Math.floor(gameService.timer / 60)
              .toString()
              .padStart(2, "0")}
            :{(gameService.timer % 60).toString().padStart(2, "0")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <QProgress
            questionsLeft={
              gameService.numOfQuestions - gameService.currentQuestionIndex
            }
            totalQuestions={gameService.numOfQuestions}
          />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ width: 700, height: 350, borderRadius: 5 }}>
            <CardContent sx={{ width: 600, height: 800, borderRadius: 5 }}>
              <Grid container justifyContent="center" align-items="center">
                <QuestionCard
                  onAnswerClick={handleAnswerClick}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  onClick={handleNextQuestion}
                  disabled={!gameService.isAnyAnswerSelected}
                >
                  {gameService.currentQuestionIndex <
                  gameService.numOfQuestions - 1
                    ? "Next"
                    : "Finish"}
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
      <Loading
        showLoading={gameService.showLoading}
        onClose={() => gameService.setShowLoading(false)}
      />
    </Container>
  );
};

export default TriviaGame;
