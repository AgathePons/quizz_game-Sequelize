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
  },
  editTagPage: async (req, res) => {
    const tagToEdit = req.params.id;
    //!
    console.log('tag to edit:', tagToEdit);
    try {
      const tag = await Tag.findByPk(tagToEdit);
      res.render('admin_edit_tag', {tag});
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
  editTagPost: async (req, res) => {
    const tagId = req.params.id;
    const newTagName = req.body.newTagName;
    //!
    console.log('NEW TAG NAME', req.body.newTagName);
    try {
      const tag = await Tag.findByPk(tagId);
      tag.name = newTagName;
      tag.save();
      res.redirect('/tags');
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  }
};

module.exports = adminController;