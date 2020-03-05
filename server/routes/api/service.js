const express = require('express');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

const Service = require('../../models/Service');
const ServiceUser = require('../../models/ServiceUser');
router.get('/test',(req, res) => res.json({msg: 'Service Works!'}) );


// @Route GET /myAlfred/api/service/all
// View all service
router.get('/all',(req,res)=> {

        Service.find()
            .sort({'label':1})
            .populate('tags')
            .populate('equipments')
            .populate('category')
            .then(service => {
                if(typeof service !== 'undefined' && service.length > 0){
                    res.json(service);
                } else {
                    return res.status(400).json({msg: 'No service found'});
                }

            })
            .catch(err => res.status(404).json({ service: 'No service found' }));


});

// @Route POST /myAlfred/api/service/all/search
// Search service by label or description
router.post('/all/search', (req,res)=> {
    const dat = "\""+req.body.label+"\"";
    //const data = dat.replace(new RegExp(/[eéèêaàoôuù]/g), "[eéèêaàoôuù]");
    Service.find({$text:{$search:dat}})
        .populate('category')
        .sort({label:1})
        .then(service => {
            if(typeof service !== 'undefined' && service.length > 0){

                res.json(service);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'Error' }));


});

// @Route GET /myAlfred/api/service/random/home
// View random service homepage
router.get('/random/home',(req,res)=> {

    Service.countDocuments().exec(function (err, count) {

        let limitrecords=6;

        function getRandomArbitrary(min, max) {
            return Math.ceil(Math.random() * (max - min) + min);
        }
        let skipRecords = getRandomArbitrary(1, count-limitrecords);

        let random = Math.floor(Math.random() * count);


        Service.find().populate('category').limit(6).skip(random).exec(
            function (err, result) {

                res.json(result)
            })
    })


});

// @Route GET /myAlfred/api/service/:id
// View one service
router.get('/:id',(req,res)=> {

    Service.findById(req.params.id)
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(service => {
            if(Object.keys(service).length === 0 && service.constructor === Object){
                return res.status(400).json({msg: 'No service found'});
            } else {
                res.json(service);
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));

});

// @Route GET /myAlfred/api/service/all/:category
// View all service per category
router.get('/all/:category',(req,res)=> {

    Service.find({category: req.params.category})
        .sort({'label':1})
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(service => {
            if(typeof service !== 'undefined' && service.length > 0){
                res.json(service);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));

});

// @Route GET /myAlfred/api/service/currentAlfred/:category
// View all service per category filtered by already provided Alfred's services
router.get('/currentAlfred/:category', passport.authenticate('jwt',{session:false}), async (req,res)=> {

    let serviceUsers = await ServiceUser.find({user:req.user});
    serviceUsers = serviceUsers.map(s => s.service);

    Service.find({category: req.params.category, _id : { $nin: serviceUsers}})
        .sort({'label':1})
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(services => {
            if(typeof services !== 'undefined' && services.length > 0){
                res.json(services);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found:error' }));

});

// @Route GET /myAlfred/api/service/all/tags/:tags
// View all service per tags
router.get('/all/tags/:tags',(req,res)=> {

    Service.find({tags: req.params.tags})
        .sort({'label':1})
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(service => {
            if(typeof service !== 'undefined' && service.length > 0){
                res.json(service);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));

});

// @Route GET /myAlfred/api/service/keyword/:kw
// Get services by keyword
// Search into category(label/description), service(label/description/job), prestation(label/dsecription)
// Return { category_name : { services} }
router.get('/keyword/:kw',(req,res)=> {

    var kw = req.params.kw;
    var regexp = new RegExp(kw,'i');
    var result={}
    var keywords = {}
    Category.find({label:{$regex:regexp}})
      .then(categories => {
        Service.find({ $or : [{category: {$in: categories.map(c=> c._id)}}, {label:{$regex:regexp}}]})
          .populate('category')
          .then(services => {
             services.forEach(s => {
               result[s.category.label] ? result[s.category.label].push({label:s.label, id:s._id}) : result[s.category.label]=[{label:s.label, id:s._id}];
               let key=s.category.label+s.label;
               keywords[key] ? keywords[key].push(s.category.label) : keywords[key]=[s.category.label];
             });
             Prestation.find({label:{$regex:regexp}})
               .populate({path : 'service', populate: { path:'category'}}).then(prestations => {
                  prestations.forEach(p => {
                    let s = p.service;
                    result[s.category.label] ? result[s.category.label].push({label:s.label, id:s._id}) : result[s.category.label]=[{label:s.label, id:s._id}];
                    let key=s.category.label+s.label;
                    keywords[key] ? keywords[key].push(p.label) : keywords[key]=[p.label];
                  });
                  Prestation.find()
                    .populate({path : 'service', populate: { path:'category'}})
                    .populate({ path: "job", match: {label:{$regex:regexp}}})
                    .then(prestations => {
                       prestations.forEach(p => {
                         if ('job' in p && p['job']!=null) {
                           let s = p.service;
                           result[s.category.label] ? result[s.category.label].push({label:s.label, id:s._id}) : result[s.category.label]=[{label:s.label, id:s._id}];
                           let key=s.category.label+s.label;
                           keywords[key] ? keywords[key].push(p['job'].label) : keywords[key]=[p['job'].label];
                         }
                       });
                  Object.keys(result).forEach( k => {
                    result[k] = _.uniqWith(result[k], _.isEqual)
                    result[k] = _.sortBy(result[k], ['label'])
                  });
                  var ordered = {}
                  Object.keys(result).sort().forEach(key => {
                    result[key].forEach(s => {
                      s.keywords=_.uniqWith(keywords[key+s.label], _.isEqual);
                    });
                    ordered[key] = result[key];
                  });
                  result = ordered;
                  
                  res.json(result);
                  });

               });
           })
           }
      )
      //.catch((err) => res.json("Error:"+JSON.stringify(err)));
});

module.exports = router;
