const dotenv = require('dotenv');
dotenv.config();
const {
  Quiz,
} = require('../models');

const mainController = {
  // display homepage with list of all quizs
  async homePage(_req, res) {
    let allQuizs = [];
    try {
      allQuizs = await Quiz.findAll({
        include: 'author'
      });
    } catch(err) {
      console.log('HOME =>', err);
      //res.status(500).send(err);
    }
    res.render('homepage', {
      allQuizs,
    });
  }
};

module.exports = mainController;