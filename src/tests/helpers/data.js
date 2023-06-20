const general = 'General Knowledge';

const questions = {
  response_code: 0,
  results: [
    {
      category: general,
      type: 'multiple',
      difficulty: 'easy',
      question: 'What alcoholic drink is made from molasses?',
      correct_answer: 'Rum',
      incorrect_answers: ['Gin', 'Vodka', 'Whisky'],
    }, {
      category: general,
      type: 'multiple',
      difficulty: 'hard',
      question: 'What is the romanized Arabic word for &quot;moon&quot;?',
      correct_answer: 'Qamar',
      incorrect_answers: ['Najma', 'Kawkab', 'Shams'],
    },
    {
      category: 'Sports',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the oldest team in the NFL?',
      correct_answer: 'Arizona Cardinals',
      incorrect_answers: ['Chicago Bears', 'Green Bay Packers', 'New York Giants'],
    },
    {
      category: general,
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the full title of the Prime Minister of the UK?',
      correct_answer: 'First Lord of the Treasury',
      incorrect_answers: ['Duke of Cambridge',
        'Her Majesty&#039;s Loyal Opposition', 'Manager of the Crown Estate'],
    },
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Panic! At the Disco&#039;s sixth album &quot; '
      + ' Pray For The Wicked&quot; was released on which date?',
      correct_answer: 'June 22, 2018',
      incorrect_answers: ['May 9, 2018', 'March 13, 2018', 'February 21, 2018'],
    },
  ],
};

export default questions;
