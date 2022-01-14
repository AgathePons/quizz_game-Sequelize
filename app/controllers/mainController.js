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
    console.log('homepage controller',req.session.login);
    const userSession = req.session.login
    res.render('homepage', {
      allQuizs,
      userSession
    });
  }
};

module.exports = mainController;