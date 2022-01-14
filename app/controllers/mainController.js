const dataController = require('./dataController');

const mainController = {

  async homePage(req, res) {
    const allQuizs = await dataController.getAllQuizs();
    res.render('homepage', {
      allQuizs
    });
  }
};

module.exports = mainController;