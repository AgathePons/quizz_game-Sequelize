const dotenv = require('dotenv');
dotenv.config();

const {
  Tag
} = require('../models');

const tagController = {
  async displayTags(req, res) {
    const allTags = await Tag.findAll();
    res.render('tags', {
      allTags
    });
  },
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
    console.log(oneTag);
    res.render('tag', {
      oneTag
    });
  }
};

module.exports = tagController;

