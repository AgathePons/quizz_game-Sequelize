const validator = require('email-validator');
const bcrypt = require('bcrypt');
const {
  User,
} = require('../models');

const userController = {
  // display signup page
  async signupPage(_req, res) {
    res.render('signup');
  },
  // method post to signup
  async newUser(req, res) {
    console.log(req.body);
    const formContent = req.body;
    try {
      const user = await User.findOne({
        where: {
          email: formContent.email
        }
      });
      // if there is not this email yet in bdd
      if (!user) {
        // if mail format is valid
        if (validator.validate(formContent.email)) {
          // if field password and password confirm match
          if (formContent.password === formContent.passwordConfirm) {
            //resolve ok create user
            const passwordHashed = await bcrypt.hash(formContent.password, 10);// hash password
            //!
            console.log('PASSWORD:',passwordHashed);
            // new User
            const newUser = new User({
              firstname: formContent.firstname,
              lastname: formContent.lastname,
              email: formContent.email,
              password: passwordHashed
            });
            await newUser.save();
            // initialize session with new user infos
            //req.session.user = newUser;
            //delete req.session.user.password;
            setSession(req, newUser);
            //!
            console.log('NEW USER SESSION:', req.session.user);
            res.redirect('/');
          } else {
            res.render('signup', {
              error: 'le mot de passe et sa confirmation ne sont pas identiques'
            });
          }
        } else {
          res.render('signup', {error: 'le format de l\'adresse mail est incorrect'});
        }
      } else {
        res.render('signup', {
          error: 'email déjà utilisé'
        });
      }
    } catch (err) {
      console.log('SIGNUP POST METHOD =>', err);
      //res.status(500).send(err);
    }
  },
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

module.exports = userController;

const setSession = (req, newUser) => {
  req.session.user = {
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    fullname: newUser.fullname,
    email: newUser.email,
    role: newUser.role
  };
};