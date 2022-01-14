const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');

const router = express.Router();

router.get('/', mainController.homePage);
router.get('/quiz/:id', quizController.displayQuiz);

module.exports = router;