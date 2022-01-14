const dotenv = require('dotenv');
dotenv.config();

const {
  Quiz,
} = require('../models');

const mainController = {
  async checkLogin(req, res, next) {
    res.locals.session = req.session.login;
    console.log('MIDDLEWARE');
    console.log('middleware',res.locals.session);
    next();
  },
  async homePage(req, res) {
    const allQuizs = await Quiz.findAll({
      include: 'author'
    });
    //const userSession = req.session.login;
    res.render('homepage', {
      allQuizs,
      userSession: res.locals.session
    });
  }
};

module.exports = mainController;