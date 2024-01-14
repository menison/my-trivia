import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

interface ResultModalProps {
  open: boolean;
  score: number;
  onRestart: () => Promise<void>;
  onGoHome: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ open, score, onRestart, onGoHome }) => {
    console.log(`final score: ${score}`);
    return (
      <Dialog open={open} onClose={onRestart}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          <Typography variant="body1" component="div">
            Final Score: {score}
          </Typography>
          <Button onClick={onRestart} color="primary">
            New quizz
          </Button>
          <Button onClick={onGoHome} color="primary">
            Home
          </Button>
        </DialogContent>
      </Dialog>
    )
};
export default ResultModal;
