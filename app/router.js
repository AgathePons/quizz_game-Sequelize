const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');

const router = express.Router();

router.get('/', mainController.homePage);
router.get('/quiz/:id', quizController.displayQuiz);
router.get('/tags', tagController.displayTags);
router.get('/tags/:id', tagController.displayQuizByTag);

module.exports = router;