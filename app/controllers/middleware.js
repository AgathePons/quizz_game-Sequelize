const middleware = {
  // pass login info by res.locals.session
  async checkLogin(req, res, next) {
    res.locals.session = req.session.login;
    console.log('MIDDLEWARE -------');
    console.table(res.locals.session);
    next();
  },
};

module.exports = middleware;