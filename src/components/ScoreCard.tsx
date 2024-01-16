import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface ScoreCardProps {
  score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  return (
    <Card  className="score-card" sx={{opacity: '0.85', borderRadius: '30px'}}>
      <CardContent>
        <Typography component="div" >
          <strong>Score: {score}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};
export default ScoreCard;
