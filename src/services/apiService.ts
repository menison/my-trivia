import axios, { AxiosError, AxiosResponse } from 'axios';
import * as he from 'he';
import { ITriviaQuestion } from '../interfaces/ITriviaQuestion';

const TRIVIA_API_URL = 'https://opentdb.com/api.php'

interface TriviaApiError<T = unknown> extends AxiosError<T> {
  response?: AxiosResponse<T>;
}

let isResponseEmpty = false;
const isRateLimitError = (error: TriviaApiError): boolean => {
  return error.response?.status === 429;
};

export const fetchTriviaQuestions = async (amount: number, difficulty: string): Promise<ITriviaQuestion[]> => {
  try {
    console.log('Fetching trivia questions...');
    
    const response = await axios.get(TRIVIA_API_URL, {
      params: {
        amount,
        difficulty,
        type: 'multiple',
      },
    });

    const triviaQuestions = response.data.results.map((result: any): ITriviaQuestion => {
      const { question, correct_answer, incorrect_answers, category } = result;
      return {
        question: he.decode(question), // Decode HTML entities
        correctAnswer: he.decode(correct_answer),
        incorrectAnswers: incorrect_answers.map((answer: string) => he.decode(answer)),
        category: he.decode(category),
        answerOptions: [he.decode(correct_answer), ...incorrect_answers.map((answer: string) => he.decode(answer))],
        selectedAnswer: '',
      };
    });

    if (!triviaQuestions)
      isResponseEmpty = true;
    console.log('Trivia questions loaded!');

    // Return the questions
    return triviaQuestions;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
   
    // If the error is due to rate limiting and questions have not been fetched, introduce a delay and retry
    if (isResponseEmpty && isRateLimitError(error as TriviaApiError)) {
      console.log('Rate limited. Retrying after 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Retrying trivia questions...');
      return fetchTriviaQuestions(amount, difficulty);
    }
    throw error;
  }
};
