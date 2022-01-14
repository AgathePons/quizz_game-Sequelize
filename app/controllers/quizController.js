const dotenv = require('dotenv');
dotenv.config();

const {Answer, Level, Question, Quiz, Tag, User} = require('../models');
const dataController = require('./dataController');

const quizController = {
  async displayQuiz (req, res) {
    const id = req.params.id;
    const oneQuiz = await dataController.getOneQuiz(id);
    //const questionsOfQuiz = await dataController.getQuestionsByQuiz(id);
    
    
    res.render('quizz', {
      oneQuiz,
    });
  },
};
   
module.exports = quizController;