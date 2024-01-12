import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Snackbar, Alert, Divider } from '@mui/material';

interface QuestionCardProps {
  question: string;
  category: string; // Add category as a prop
  answerChoices: string[];
  onAnswerClick: (selectedAnswer: string) => void;
}
interface QuestionCardProps {
  question: string;
  category: string;
  answerChoices: string[];
  onAnswerClick: (selectedAnswer: string) => void;
  answerFeedback: Array<{ choice: string; isCorrect: boolean; isSelected: boolean }>;
}

const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, category, answerChoices, onAnswerClick, answerFeedback }) => (
  <>
    <Card 
      sx={{ minWidth: '75rem'}}
    >
      <CardContent>
        <Typography variant="caption" component="div">
          Category: {category}
        </Typography>
        <Divider light />
        <Typography margin='3rem' variant="h6" component="div">
          {question}
        </Typography>
        <Grid container spacing={2}>
          {answerChoices.map((choice, index) => (
            <Grid display="flex" item xs={6} key={index}>
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
    {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar> */}
  </>
);


export default QuestionCard;
