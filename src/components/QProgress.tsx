import React from 'react';
import { LinearProgress } from '@mui/material';

interface QProgressProps {
  questionsLeft: number; // Pass the number of questions left as a prop
  totalQuestions: number; // Pass the total number of questions as a prop
}

const MyTimer: React.FC<QProgressProps> = ({ questionsLeft, totalQuestions }) => (
  <LinearProgress variant="determinate" value={(((totalQuestions - questionsLeft) / totalQuestions) * 100)} />
);

export default MyTimer;
