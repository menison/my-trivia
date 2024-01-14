import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Snackbar, Alert, Divider } from '@mui/material';
import {GameService} from '../services/GameService';
import '../index.css';

interface QuestionCardProps {
  question: string;
  category: string;
  answerChoices: string[];
  onAnswerClick: (selectedAnswer: string) => void;
  answerFeedback: Array<{ choice: string; isCorrect: boolean; isSelected: boolean }>;
  gameService: GameService;
}
const QuestionCard: React.FC<QuestionCardProps> = ({ question, category, answerChoices, onAnswerClick, answerFeedback, gameService}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  useEffect(() => {
    const feedback = gameService.getAnswerFeedback().find((feedback) => feedback.isSelected);

    if (feedback) {
      setSnackbarOpen(true);
      if (feedback.isCorrect) {
        setSnackbarMessage('Correct! Well done!');
      } else {
        setSnackbarMessage(`Wrong answer.`);
      }
    }
  }, [answerFeedback]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const getButtonClass = (choice: string) => {
    const feedback = gameService.getAnswerFeedback().find((feedback) => feedback.choice === choice);
  
    if (feedback && gameService.isAnyAnswerSelected) {
      if (feedback.isCorrect) {
        return 'correct';
      } else if (!feedback.isCorrect && feedback.isSelected) {
        return 'wrong';
      }
    }
    return '';
  };
  
  return (
    <>
      <Card>
        <CardContent>
            <Typography variant="caption" component="div">
              Category: {category}
            </Typography>
            <Typography variant="h6" component="div">
              {question}
            </Typography>
            <Divider light/>
            <Grid container spacing={2}>
              {answerChoices.map((choice, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  fullWidth
                  onClick={() => {
                    onAnswerClick(choice);
                  }}
                  className={getButtonClass(choice)} 
                  disabled={gameService.isAnyAnswerSelected}
                >
                  {choice}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarMessage==='Correct! Well done!' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuestionCard;
