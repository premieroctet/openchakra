const mongoose = require('mongoose');
const {config, SERVER_PROD} = require('../config/config');
const {normalize}=require('../utils/text')

const Category=require('../server/models/Category')
const Prestation=require('../server/models/Prestation')
const Service=require('../server/models/Service')
const ServiceUser=require('../server/models/ServiceUser')
const Shop=require('../server/models/Shop')
const Booking=require('../server/models/Booking')

const mep_b2b = () => {
  Category.find({label : {$exists:true}})
    .then( models => {
      console.log(`Got ${models.length} categories`)
      models.forEach( model => {
        model = model._doc
        Category.findByIdAndUpdate(model._id, {
          $set : {
            particular_label:model.label,
            s_particular_label:normalize(model.label),
            professional_label:model.label,
            s_professional_label:normalize(model.label),
            particular_picture:model.picture,
            professional_picture:model.picture,
          },
          $unset : {
            picture: true,
            label: true,
            s_label: true,
          }
        }, { new: true})
          .then( newModel => {
            console.log(`ok:${newModel}`)
          })
          .catch (err => console.error(err))
      })
    })
    .catch(err => console.error(err))
    Service.updateMany({}, {
      $set : {
        particular_access:true,
        professional_access:false,
      },
    }, { new: true})
      .then( newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch (err => console.error(err))
    Prestation.updateMany({}, {
      $set : {
        particular_access:true,
        professional_access:false,
      },
    }, { new: true})
      .then( newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch (err => console.error(err))
    ServiceUser.updateMany({}, {
      $set : {
        particular_access:true,
        professional_access:false,
        experience_title: '',
        experience_description: '',
        experience_skils: [],
      },
    }, { new: true})
      .then( newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch (err => console.error(err))
    Shop.updateMany({}, {
      $unset : {
        'company.creation_date':true,
        'company.naf_ape':true,
        'company.status':true,
        'social_security': true,
      },
    }, { new: true})
      .then( newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch (err => console.error(err))
    Booking.updateMany({}, { company_amount:0})
    .then( newModel => {
      console.log(`ok:${JSON.stringify(newModel)}`)
    })
    .catch (err => console.error(err))
}

// Connect to MongoDB
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then( () => {
    console.log('Connected DB')
    mep_b2b()
  })
  .catch(err => console.error(err));
