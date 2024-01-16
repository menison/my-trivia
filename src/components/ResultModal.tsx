import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";

interface ResultModalProps {
  open: boolean;
  score: number;
  onRestart: () => Promise<void>;
  onGoHome: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  open,
  score,
  onRestart,
  onGoHome,
}) => {
  return (
    <Dialog open={open} onClose={onRestart}>
      <DialogTitle align='center'>Game Over</DialogTitle>
      <DialogContent className="dialog-content" sx={{borderRadius:'30px'}}>
        <Typography variant="h3" component="div">
          Final Score: <strong>{score}</strong>
        </Typography>
        <Typography component="div" className="result-modal-btns">
          <Button variant="outlined" onClick={onRestart} color="primary" sx={{marginRight: '1rem'}}>
            New quizz
          </Button>
          <Button variant="outlined" onClick={onGoHome} color="primary">
            Settings
          </Button>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
export default ResultModal;
