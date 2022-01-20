const { Tag } = require('../models');

const adminController = {
  adminPage: (req, res) => {
    res.render('admin');
  },
  addTag: async (req, res) => {
    //!
    console.log('----New tag:', req.body.newTag);
    await Tag.create({
      name: req.body.newTag
    });
    res.redirect('/tags');
  }
};

module.exports = adminController;