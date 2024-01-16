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
  <Grid container alignItems="center">
    <Grid item xs={8}>
      <LinearProgress
        variant="determinate"
        value={((totalQuestions - questionsLeft) / totalQuestions) * 100}
      />
    </Grid>
    <Grid item xs={4} style={{ textAlign: "center" }}>
      <Typography variant="caption" color="textSecondary">
        {totalQuestions - questionsLeft} passed / {questionsLeft} left
      </Typography>
    </Grid>
  </Grid>
);

export default QProgress;
