const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const middleware = require('./controllers/middleware');

const router = express.Router();

router.use(middleware.setLocals); // pass user session infos to all

router.get('/', mainController.homePage);
router.get('/quiz/:id', quizController.displayQuiz);
router.get('/tags', tagController.displayTags);
router.get('/tags/:id', tagController.displayQuizByTag);

router.get('/signup', userController.signupPage);
router.post('/signup', userController.newUser);
router.get('/login', userController.loginPage);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);

router.get('/admin', adminController.adminPage);
router.get('/admin/quiz/delete/:id', adminController.deleteQuiz);

module.exports = router;