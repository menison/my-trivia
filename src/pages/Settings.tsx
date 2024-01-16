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
  ListItem,
  ListItemText,
  List,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import PsychologyAltTwoToneIcon from "@mui/icons-material/PsychologyAltTwoTone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useGameContext } from "../context/gameContext";
import buttonClickSoundFile from "../assets/audio/button-sound.mp3";
import useSound from "use-sound";

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
      <Container sx={{ height: "100vh", width: "100vw" }}>
        {/* <Typography
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            height: "80%",
          }}
        > */}
          <Box mt={2}>
            <Typography variant="h1" component="div" align="center" >
              <PsychologyAltTwoToneIcon className="h1-icon" fontSize="inherit" />
            </Typography>
            <Typography
              variant="h3"
              component="div"
              align="center"
              className="franchise"
              gutterBottom
            >
              <b>TriviApp</b>
            </Typography>
            <Paper elevation={3} style={{ padding: "5px" }}>
              <Typography gutterBottom
                className="divim"
                variant="h6"
              >
                Welcome to TriviApp!
              </Typography>
              <Divider />
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <strong>If your'e a first-timer, press to read the instructions</strong>
                </AccordionSummary>
                <AccordionDetails>
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
                    <ListItem>
                      <InfoOutlinedIcon className="info-icon" />
                      <Typography
                        className="divim"
                        variant="body1"
                        sx={{ color: "rgb(0, 110, 255)" }}
                      ></Typography>
                      <Typography className="divim" variant="body1">
                        You will receive {Math.floor(numQuestions / 5)}{" "}
                        Fifty-Fifty lifelines. Using a lifeline will reduce the
                        possible answers to two, helping you out.
                      </Typography>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              <Divider style={{ margin: "5px 0" }} />
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
                sx={{ textAlign: "center", width: "25%" }}
                label="Difficulty"
                select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                fullWidth
                margin="normal"
              >
                <MenuItem className="franchise" value="easy">
                  Easy
                </MenuItem>
                <MenuItem className="franchise" value="medium">
                  Medium
                </MenuItem>
                <MenuItem className="franchise" value="hard">
                  Hard
                </MenuItem>
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
        {/* </Typography> */}
      </Container>
    </>
  );
};

export default Settings;
