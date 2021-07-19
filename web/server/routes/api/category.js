const express = require('express')
const router = express.Router()
const passport = require('passport')
const _ = require('lodash')

router.get('/test', (req, res) => res.json({msg: 'Category Works!'}));

// @Route GET /myAlfred/api/category/currentAlfred
// View all categories
router.get('/currentAlfred', passport.authenticate('jwt', {session: false}), async (req, res) => {

  let serviceUsers = await req.context.getModel('ServiceUser').find({user: req.user})
  serviceUsers = serviceUsers.map(s => s.service)

  req.context.getModel('Service').find({_id: {$nin: serviceUsers}})
    .sort({'label': 1})
    .populate('tags')
    .populate('category')
    .sort({'category.label': 1})
    .then(services => {
      if (services.length > 0) {
        let categories = services.map(s => s.category)
        categories = [...new Set(categories)]
        categories.sort((c1, c2) => { return c1.label > c2.label ? 1 : -1 })
        return res.json(categories)
      }
      return res.status(400).json({msg: 'No category found'})
    })
    .catch(err => {
      return res.status(404).json({category: `No category found error:${err}`})
    })
})

// @Route GET /myAlfred/api/category/all
// View all categories
router.get('/particular', (req, res) => {
  req.context.getModel('Service').find({particular_access: true}, 'category')
    .populate('category')
    .then(services => {
      let categories=_.uniqBy(services.map(s => s.category), c => c._id)
      categories = _.orderBy(categories, 'professional_label')
      res.json(categories);
    })
    .catch(err => res.status(404).json({category: 'No category found'}));
});

// @Route GET /myAlfred/api/category/professional
// View all pro categories, i.e. having at least one service with professional_access
router.get('/professional', (req, res) => {

  req.context.getModel('Service').find({professional_access: true}, 'category')
    .populate('category')
    .then(services => {
      var categories=_.uniqBy(services.map(s => s.category), c => c._id)
      categories = _.orderBy(categories, 'professional_label')
      res.json(categories);
    })
    .catch(err => res.status(404).json({category: 'No category found'}));
});

// @Route GET /myAlfred/api/category/random/home
// View random categories homepage
router.get('/random/home', (req, res) => {

  req.context.getModel('Category').countDocuments().exec(function (err, count) {


    let random = Math.floor(Math.random() * count);


    req.context.getModel('Category').find().populate('tags').skip(random).exec(
      function (err, result) {

        res.json(result);
      });
  });


});

// @Route GET /myAlfred/api/category/all/tags/:tags
// View all category per tags
router.get('/all/tags/:tags', (req, res) => {

  req.context.getModel('Category').find({tags: req.params.tags})
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

  req.context.getModel('Category').findById(req.params.id)
    .populate('tags')
    .then(category => {
      res.json(category);
    })
    .catch(err => res.status(404).json({category: 'No category found'}));
});


module.exports = router;
