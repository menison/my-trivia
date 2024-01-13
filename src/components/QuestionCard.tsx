import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Snackbar, Alert, Divider, ClickAwayListener } from '@mui/material';

interface QuestionCardProps {
  question: string;
  category: string;
  answerChoices: string[];
  onAnswerClick: (selectedAnswer: string) => void;
  answerFeedback: Array<{ choice: string; isCorrect: boolean; isSelected: boolean }>;
  //onNextButtonClick: () => void; 
}
const QuestionCard: React.FC<QuestionCardProps> = ({ question, category, answerChoices, onAnswerClick, answerFeedback}) => {
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Reset isAnswerSelected when a new question is loaded
    setIsAnswerSelected(false);
  }, [question]);
  
  useEffect(() => {
    const feedback = answerFeedback.find((feedback) => feedback.isSelected);

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
                    setIsAnswerSelected(true);
                  }}
                  style={{
                    backgroundColor:
                      answerFeedback.find((feedback) => feedback.choice === choice)?.isCorrect && isAnswerSelected
                        ? 'green'
                        : answerFeedback.find((feedback) => feedback.choice === choice)?.isSelected && isAnswerSelected
                        ? 'red'
                        : undefined,
                  }}
                  disabled={isAnswerSelected}
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
