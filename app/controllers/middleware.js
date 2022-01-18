const middleware = {
  // pass login info by res.locals.session
  setLocals(req, res, next) {
    res.locals.session = req.session.user;
    
    //! LOGS
    /* console.log('MIDDLEWARE -------');
    console.table(res.locals.session);
    console.log('SESSION:', req.session); */
    next();
  },
  isAdmin(req,res,next) {
    if(req.session.user && req.session.user.role=='admin') {
      next();
    } else {
      res.redirect('/login');
    }
  }
};

module.exports = middleware;