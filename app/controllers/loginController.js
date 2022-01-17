const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const {
  User
} = require('../models');
const { newUser } = require('./signupController');

const loginController = {
  // display login page
  async loginPage(_req, res) {
    res.render('login');
  },
  // method post to login
  async postLogin(req, res) {
    const formContent = req.body;
    const user = await User.findOne({
      where: {
        email: formContent.email,
        //password: req.body.password
      }
    });
    if(user) {
      if(await bcrypt.compare(formContent.password, user.password)) {
        setSession(req, user);
        res.redirect('/');
      } else {
        res.render('login', {
          error: 'il y a une erreur dans le couple login/mdp'
        });
      }
    } else {
      res.render('login', {
        error: 'il y a une erreur dans le couple login/mdp'
      });
    }
  },
  logout(req, res) {
    req.session.user = null;
    res.redirect('/');
  }
};

module.exports = loginController;

const setSession = (req, newUser) => {
  req.session.user = {
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    fullname: newUser.fullname,
    email: newUser.email,
    role: newUser.role
  };
};