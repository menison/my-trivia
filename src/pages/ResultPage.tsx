import React from 'react';
import { Container, Typography } from '@mui/material';
import GameEndModal from '../components/GameEndModal';


const GameOverPage: React.FC = () => {
  const [showEndModal, ] = React.useState(true);
  const finalScore = 0; //figure out

  const handleRestartGame = () => {
    // const handleRestartGame = () => {
    //   // handle game restart
    // };

  };

  return (
    <Container>
      <Typography variant="h4" component="div">
        Game Over
      </Typography>
      <GameEndModal
        open={showEndModal}
        score={finalScore}
        onClose={() => handleRestartGame()}
      />
    </Container>
  );
};


export default GameOverPage;
