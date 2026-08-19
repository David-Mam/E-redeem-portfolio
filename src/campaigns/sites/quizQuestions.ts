export interface QuizQuestion {
  question: string
  options: string[]
  // Index into `options` of the correct answer.
  correctIndex: number
}

// Dummy questions for testing the quiz campaign flow.
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: 'What is the capital of Nigeria?',
    options: ['Lagos', 'Abuja', 'Kano', 'Ibadan'],
    correctIndex: 1,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    correctIndex: 2,
  },
  {
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctIndex: 2,
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correctIndex: 3,
  },
  {
    question: 'Which gas do plants primarily absorb for photosynthesis?',
    options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
    correctIndex: 1,
  },
  {
    question: 'What currency is used in Nigeria?',
    options: ['Cedi', 'Naira', 'Rand', 'Shilling'],
    correctIndex: 1,
  },
]

// Fraction of questions a player must answer correctly to win.
export const PASS_THRESHOLD: number = 0.8
