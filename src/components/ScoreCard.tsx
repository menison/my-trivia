import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface ScoreCardProps {
  score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  return (
    <Card>
      <CardContent>
        <Typography>
          Score: {score}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default ScoreCard;
