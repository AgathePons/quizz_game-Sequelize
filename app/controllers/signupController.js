const {
  User,
} = require('../models');

const signupController = {

  async signupPage(req, res) {
    
    res.render('signup');
  },
  async newUser(req, res, next) {
    console.log(req.body);
    if(req.body.password === req.body.passwordConfirm) {
      const newUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });
    }
    res.redirect('/');
  }
};

module.exports = signupController;