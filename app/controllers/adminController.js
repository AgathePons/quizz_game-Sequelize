const {
  Quiz,
} = require('../models');

const adminController = {
  async adminPage(_req, res) {
    let allQuizs = [];
    try {
      allQuizs = await Quiz.findAll({
        include: 'author'
      });
    } catch(err) {
      console.log('ADMIN =>', err);
      //res.status(500).send(err);
    }
    res.render('admin', {
      allQuizs,
    });
  },
  async deleteQuiz(req, res) {
    const quizId = req.params.id;
    //!
    console.log('quiz to delete:', quizId);
    try {
      const quizToDelete = await Quiz.findByPk(quizId);
      if(quizToDelete) {
        console.log(`Quiz ${quizToDelete.title} deleted`);
        await quizToDelete.destroy();
      } else {
        console.warn('Quiz not found');
      }
    } catch(err) {
      console.log('DELETE QUIZ =>', err);
      //res.status(500).send(err);
    }
    res.redirect('/admin');
  }
};

module.exports = adminController;