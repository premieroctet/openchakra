const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const Favoris = require('../../models/Favoris');

router.get('/test', (req, res) => res.json({msg: 'Favoris Works!'}));

// @Route POST /myAlfred/api/favoris/add
// Add a favoris list
// @Access private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  Favoris.find({user: req.user.id})
    .then(favoris => {
      if (typeof favoris !== 'undefined' && favoris.length > 0) {
        //add a favoris in the list
        if (req.body.alfred) {
          favoris.alfred.unshift(mongoose.Types.ObjectId(req.body.alfred));
          favoris.save().then(list => res.json(list)).catch(err => console.error(err));
        } else {
          return res.status(400).json({msg: 'This favoris list already exists'});
        }
      } else {
        const favorisFields = {};
        favorisFields.user = req.user.id;

        favorisFields.alfred = [];
        favorisFields.alfred.unshift(mongoose.Types.ObjectId(req.body.alfred));

        const newFavoris = new Favoris(favorisFields);
        newFavoris.save().then(favoris => res.json(favoris)).catch(err => console.error(err));
      }
    });
});

// @Route GET /myAlfred/api/favoris/all
// View all favoris list
// @Access private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decode = jwt.decode(token);
  const admin = decode.is_admin;
  if (admin) {
    Favoris.find()
      .populate('alfred')
      .populate('user')
      .then(favoris => {
        if (typeof favoris !== 'undefined' && favoris.length > 0) {
          res.json(favoris);
        } else {
          return res.status(400).json({msg: 'No favoris found'});
        }


      })
      .catch(err => res.status(404).json({favoris: 'No favoris found'}));
  } else {
    res.status(400).json({msg: 'Access denied'});
  }
});

// @Route GET /myAlfred/api/favoris/myList
// View the favoris list for the current user
// @Access private
router.get('/myList', passport.authenticate('jwt', {session: false}), (req, res) => {
  Favoris.find({user: req.user.id})
    .populate('alfred')
    .populate('user')
    .then(favoris => {
      if (typeof favoris !== 'undefined' && favoris.length > 0) {
        res.json(favoris);
      } else {
        return res.status(400).json({msg: 'No favoris found'});
      }
    })
    .catch(err => res.status(404).json({favoris: 'No favoris found'}));
});

// @Route GET /myAlfred/api/favoris/:id
// View one favoris list
// @Access private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Favoris.findById(req.params.id)
    .populate('alfred')
    .populate('user')
    .then(favoris => {
      if (Object.keys(favoris).length === 0 && favoris.constructor === Object) {
        return res.status(400).json({msg: 'No favoris found'});
      } else {
        res.json(favoris);
      }

    })
    .catch(err => res.status(404).json({favoris: 'No favoris found'}));
});


// @Route DELETE /myAlfred/favoris/:id
// Delete one favoris list
// @Access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Favoris.findById(req.params.id)
    .then(favoris => {
      favoris.remove().then(() => res.json({success: true}));
    })
    .catch(err => res.status(404).json({favorisnotfound: 'No favoris found'}));
});

// @Route DELETE /myAlfred/favoris/alfred/:id
// Delete one alfred from the list
// @Access private
router.delete('/alfred/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Favoris.findOne({user: req.user.id})
      .then(favoris => {
        const removeIndex = favoris.alfred
          .map(item => item.id)
          .indexOf(req.params.id);

        favoris.alfred.splice(removeIndex, 1);


        favoris.save().then(list => res.json(list));
      })
      .catch(err => res.status(404).json(err));
  },
);


module.exports = router;
