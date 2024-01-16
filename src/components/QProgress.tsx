import React from "react";
import { LinearProgress, Typography, Grid } from "@mui/material";

interface QProgressProps {
  questionsLeft: number;
  totalQuestions: number;
}

const QProgress: React.FC<QProgressProps> = ({
  questionsLeft,
  totalQuestions,
}) => (
  <Grid sx={{width: '100%',display: 'block', justifyContent: 'center', marginTop: '1rem'}}>
    <Typography variant="h1" component="div" sx={{width:'100%', display: 'block'}}>
      <LinearProgress
        variant="determinate"
        value={((totalQuestions - questionsLeft) / totalQuestions) * 100}
      />
    </Typography>
    <Typography variant="caption" component="div" color="textSecondary" sx={{display:'flex',justifyContent: 'space-around', margi: '0.15rem'}}>
      {totalQuestions - questionsLeft} passed / {questionsLeft} left
    </Typography>
  </Grid>
);

export default QProgress;
