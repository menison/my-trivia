import React, { useEffect } from "react";
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
import "../index.css";
import { useGameContext } from "../context/gameContext";
import buttonClickSoundFile from "../assets/audio/button-sound.mp3";
import useSound from "use-sound";

interface QuestionCardProps {
  onAnswerClick: (selectedAnswer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ onAnswerClick }) => {
  const gameService = useGameContext();
  const [playButtonClick] = useSound(buttonClickSoundFile);

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
      playButtonClick();
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
      <Grid>
        <Card sx={{display: 'flex', flexDirection:'column', justifyContent:'space-around', alignItems: 'center'}} >
          <CardContent >
            <Typography variant="h6" component="div" className="question-div">
              <Button
                variant="outlined"
                sx={{ marginBottom: "1.6rem", fontSize: "0.75rem", borderRadius: '10px'}}
                onClick={handleLifelineClick}
                disabled={
                  gameService.isAnyAnswerSelected ||
                  gameService.isFiftyUsed ||
                  !gameService.numFiftyLeft
                }
              >
                50-50: {Math.floor(gameService.numFiftyLeft)}
              </Button>
            </Typography>
            <Typography
              variant="caption"
              component="div"
              className="question-div"
            >
              Category: {gameService.getCurrentQuestion()?.category}
            </Typography>
            <Typography variant="h6" component="div">
              {gameService.getCurrentQuestion()?.question}
            </Typography>
            <Divider light sx={{marginTop: '0.75rem'}}/>
            <Grid container spacing={2} sx={{ marginTop: "0.3rem", marginBottom: "0.3rem" }}>
              {gameService.getAnswerChoices.map((choice, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    variant="outlined" sx={{borderRadius: '10px'}}
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
            <Divider light sx={{marginTop: '0.75rem'}}/>
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
      </Grid>
    </>
  );
};

export default QuestionCard;
