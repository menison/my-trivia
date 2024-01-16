export interface ITriviaQuestion {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  answerOptions: string[];
  category: string;
  selectedAnswer: string;
}
