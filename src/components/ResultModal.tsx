import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

interface ResultModalProps {
  open: boolean;
  score: number;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ open, score, onClose }) => {
    console.log(`final score: ${score}`);
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          <Typography variant="body1" component="div">
            Final Score: {score}
          </Typography>
          <Button onClick={onClose} color="primary">
            Restart Game
          </Button>
        </DialogContent>
      </Dialog>
    )
};
export default ResultModal;
