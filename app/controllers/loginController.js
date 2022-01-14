const dotenv = require('dotenv');
dotenv.config();

const {
  User
} = require('../models');

const loginController = {

  async loginPage(req, res) {

    res.render('login');
  },
  async postLogin(req, res, next) {
    const userLogin = req.body;
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });
    console.log(user);
    if(user){
        req.session.login = user;
        console.log(req.session.login);
    }
    res.redirect('/');
  }
};

module.exports = loginController;