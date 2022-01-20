const { Quiz, Tag } = require('../models');

const quizzController = {

  quizzPage: async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const quiz = await Quiz.findByPk(quizId,{
        include: [
          { association: 'author'},
          { association: 'questions', include: ['answers', 'level']},
          { association: 'tags'}
        ]
      });
      if(res.locals.user) {
        res.render('play_quiz', {quiz});
      } else {
        res.render('quiz', {quiz});
      }
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
  // results of quiz validation form
  validateQuiz: async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const quiz = await Quiz.findByPk(quizId,{
        include: [
          { association: 'author'},
          { association: 'questions', include: ['answers', 'level']},
          { association: 'tags'}
        ]
      });
      // check results
      let counter = 0;
      const quizForm = req.body;
      const userAnswers = Object.values(quizForm);
      //!
      console.table(userAnswers);
      for(let i = 0; i < quiz.questions.length; i++) {
        const goodAnswerId = quiz.questions[i].answer_id;
        const userAnswer = userAnswers[i];
        //!
        console.log('question', quiz.questions[i].question);
        console.log('good answer:', goodAnswerId);
        console.log('user answer:', userAnswer);
        if(goodAnswerId === Number(userAnswer)) {
          counter++;
          quiz.questions[i].isUserRight = true;
        } else {
          quiz.questions[i].isUserRight = false;
        }
        //!
        console.log('---FINALLY:', quiz.questions[i].isUserRight);
      }

      res.render('quiz_results', {
        quiz,
        userAnswers,
        counter
      });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
  listByTag: async (req, res) => {
    // plutot que de faire une requete compliquée
    // on va passer par le tag, et laisser les relations de Sequelize faire le taf !
    try {
      const tagId = parseInt(req.params.id);
      const tag = await Tag.findByPk(tagId,{
        include: [{
          association: 'quizzes',
          include: ['author']
        }]
      });
      const quizzes = tag.quizzes;
      res.render('index', { quizzes });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  }

};

module.exports = quizzController;