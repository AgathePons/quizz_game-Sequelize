const middleware = {
  // pass login info by res.locals.session
  async setLocals(req, res, next) {
    res.locals.session = req.session.user;
    
    //! LOGS
    console.log('MIDDLEWARE -------');
    console.table(res.locals.session);
    console.log('SESSION:', req.session);
    next();
  },
};

module.exports = middleware;