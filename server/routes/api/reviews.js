const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const Reviews = require('../../models/Reviews');
const User = require('../../models/User');

router.get('/test',(req, res) => res.json({msg: 'Reviews Works!'}) );

// @Route POST /myAlfred/api/reviews/add
// Add a review
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

                let quality = parseInt(req.body.quality_price,10);
                let prestation = parseInt(req.body.prestation_quality,10);
                let relational = parseInt(req.body.relational,10);


                reviewFields.note_alfred.global = (quality + relational + prestation)/3;

                const newReviews = new Reviews(reviewFields);
                newReviews.save().then(reviews => res.json(reviews)).catch(err => console.log(err));

                User.findByIdAndUpdate(req.body.alfred, {
                    $inc: {number_of_reviews: 1}
                })
                    .then(() => {
                        User.findById(req.body.alfred)
                            .then(user => {
                                const score = (quality + relational + prestation)/3;
                                user.score = ((user.score + score)/2).toFixed(2);
                                user.save().then(users => console.log('reviews update')).catch(err => console.log(err));
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        }
                    )
                    .catch(err => console.log(err));






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
            .populate('booking')
            .populate({path:'booking',populate:{path: 'prestation',select:'label'}})
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

// @Route GET /myAlfred/api/reviews/myReviews
// View the reviews list for the current user
// @Access private
router.get('/myReviews',passport.authenticate('jwt',{session: false}),(req,res) => {
    Reviews.find({user: req.user.id})
        .populate('alfred')
        .populate('user')
        .populate('booking')
        .populate({path:'booking',populate:{path: 'prestation',select:'label'}})
        .then(reviews => {
            if(typeof reviews !== 'undefined' && reviews.length > 0){
                res.json(reviews);
            } else {
                return res.status(400).json({msg: 'No reviews found'});
            }
        })
        .catch(err => res.status(404).json({ reviews: 'No reviews found' }));
});

// @Route GET /myAlfred/api/reviews/alfred/:id
// View the reviews list for one alfred
router.get('/alfred/:id',(req,res) => {
    Reviews.find({alfred: req.params.id})
        .populate('alfred')
        .populate('user')
        .populate('booking')
        .populate({path:'booking',populate:{path: 'prestation',select:'label'}})
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
        .populate('booking')
        .populate({path:'booking',populate:{path: 'prestation',select:'label'}})
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
