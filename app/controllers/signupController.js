const {
  User,
} = require('../models');

const signupController = {
  // display signup page
  async signupPage(_req, res) {
    res.render('signup');
  },
  // method post to signup
  async newUser(req, res) {
    console.log(req.body);
    if(req.body.password === req.body.passwordConfirm) {
      await User.create({
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