const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');

const router = express.Router();
router.use(mainController.checkLogin);
router.get('/', mainController.homePage);
router.get('/quiz/:id', quizController.displayQuiz);
router.get('/tags', tagController.displayTags);
router.get('/tags/:id', tagController.displayQuizByTag);
router.get('/signup', signupController.signupPage);
router.post('/signup', signupController.newUser);
router.get('/login', loginController.loginPage);
router.post('/login', loginController.postLogin);

module.exports = router;