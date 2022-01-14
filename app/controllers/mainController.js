const dotenv = require('dotenv');
dotenv.config();

const {
  Quiz,
} = require('../models');

const mainController = {

  async homePage(req, res) {
    const allQuizs = await Quiz.findAll({
      include: 'author'
    });
    res.render('homepage', {
      allQuizs
    });
  }
};

module.exports = mainController;