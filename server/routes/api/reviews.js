const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const Reviews = require('../../models/Reviews');
const User = require('../../models/User');
const Booking = require('../../models/Booking');

router.get('/test',(req, res) => res.json({msg: 'Reviews Works!'}) );

// @Route POST /myAlfred/api/reviews/add/alfred
// Add a review for an alfred
// @Access private
router.post('/add/alfred',passport.authenticate('jwt',{session: false}),(req,res) => {


                const reviewFields = {};
                reviewFields.user = req.user.id;
                reviewFields.alfred = mongoose.Types.ObjectId(req.body.alfred);
                reviewFields.content = req.body.content;
                reviewFields.serviceUser = req.body.service;

                reviewFields.note_alfred = {};
                reviewFields.note_alfred.prestation_quality = req.body.prestation_quality;
                reviewFields.note_alfred.quality_price= req.body.quality_price;
                reviewFields.note_alfred.relational = req.body.relational;

                // Compliments
                reviewFields.note_alfred.careful = req.body.careful;
                reviewFields.note_alfred.punctual = req.body.punctual;
                reviewFields.note_alfred.flexible = req.body.flexible;
                reviewFields.note_alfred.reactive = req.body.reactive;

                let quality = parseInt(req.body.quality_price,10);
                let prestation = parseInt(req.body.prestation_quality,10);
                let relational = parseInt(req.body.relational,10);


                reviewFields.note_alfred.global = (quality + relational + prestation)/3;

                const newReviews = new Reviews(reviewFields);
                newReviews.save().then(() => {
                    Booking.findByIdAndUpdate(req.body.booking,{alfred_evaluated: true}).then(()=>res.json('ok')).catch(error => console.log(error))
                }).catch(err => console.log(err));

                User.findByIdAndUpdate(req.body.alfred, {
                    $inc: {number_of_reviews: 1}
                })
                    .then(() => {
                        User.findById(req.body.alfred)
                            .then(user => {
                                const score = (quality + relational + prestation)/3;
                                if(user.number_of_reviews === 1){
                                    user.score = score.toFixed(2);
                                } else {
                                    // FIX : mauvais calcul de moyenne
                                    user.score = ((user.score + score)/2).toFixed(2);
                                }
                                user.save().then(users => console.log('reviews update')).catch(err => console.log(err));
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                    )
                    .catch(err => console.log(err));
});

// @Route POST /myAlfred/api/reviews/add/client
// Add a review for a client
// @Access private
router.post('/add/client',passport.authenticate('jwt',{session: false}),(req,res) => {


    const reviewFields = {};
    reviewFields.alfred = req.user.id;
    reviewFields.user = mongoose.Types.ObjectId(req.body.client);
    reviewFields.content = req.body.content;
    reviewFields.serviceUser = req.body.service;

    reviewFields.note_client = {};
    reviewFields.note_client.reception = req.body.accueil;
    reviewFields.note_client.accuracy= req.body.accuracy;
    reviewFields.note_client.relational = req.body.relational;

    let reception = parseInt(req.body.accueil,10);
    let accuracy = parseInt(req.body.accuracy,10);
    let relational = parseInt(req.body.relational,10);


    reviewFields.note_client.global = (reception + relational + accuracy)/3;

    const newReviews = new Reviews(reviewFields);
    newReviews.save().then(() => {
        Booking.findByIdAndUpdate(req.body.booking,{user_evaluated: true}).then(()=>res.json('ok')).catch(error => console.log(error))
    }).catch(err => console.log(err));

    User.findByIdAndUpdate(req.body.client, {
        $inc: {number_of_reviews_client: 1}
    })
        .then(() => {
                User.findById(req.body.client)
                    .then(user => {
                        const score = (reception + relational + accuracy)/3;
                        if(user.number_of_reviews_client === 1) {
                            user.score_client = score.toFixed(2);
                        } else {
                            user.score_client = ((user.score_client + score)/2).toFixed(2);
                        }
                        user.save().then(users => console.log('reviews update')).catch(err => console.log(err));
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        )
        .catch(err => console.log(err));
});

// @Route GET /myAlfred/api/reviews/:user_id
// get skills for user, returns 4 skills cumulated
// @Access private
router.get('/:user_id',passport.authenticate('jwt',{session:false}),(req,res)=> {
  const userId=mongoose.Types.ObjectId(req.params.user_id);
  var result={careful:0, punctual:0, flexible:0, reactive:0};
  Reviews.find({alfred:userId})
    .then(reviews => {
      if(typeof reviews !== 'undefined' && reviews.length > 0){
        reviews.forEach( r => {
          const note=r.note_alfred;
          Object.entries(note).forEach( e => {
            const skillName=e[0];
            const skillSet=e[1];
            if (skillSet) {
              result[skillName]=result[skillName]+1;
            }
          });
        });
        res.json(result);
      } else {
        res.json(result);
      }
    })
    .catch(err => console.log(err) && res.status(404).json(result));
});

// @Route GET /myAlfred/api/reviews/all
// View all reviews
// @Access private
router.get('/all',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Reviews.find()
            .populate('alfred')
            .populate('user')
            .then(reviews => {
                if(typeof reviews !== 'undefined' && reviews.length > 0){
                    res.json(reviews);
                } else {
                    return res.status(400).json({msg: 'No reviews found'});
                }



            })
            .catch(err => res.status(404).json({ reviews: 'No reviews found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }
});

router.get('/customerReviewsCurrent', passport.authenticate('jwt', { session: false }), ( req, res ) => {
    const userId = mongoose.Types.ObjectId(req.user.id);
    Reviews.find({ alfred: userId,note_client:undefined })
        .populate('alfred','-id_card')
        .populate('user','-id_card')
        .populate('serviceUser')
        .populate({path: 'serviceUser', populate: { path: 'service' }})
        .then(review => {
            res.status(200).json(review);
        })
        .catch(err => res.status(404).json(err))
});

router.get('/alfredReviewsCurrent', passport.authenticate('jwt', { session: false }), ( req, res ) => {
    const userId = mongoose.Types.ObjectId(req.user.id);
    Reviews.find({ user: userId, note_alfred:undefined })
        .populate('alfred','-id_card')
        .populate('user','-id_card')
        .populate('serviceUser')
        .populate({path: 'serviceUser', populate: { path: 'service' }})
        .then(review => {
            res.status(200).json(review);
        })
        .catch(err => res.status(404).json(err))
});

router.get('/profile/customerReviewsCurrent/:id', passport.authenticate('jwt', { session: false }), ( req, res ) => {
    const userId = mongoose.Types.ObjectId(req.params.id);
    Reviews.find({ alfred: userId, note_client: undefined })
        .populate('alfred','-id_card')
        .populate('user','-id_card')
        .populate('serviceUser')
        .populate({path: 'serviceUser', populate: { path: 'service' }})
        .then(review => {
            res.status(200).json(review);
        })
        .catch(err => res.status(404).json(err))
})

router.get('/profile/alfredReviewsCurrent/:id', passport.authenticate('jwt', { session: false }), ( req, res ) => {
    const userId = mongoose.Types.ObjectId(req.params.id);
    Reviews.find({ user: userId, note_alfred: undefined })
        .populate('alfred','-id_card')
        .populate('user','-id_card')
        .populate('serviceUser')
        .populate({path: 'serviceUser', populate: { path: 'service' }})
        .then(review => {
            res.status(200).json(review);
        })
        .catch(err => res.status(404).json(err))
})

// @Route GET /myAlfred/api/reviews/alfred/:id
// View the reviews list for one alfred
router.get('/alfred/:id',(req,res) => {
    Reviews.find({alfred: req.params.id,note_client:undefined})
        .populate('alfred')
        .populate('user')
        .then(reviews => {
            if(typeof reviews !== 'undefined' && reviews.length > 0){
                res.json(reviews);
            } else {
                return res.status(400).json({msg: 'No reviews found'});
            }
        })
        .catch(err => res.status(404).json({ reviews: 'No reviews found' }));
});

// @Route GET /myAlfred/api/reviews/:id
// View one review
// @Access private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Reviews.findById(req.params.id)
        .populate('alfred')
        .populate('user')
        .then(reviews => {
            if(Object.keys(reviews).length === 0 && reviews.constructor === Object){
                return res.status(400).json({msg: 'No reviews found'});
            } else {
                res.json(reviews);
            }

        })
        .catch(err => res.status(404).json({ reviews: 'No reviews found' }));
});


// @Route DELETE /myAlfred/reviews/:id
// Delete one review
// @Access private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Reviews.findById(req.params.id)
        .then(reviews => {
            reviews.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({reviewsnotfound: 'No reviews found'}));
});


module.exports = router;
