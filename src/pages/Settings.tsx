import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import { GameState } from '../hooks/useGameState';
import { useNavigate } from 'react-router-dom';

interface SettingsProps{
  gameService: GameState;
}
const Settings: React.FC<SettingsProps> = ({gameService}) => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<string>('easy');
  const navigate = useNavigate();

  const handleStartGame = () => {
    gameService.setNumOfQuestions(numQuestions);
    gameService.setDifficulty(difficulty);
    navigate('/game');
  }

  return (
    <Container>
      <Typography variant="h4" component="div" align="center">
        Trivia Game
      </Typography>
      <TextField
        label="Number of Questions"
        type="number"
        value={numQuestions}
        onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Difficulty"
        select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={handleStartGame}>
        Start Game
      </Button>
    </Container>
  );
};

export default Settings;
