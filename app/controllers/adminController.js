const {
  Quiz, User,
} = require('../models');

const adminController = {
  async adminQuizPage(_req, res) {
    let allQuizs = [];
    try {
      allQuizs = await Quiz.findAll({
        include: 'author'
      });
    } catch(err) {
      console.log('ADMIN QUIZ =>', err);
      //res.status(500).send(err);
    }
    res.render('adminQuiz', {
      allQuizs
    });
  },
  async deleteQuiz(req, res) {
    const quizId = req.params.id;
    //!
    console.log('quiz to delete:', quizId);
    try {
      const quizToDelete = await Quiz.findByPk(quizId);
      if(quizToDelete) {
        console.log(`Quiz ${quizToDelete.title} deleted`);
        await quizToDelete.destroy();
      } else {
        console.warn('Quiz not found');
      }
    } catch(err) {
      console.log('DELETE QUIZ =>', err);
      //res.status(500).send(err);
    }
    res.redirect('/admin');
  },
  async adminUserPage(_req, res) {
    let allUsers = [];
    try {
      allUsers = await User.findAll();
    } catch(err) {
      console.log('ADMIN USER =>', err);
      //res.status(500).send(err);
    }
    res.render('adminUser', {
      allUsers
    });
  },
  async setRoleUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      user.role = 'user';
      await user.save();
    } catch(err) {
      console.log('ADMIN USER TO USER =>', err);
      //res.status(500).send(err);
    }
    res.redirect('/admin/users');
  },
  async setRoleAdmin(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      user.role = 'admin';
      await user.save();
    } catch(err) {
      console.log('ADMIN USER TO ADMIN =>', err);
      //res.status(500).send(err);
    }
    res.redirect('/admin/users');
  }
};

module.exports = adminController;