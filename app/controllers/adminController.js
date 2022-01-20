const { Tag } = require('../models');

const adminController = {
  adminPage: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.render('admin', {tags});
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
    
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