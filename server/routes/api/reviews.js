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
router.post('/add',passport.authenticate('jwt',{session: false}),(req,res) => {
    Reviews.find({user: req.user.id})
        .then(reviews => {

                const reviewFields = {};
                reviewFields.user = req.user.id;
                reviewFields.alfred = mongoose.Types.ObjectId(req.body.alfred);
                reviewFields.content = req.body.content;
                reviewFields.title = req.body.title;
                reviewFields.booking =  mongoose.Types.ObjectId(req.body.booking);

                reviewFields.note = {};
                reviewFields.note.quality_price = req.body.quality_price;
                reviewFields.note.punctuality = req.body.punctuality;
                reviewFields.note.prestation = req.body.prestation;


                const newReviews = new Reviews(reviewFields);
                newReviews.save().then(reviews => res.json(reviews)).catch(err => console.log(err));

                User.findByIdAndUpdate(req.body.alfred, {
                    $inc: {number_of_reviews: 1}
                })
                    .then(data => console.log('update ok'))
                    .catch(err => console.log(err))

        })
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
            if(typeof reviews !== 'undefined' && reviews.length > 0){
                res.json(reviews);
            } else {
                return res.status(400).json({msg: 'No reviews found'});
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
