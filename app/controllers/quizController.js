const {
  Quiz,
} = require('../models');

const quizController = {
  // display page of one quizz
  async displayQuiz (req, res) {
    const quizId = req.params.id;
    let oneQuiz = {};
    try {
      oneQuiz = await Quiz.findOne({
        where: {
          id: quizId
        },
        include: ['tags', 'author', {
          association: 'questions',
          include: ['level', 'answers', 'good_answer']
        }]
      });
    } catch(err) {
      console.log('QUIZ =>', err);
      //res.status(500).send(err);
    }
    res.render('quizz', {
      oneQuiz,
    });
  },
};
   
module.exports = quizController;