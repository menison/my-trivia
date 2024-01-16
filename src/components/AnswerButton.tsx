import React from "react";
import { Button } from "@mui/material";

interface AnswerButtonProps {
  answer: string;
  onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ answer, onClick }) => (
  <Button variant="contained" onClick={onClick}>
    {answer}
  </Button>
);

export default AnswerButton;
