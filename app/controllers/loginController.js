const dotenv = require('dotenv');
dotenv.config();
const {
  User
} = require('../models');

const loginController = {
  // display login page
  async loginPage(_req, res) {
    res.render('login');
  },
  // method post to login
  async postLogin(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });
    if(user){
      req.session.login = user;
    }
    res.redirect('/');
  }
};

module.exports = loginController;