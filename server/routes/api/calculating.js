const express = require('express');
const router = express.Router();
const csv = require('fast-csv');

const fs = require('fs');


const Calculating = require('../../models/Calculating');

router.get('/test', (req, res) => res.json({msg: 'Calculating Works!'}));


// @Route GET /myAlfred/api/calculating/all
// View all calculating system
router.get('/all', (req, res) => {

  Calculating.find()
    .then(calculating => {
      if (typeof calculating !== 'undefined' && calculating.length > 0) {
        res.json(calculating);
      } else {
        return res.status(400).json({msg: 'No calculating found'});
      }

    })
    .catch(err => res.status(404).json({calculating: 'No calculating found'}));


});

/*router.get('/import',(req,res) => {
    let  result  = [];
    let csvStream = csv.fromPath(csvfile)
        .on("data", function(data){

            const item = new Calculating({
                label: data[0]
            });

            item.save(function(error){
                console.log(item);
                if(error){
                    throw error;
                }
            });

        }).on("end", function(){

        });

    stream.pipe(csvStream);
    res.json({success : "Data imported successfully.", status : 200});
});*/

// @Route GET /myAlfred/api/calculating/:id
// View one calculating system
router.get('/:id', (req, res) => {

  Calculating.findById(req.params.id)
    .then(calculating => {
      if (Object.keys(calculating).length === 0 && calculating.constructor === Object) {
        return res.status(400).json({msg: 'No calculating found'});
      } else {
        res.json(calculating);
      }

    })
    .catch(err => res.status(404).json({calculating: 'No calculating found'}));


});


module.exports = router;
