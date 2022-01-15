const dotenv = require('dotenv');
dotenv.config();
const {
  Tag
} = require('../models');

const tagController = {
  // display tag page
  async displayTags(_req, res) {
    const allTags = await Tag.findAll();
    res.render('tags', {
      allTags
    });
  },
  // display list of quizs for one tag
  async displayQuizByTag(req, res) {
    const tagId = req.params.id;
    const oneTag = await Tag.findOne({
      where: {
        id: tagId
      },
      include: {
        association: 'quizList',
        include: 'author'
      }
    });
    res.render('tag', {
      oneTag
    });
  }
};

module.exports = tagController;

