export interface TriviaQuestion {
      question: string;
      correctAnswer: string;
      incorrectAnswers: string[];
      answerOptions: string[],
      category: string;
      selectedAnswer: string;
    }