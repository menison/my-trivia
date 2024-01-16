import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Slider,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PsychologyAltTwoToneIcon from "@mui/icons-material/PsychologyAltTwoTone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useGameContext } from "../context/gameContext";
import buttonClickSoundFile from "../assets/audio/button-sound.mp3";
import useSound from "use-sound";
import { CenterFocusStrong } from "@mui/icons-material";

const Settings: React.FC = () => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const navigate = useNavigate();
  const gameService = useGameContext();

  const [playButtonClick] = useSound(buttonClickSoundFile);

  const handleStartGame = () => {
    playButtonClick();
    gameService.setNumOfQuestions(numQuestions);
    gameService.setDifficulty(difficulty);
    gameService.setNumFiftyLeft(Math.floor(numQuestions / 5));
    navigate("/game");
  };

  return (
    <>
      <Container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          backgroundColor: 'rgba(255,255,255,0.75)',
          padding: '5px'
        }}
      >
        <Typography variant="h1" component="div" align="center">
          <PsychologyAltTwoToneIcon
            className="h1-icon"  fontSize="inherit"
          />
        </Typography>
        <Typography variant="h3" component="div" align="center" className="franchise">
          <b>TriviApp</b>
        </Typography>

        <Box mt={2}>
          <Paper elevation={3} style={{ padding: "5px" }}>
            <Typography className="divim" variant="h6" gutterBottom sx={{color: 'rgb(0, 110, 255)'}}>
              Instructions:
            </Typography>
            <Typography className="divim" variant="body1">
              Welcome to the Trivia Game! Here's how to play:
            </Typography>
            <Divider style={{ margin: "5px 0" }} />
            <Typography className="divim" variant="body1" sx={{color: 'rgb(0, 110, 255)'}} >
              <strong><u>Rules:</u></strong>
            </Typography>
            <List>
              <ListItem>
                <InfoOutlinedIcon className="info-icon" />
                <ListItemText
                  primary={`You will be presented with a total of ${numQuestions} questions - the time for the game and amount of lifelines will increase with the number of questions!`}
                />
              </ListItem>
              <ListItem>
                <InfoOutlinedIcon className="info-icon" />
                <ListItemText
                  primary={
                    "Each question will have 4 possible answers, and you need to choose the correct one."
                  }
                />
              </ListItem>
              <ListItem>
                <InfoOutlinedIcon className="info-icon" />
                <ListItemText
                  primary={`You have a total time of ${
                    numQuestions * 30
                  } seconds (${
                    (numQuestions * 30) / 60
                  } minutes) for the entire game.`}
                />
              </ListItem>
              <ListItem>
                <InfoOutlinedIcon className="info-icon" />
                <ListItemText primary="If the time runs out, the game will gracefully end - you will be allowed another answer." />
              </ListItem>
              <ListItem>
                <InfoOutlinedIcon className="info-icon" />
                <ListItemText primary="For each correct answer, you will earn 1 point. There is no penalty for wrong answers." />
              </ListItem>
              <ListItem>
                <InfoOutlinedIcon className="info-icon" />
                <ListItemText primary="Enjoy the game and have fun!" />
              </ListItem>
            </List>
            <Divider style={{ margin: "5px 0" }} />
            <Typography className="divim" variant="body1" sx={{color: 'rgb(0, 110, 255)'}}>
              <strong>Fifty-Fifty Lifelines:</strong>
            </Typography>
            <Typography className="divim" variant="body1">
              You will receive {Math.floor(numQuestions / 5)} Fifty-Fifty
              lifelines. Using a lifeline will reduce the possible answers to
              two, helping you out.
            </Typography>
          </Paper>
          <Typography id="num-questions-slider">
            Number of Questions: {numQuestions}
          </Typography>
          <Typography id="num-questions-slider" component="div">
            <Slider
              sx={{ width: "50%" }}
              value={numQuestions}
              onChange={(e, value) => setNumQuestions(value as number)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => value.toString()}
              step={1}
              marks
              min={0}
              max={50}
            />
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              sx={{ textAlign: "center", width: "25%"}}
              label="Difficulty"
              select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem className="franchise" value="easy">Easy</MenuItem>
              <MenuItem className="franchise" value="medium">Medium</MenuItem>
              <MenuItem className="franchise" value="hard">Hard</MenuItem>
            </TextField>
          </Box>
          <Box mt={2} className="divim">
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartGame}
              disabled={numQuestions <= 0}
            >
              Start Game
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Settings;
