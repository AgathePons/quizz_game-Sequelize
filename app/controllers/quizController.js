const dotenv = require('dotenv');
dotenv.config();

const {
  Answer,
  Level,
  Question,
  Quiz,
  Tag,
  User
} = require('../models');

const quizController = {
  async displayQuiz (req, res) {
    const quizId = req.params.id;
    const oneQuiz = await Quiz.findOne({
      where: {
        id: quizId
      },
      include: ['tags', 'author', {
        association: 'questions',
        include: ['level', 'answers', 'good_answer']
      }]
    });
    
    res.render('quizz', {
      oneQuiz,
    });
  },
};
   
module.exports = quizController;