import React from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Divider,
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
  }, [gameService.questionsFetched]);

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
    <Container className="root-container">
      <Grid className="trivia-main-grid" >
        <Card className="trivia-main-card">
            <CardContent sx={{ maxWidth:'100%', width:'100%'}} >
              <Typography variant="h6" component="div" sx={{marginBottom: '2.5rem'}}>
                <ScoreCard score={gameService.getScore()} />
              </Typography>
              <Divider light sx={{marginBottom: '0.5rem'}}/>
              <Typography variant="h6" component="div" className="timer" sx={{marginBottom: '0.5rem'}}>
                Time Left:{" "}
                {Math.floor(gameService.timer / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(gameService.timer % 60).toString().padStart(2, "0")}
              </Typography>
              <Typography component="div" >
                <QuestionCard onAnswerClick={handleAnswerClick} />
              </Typography>
              <Grid item xs={12} sx={{marginTop: '1.5rem'}}>
              <Divider light sx={{marginTop: '0.75rem'}}/>
                <Typography variant="h6" component="div" className="qprogress">
                  <QProgress
                    questionsLeft={
                      gameService.numOfQuestions - gameService.currentQuestionIndex
                    }
                    totalQuestions={gameService.numOfQuestions}
                  />
                </Typography>
                <Divider light sx={{marginTop: '2.75rem', marginBottom: '1rem'}}/>
                <Button variant="contained" sx ={{borderRadius: '10px', opacity:'0.75'}}
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
      <Typography variant="h1" component="div" className="result-modal">
        <ResultModal
          open={gameService.isGameOver}
          score={gameService.getScore() ?? 0}
          onRestart={handleRestartGame}
          onGoHome={handleGoHome}
        />
      </Typography>
      <Typography variant="h1" component="div" className="loading-modal">
        <Loading
          showLoading={gameService.showLoading}
          onClose={() => gameService.setShowLoading(false)}
        />
      </Typography>
    </Container>
  );
};

export default TriviaGame;
