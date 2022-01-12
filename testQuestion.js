require('dotenv').config();

const Question = require('./app/model/Question');

const test = async () => {
  // All users (static)
  const allQuestions = await Question.findAll();
  //!
  console.log('all question');
  console.table(allQuestions);

  // Get one questions
  const oneQuestion = await Question.findById(2);
  console.log('one question:', oneQuestion);
};

test();