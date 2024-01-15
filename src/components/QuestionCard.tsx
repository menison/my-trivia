import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { GameState } from "../hooks/useGameState";
import "../index.css";
import { shuffleArray } from "../utils";

interface QuestionCardProps {
  onAnswerClick: (selectedAnswer: string) => void;
  gameService: GameState;
}
const QuestionCard: React.FC<QuestionCardProps> = ({
  onAnswerClick,
  gameService,
}) => {
  // const [currAnswerOptions, setCurrAnswerOptions] = useState<string[]>([]);

  // useEffect(() => {
  //   setCurrAnswerOptions(gameService.getAnswerChoices());
  // }, [gameService.currentQuestionIndex]);

  useEffect(() => {
    const feedback = gameService
      .getAnswerFeedback()
      .find((feedback) => feedback.isSelected);

    if (feedback) {
      gameService.setSnackbarOpen(true);
      if (feedback.isCorrect) {
        gameService.setSnackbarMessage("Correct! Well done!");
      } else {
        gameService.setSnackbarMessage(`Wrong answer.`);
      }
    }
  }, [gameService.isAnyAnswerSelected]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    gameService.setSnackbarOpen(false);
  };

  const getButtonClass = (choice: string) => {
    const feedback = gameService
      .getAnswerFeedback()
      .find((feedback) => feedback.choice === choice);

    if (feedback && gameService.isAnyAnswerSelected) {
      if (feedback.isCorrect) {
        return "correct";
      } else if (!feedback.isCorrect && feedback.isSelected) {
        return "wrong";
      }
    }
    return "";
  };

  const handleLifelineClick = () => {
    if (!gameService.isFiftyUsed && gameService.numFiftyLeft > 0) {
      gameService.setIsFiftyUsed(true);
      gameService.setNumFiftyLeft((prevNumFiftyLeft) => prevNumFiftyLeft - 1);
    }
  };

  function shouldButtonRender(choice: string): boolean {
    return (
      gameService.isAnyAnswerSelected ||
      (gameService.isFiftyUsed &&
        choice !== gameService.getCurrentQuestion().correctAnswer &&
        choice !== gameService.getCurrentQuestion().incorrectAnswers[0])
    );
  }

  return (
    <>
      <Button
        onClick={handleLifelineClick}
        disabled={gameService.isAnyAnswerSelected || gameService.isFiftyUsed || !gameService.numFiftyLeft}
      >
        50-50: {gameService.numFiftyLeft}
      </Button>
      <Card>
        <CardContent>
          <Typography variant="caption" component="div">
            Category: {gameService.getCurrentQuestion()?.category}
          </Typography>
          <Typography variant="h6" component="div">
            {gameService.getCurrentQuestion()?.question}
          </Typography>
          <Divider light />
          <Grid container spacing={2}>
            {/* {gameService.getAnswerChoices().map((choice, index) => ( */}
            {gameService.getAnswerChoices.map((choice, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  fullWidth
                  onClick={() => {
                    onAnswerClick(choice);
                  }}
                  className={getButtonClass(choice)}
                  disabled={shouldButtonRender(choice)}
                >
                  {choice}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Snackbar
        open={gameService.snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={
            gameService.snackbarMessage === "Correct! Well done!"
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {gameService.snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuestionCard;
