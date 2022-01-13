const Quiz = require('../model/Quiz');

const mainController = {

  async homePage(req, res) {
    const quizArray = await Quiz.findAll();
    console.table(quizArray);
    res.render('home', quizArray);
  },

  async displayQuiz(req, res) {
    res.render('quiz');
  }
};

module.exports = mainController;