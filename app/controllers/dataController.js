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

const dataController = {
  getAllQuizs: async () => {
    const allQuizs = await Quiz.findAll({
      include: 'author'
    });

    return allQuizs;
  },
  getOneQuiz: async (quizId) => {
    const oneQuiz = await Quiz.findOne({
      where: {
        id: quizId
      },
      include: ['tags', 'author', {
        association: 'questions',
        include: ['level', 'answers', 'good_answer']
      }]
    });
    console.log(oneQuiz);
    return oneQuiz;
  },

};
module.exports = dataController;


/* const premierQuiz = await Quiz.findByPk(1, {
  include: [
      'author',
      'tags',
      // cas particulier, si dans une association...
      // je veux ENCORE d'autres associations "filles"
      {
          association: 'questions',
          // dans include, je met les relations du 2eme étage que je veux
          include: ['level', 'answers', 'good_answer']
      }
  ]
}); */

/* getQuestionsByQuiz: async (quizId) => {
    const questionsQuiz = await Question.findAll({
      where: {
        quiz_id: quizId
      },
      include: ['level', 'answers']
    });
    console.log(questionsQuiz);
    return questionsQuiz;
  }

};
*/