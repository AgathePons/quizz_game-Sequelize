const dotenv = require('dotenv');
dotenv.config();
const {
  Tag
} = require('../models');

const tagController = {
  // display tag page
  async displayTags(_req, res) {
    let allTags= [];
    try {
      allTags = await Tag.findAll();
    }
    catch(err) {
      console.log('TAGS =>', err);
      //res.status(500).send(err);
    }
    res.render('tags', {
      allTags
    });
  },
  // display list of quizs for one tag
  async displayQuizByTag(req, res) {
    const tagId = req.params.id;
    let oneTag = {};
    try {
      oneTag = await Tag.findOne({
        where: {
          id: tagId
        },
        include: {
          association: 'quizList',
          include: 'author'
        }
      });
    } catch(err) {
      console.log('TAG =>', err);
      //res.status(500).send(err);
    }
    res.render('tag', {
      oneTag
    });
  }
};

module.exports = tagController;

