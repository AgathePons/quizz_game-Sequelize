const dotenv = require('dotenv');
dotenv.config();
const {
  Quiz,
} = require('../models');

const mainController = {
  // display homepage with list of all quizs
  async homePage(_req, res) {
    const allQuizs = await Quiz.findAll({
      include: 'author'
    });
    res.render('homepage', {
      allQuizs,
    });
  }
};

module.exports = mainController;