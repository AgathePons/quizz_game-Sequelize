const dotenv = require('dotenv');
dotenv.config();

const {Answer, Level, Question, Quiz, Tag, User} = require('../models');

const dataController = {
  getAllQuizs: async () => {
    const allQuizs = await Quiz.findAll({
      include: 'author'
    });
    console.log(allQuizs);
    return allQuizs;
  }
};

module.exports = dataController;