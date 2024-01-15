import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Box, Slider, Divider, Paper, List, ListItem, ListItemText } from '@mui/material';
import { GameState } from '../interfaces/GameState';
import { useNavigate } from 'react-router-dom';
import PsychologyAltTwoToneIcon from '@mui/icons-material/PsychologyAltTwoTone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
    gameService.setNumFiftyLeft(Math.floor(numQuestions/5));
    navigate('/game');
  }

  return (
    <Container>
      <Typography variant="h1" component="div" align="center">
        <PsychologyAltTwoToneIcon className ="h1-icon"  style={{fontSize:'10rem'}}/>
      </Typography>
      <Typography variant="h1" component="div" align="center">
        TriviApp
      </Typography>
      <Typography id="num-questions-slider" gutterBottom>
        Number of Questions: {numQuestions}
      </Typography>
      <Slider
        value={numQuestions}
        onChange={(e, value) => setNumQuestions(value as number)}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value.toString()}
        step={1}
        marks
        min={0}
        max={50}
      />
      <Box mt={2}>
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
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartGame}
          disabled={numQuestions <= 0}
        >
          Start Game
        </Button>
      </Box>
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Instructions:
          </Typography>
          <Typography variant="body1">
            Welcome to the Trivia Game! Here's how to play:
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body1">
            <strong>Rules:</strong>
          </Typography>
            <List>
                <ListItem>
                  <InfoOutlinedIcon className="info-icon"/>
                  <ListItemText
                    primary={`You will be presented with a total of ${numQuestions} questions - the time for the game and amount of lifelines will increase with the number of questions!`}
                  />
                </ListItem>
                <ListItem>
                  <InfoOutlinedIcon className="info-icon" />
                  <ListItemText
                    primary={"Each question will have 4 possible answers, and you need to choose the correct one."}
                  />
                </ListItem>
                <ListItem>
                  <InfoOutlinedIcon className="info-icon" />
                  <ListItemText
                    primary={`You have a total time of ${numQuestions * 30} seconds (${(numQuestions * 30)/60} minutes) for the entire game.`}
                  />
                </ListItem>
                <ListItem>
                  <InfoOutlinedIcon className="info-icon" />
                  <ListItemText
                    primary="If the time runs out, the game will gracefully end - you will be allowed another answer."
                  />
                </ListItem>
                <ListItem>
                  <InfoOutlinedIcon className="info-icon" />
                  <ListItemText
                    primary="For each correct answer, you will earn 1 point. There is no penalty for wrong answers."
                  />
                </ListItem>
                <ListItem>
                  <InfoOutlinedIcon className="info-icon" />
                  <ListItemText
                    primary="Enjoy the game and have fun!"
                  />
                </ListItem>
            </List>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="body1">
            <strong>Fifty-Fifty Lifelines:</strong>
          </Typography>
          <Typography variant="body1">
            You will receive {Math.floor(numQuestions / 5)} Fifty-Fifty lifelines.
            Using a lifeline will reduce the possible answers to two, helping you make a better guess.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings;
