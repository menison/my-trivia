import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Snackbar, Alert } from '@mui/material';

interface QuestionCardProps {
  question: string;
  category: string;
  answerChoices: string[];
  onAnswerClick: (selectedAnswer: string) => void;
  answerFeedback: Array<{ choice: string; isCorrect: boolean; isSelected: boolean }>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, category, answerChoices, onAnswerClick, answerFeedback }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const feedback = answerFeedback.find((feedback) => feedback.isSelected);

    if (feedback) {
      if (feedback.isCorrect) {
        setSnackbarMessage('Correct! Well done!');
      } else {
        setSnackbarMessage(`Wrong answer. The correct answer is: ${feedback.choice}`);
      }

      setSnackbarOpen(true);
    }
  }, [answerFeedback]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
          <Grid container spacing={2}>
            {answerChoices.map((choice, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  fullWidth
                  onClick={() => onAnswerClick(choice)}
                >
                  {choice}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuestionCard;
