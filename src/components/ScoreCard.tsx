import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface ScoreCardProps {
  score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  return (
    <Card  className="score-card">
      <CardContent>
        <Typography variant="h6" component="div">
          Score: {score}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default ScoreCard;
