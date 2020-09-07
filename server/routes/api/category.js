const express = require('express');
const router = express.Router();
const passport = require('passport');

const Category = require('../../models/Category');
const ServiceUser = require('../../models/ServiceUser');

router.get('/test', (req, res) => res.json({msg: 'Category Works!'}));

// @Route GET /myAlfred/api/category/currentAlfred
// View all categories
router.get('/currentAlfred', passport.authenticate('jwt', {session: false}), async (req, res) => {

  let serviceUsers = await ServiceUser.find({user: req.user});
  serviceUsers = serviceUsers.map(s => s.service);

  Service.find({_id: {$nin: serviceUsers}})
    .sort({'label': 1})
    .populate('tags')
    .populate('category')
    .sort({'category.label': 1})
    .then(services => {
      if (typeof services !== 'undefined' && services.length > 0) {
        let categories = services.map(s => s.category);
        categories = [...new Set(categories)];
        categories.sort((c1, c2) => (c1.label > c2.label) ? 1 : -1);
        res.json(categories);
      } else {
        return res.status(400).json({msg: 'No category found'});
      }

    })
    .catch(err => res.status(404).json({category: 'No category found error:' + JSON.stringify(err)}));


});


// @Route GET /myAlfred/api/category/all
// View all categories
router.get('/all', (req, res) => {

  Category.find()
    .sort({'label': 1})
    .populate('tags')
    .then(category => {
      if (typeof category !== 'undefined' && category.length > 0) {
        res.json(category);
      } else {
        return res.status(400).json({msg: 'No category found'});
      }

    })
    .catch(err => res.status(404).json({category: 'No category found'}));


});

// @Route POST /myAlfred/api/category/all/search
// Search category by label or description
router.post('/all/search', (req, res) => {
  const dat = req.body.label;
  Category.find({$text: {$search: dat, $language: 'none'}})
    .sort({label: 1})
    .then(category => {
      if (typeof category !== 'undefined' && category.length > 0) {

        res.json(category);
      } else {
        return res.status(400).json({msg: 'No category found'});
      }

    })
    .catch(err => res.status(404).json({category: 'Error'}));


});

// @Route GET /myAlfred/api/category/all/sort
// View all categories sort by name
router.get('/all/sort', (req, res) => {

  Category.find()
    .sort({label: 1})
    .then(category => {
      if (typeof category !== 'undefined' && category.length > 0) {
        res.json(category);
      } else {
        return res.status(400).json({msg: 'No category found'});
      }

    })
    .catch(err => res.status(404).json({category: 'No category found'}));


});


// @Route GET /myAlfred/api/category/random/home
// View random categories homepage
router.get('/random/home', (req, res) => {

  Category.countDocuments().exec(function (err, count) {


    let random = Math.floor(Math.random() * count);


    Category.find().populate('tags').skip(random).exec(
      function (err, result) {

        res.json(result);
      });
  });


});

// @Route GET /myAlfred/api/category/all/tags/:tags
// View all category per tags
router.get('/all/tags/:tags', (req, res) => {

  Category.find({tags: req.params.tags})
    .sort({'label': 1})
    .populate('tags')
    .then(category => {
      if (typeof category !== 'undefined' && category.length > 0) {
        res.json(category);
      } else {
        return res.status(400).json({msg: 'No category found'});
      }

    })
    .catch(err => res.status(404).json({service: 'No category found'}));

});

// @Route GET /myAlfred/api/category/:id
// View one category
router.get('/:id', (req, res) => {

  Category.findById(req.params.id)
    .populate('tags')
    .then(category => {
      res.json(category);
    })
    .catch(err => res.status(404).json({category: 'No category found'}));
});


module.exports = router;
