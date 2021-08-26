const mongoose = require('mongoose')
const {config} = require('../config/config')
const {normalize}=require('../utils/text')
const {connectionPool}=require('../server/utils/database')
const {serverContextFromPartner}=require('../server/utils/serverContext')

/** TODO Exemple bulk update
Category.find({label: {$exists: true}})
  .then(models => {
    console.log(`Got ${models.length} categories`)
    var bulk = Category.collection.initializeUnorderedBulkOp()
    models.forEach(result => {
      const model=result._doc
      bulk.find({_id: model._id}).updateOne({
        $set: {
          particular_label: model.label,
          s_particular_label: normalize(model.label),
          professional_label: model.label,
          s_professional_label: normalize(model.label),
          particular_picture: model.picture,
          professional_picture: model.picture,
        },
        $unset: {
          picture: true,
          label: true,
          s_label: true,
        },
      })
    })
    bulk.execute(function(err, result) {
      if (err) {
        return console.error(`bulk update nok:${err}`)
      }
      console.log(`bulk update ok:${result}`)
    })
  })
*/

const mep_b2b = () => {
  console.log(connectionPool.databases)
  connectionPool.databases.map(d => serverContextFromPartner(d)).forEach(context => {
    console.log(`MEP updating database ${context.getDbName()}`)
    const Category=context.getModel('Category')
    const Prestation=context.getModel('Prestation')
    const Service=context.getModel('Service')
    const ServiceUser=context.getModel('ServiceUser')
    const Shop=context.getModel('Shop')
    const Booking=context.getModel('Booking')
    const User=context.getModel('User')
    Category.find({label: {$exists: true}})
      .then(models => {
        console.log(`Got ${models.length} categories`)
        models.forEach(model => {
          Category.findByIdAndUpdate(model._id, {
            $set: {
              particular_label: model.label,
              s_particular_label: normalize(model.label),
              professional_label: model.label,
              s_professional_label: normalize(model.label),
              particular_picture: model.picture,
              professional_picture: model.picture,
            },
            $unset: {
              picture: true,
              label: true,
              s_label: true,
            },
          }, {new: true})
            .then(newModel => {
              console.log(`ok:${newModel}`)
            })
            .catch(err => console.error(err))
        })
      })
      .catch(err => console.error(err))
    Service.updateMany({particular_accesss: {$exists: false}}, {
      $set: {
        particular_access: true,
        professional_access: false,
      },
    }, {new: true})
      .then(newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch(err => console.error(err))
    Prestation.updateMany({particular_accesss: {$exists: false}}, {
      $set: {
        particular_access: true,
        professional_access: false,
      },
    }, {new: true})
      .then(newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch(err => console.error(err))
    ServiceUser.updateMany({particular_accesss: {$exists: false}}, {
      $set: {
        particular_access: true,
        professional_access: false,
        experience_title: '',
        experience_description: '',
        experience_skils: [],
      },
    }, {new: true})
      .then(newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch(err => console.error(err))
    Shop.updateMany({'company.creation_date': {$exists: true}}, {
      $unset: {
        'company.creation_date': true,
        'company.naf_ape': true,
        'company.status': true,
        'social_security': true,
      },
    }, {new: true})
      .then(newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch(err => console.error(err))
    Booking.updateMany({company_amount: {$exists: false}}, {$set: {company_amount: 0}})
      .then(newModel => {
        console.log(`ok:${JSON.stringify(newModel)}`)
      })
      .catch(err => console.error(err))

    User.find({roles: {$exists: false}})
      .then(users => {
        users.forEach(u => {
          u.company = null
          u.roles = []
          u.email = u.email.toLowerCase().trim()
          u.save()
        })
        console.log('ok for users')
      })
      .catch(err => console.error(err))
    console.log('Finished')
  })
}

// Connect to MongoDB
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => {
    console.log('Connected DB')
    setTimeout(mep_b2b, 2000)
  })
  .catch(err => console.error(err))
