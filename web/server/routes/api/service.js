const express = require('express')
const passport = require('passport')
const lodash = require('lodash')
const {HTTP_CODES} = require('../../utils/errors')
const {PART, PRO}=require('../../../utils/consts')
const Company = require('../../models/Company')
const Prestation = require('../../models/Prestation')
const Service = require('../../models/Service')
const ServiceUser = require('../../models/ServiceUser')

const router = express.Router()

// @Route GET /myAlfred/api/service/all
// View all service
router.get('/all', (req, res) => {
  Service.find()
    .sort({'label': 1})
    .populate('equipments')
    .populate('category')
    .then(service => {
      if (typeof service !== 'undefined' && service.length > 0) {
        res.json(service)
      }
      else {
        return res.status(400).json({msg: 'No service found'})
      }
    })
    .catch(err => {
      console.error(err)
      res.status(HTTP_CODES.NOT_FOUND).json({service: 'No service found'})
    })
})

// @Route GET /myAlfred/api/service/professional
// View all professional services
router.get('/professional', (req, res) => {
  Service.find({professional_access: true}, 'label')
    .sort({'label': 1})
    .then(services => {
      if (!services) {
        return res.status(400).json({msg: 'No service found'})
      }
      res.json(services)

    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json({service: 'No service found'}))
})

// @Route GET /myAlfred/api/service/particular
// View all pro services
router.get('/particular', (req, res) => {
  Service.find({particular_access: true}, 'label')
    .sort({'label': 1})
    .then(services => {
      if (!services) {
        return res.status(400).json({msg: 'No service found'})
      }
      res.json(services)

    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json({service: 'No service found'}))
})

// @Route GET /myAlfred/api/service/allCount
// View all service with count of serviceUser
router.get('/allCount', (req, res) => {
  Service.find({})
    .sort({label: 1})
    .then(services => {
      ServiceUser.find({})
        .then(sus => {
          let counts = []
          services.forEach(service => {
            const suCount = sus.filter(su => su.service._id.equals(service._id)).length
            counts.push({_id: service._id, label: `${service.label} (${suCount})`})
          })
          return res.json(counts)
        })
        .catch(err => {
          console.error(err)
          return res.status(HTTP_CODES.NOT_FOUND).json({service: 'No service found'})
        })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({service: `No service found:${err}`})
    })
})

// @Route GET /myAlfred/api/service/:id
// View one service
router.get('/:id', (req, res) => {

  Service.findById(req.params.id)
    .populate('equipments')
    .populate('category')
    .then(service => {
      if (Object.keys(service).length === 0 && service.constructor === Object) {
        return res.status(400).json({msg: 'No service found'})
      }
      res.json(service)


    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({service: `No service found:${err}`})
    })
})

// @Route GET /myAlfred/api/service/all/:category
// View all service per category
router.get('/all/:category', (req, res) => {

  Service.find({category: req.params.category})
    .sort({'label': 1})
    .populate('equipments')
    .populate('category')
    .then(service => {
      if (typeof service !== 'undefined' && service.length > 0) {
        res.json(service)
      }
      else {
        return res.status(400).json({msg: 'No service found'})
      }

    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json({service: 'No service found'}))

})

// @Route GET /myAlfred/api/service/currentAlfred/:category
// View all service per category filtered by already provided Alfred's services
router.get('/currentAlfred/:category', passport.authenticate('jwt', {session: false}), async(req, res) => {

  let serviceUsers = await ServiceUser.find({user: req.user})
  serviceUsers = serviceUsers.map(s => s.service)

  Service.find({category: req.params.category, _id: {$nin: serviceUsers}})
    .sort({'label': 1})
    .populate('equipments')
    .populate('category')
    .then(services => {
      if (typeof services !== 'undefined' && services.length > 0) {
        res.json(services)
      }
      else {
        return res.status(400).json({msg: 'No service found'})
      }

    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json({service: 'No service found:error'}))
})

// @Route GET /myAlfred/api/service/keyword/:kw
// Get services by keyword
// Search into category(label/description), service(label/description/job), prestation(label/dsecription)
// Return { category_name : { services} }
router.get('/keyword/:kw', (req, res) => {
  Service.find({}, 'label s_label particular_access professional_access')
    .populate('category', 's_particular_label s_professional_label')
    .populate({path: 'prestations', select: 's_label particular_access professional_access private_alfred', populate: {path: 'job', select: 's_label'}})
    .sort({s_label: 1})
    .then(services => {
      let result = {[PART]: [], [PRO]: []}
      Object.keys(result).forEach(access_type => {
        const attribute=`${access_type}_access`
        const label=`s_${access_type}_label`
        services.filter(s => s[attribute]).forEach(service => {
          let keywords= [service.s_label, service.category[label]]
          service.prestations.filter(p => p[attribute] && !p.private_alfred).forEach(p => {
            keywords.push(p.s_label, p.job && p.job.s_label ? p.job.s_label : '')
          })
          // single string with unique words
          keywords = lodash.uniq(keywords.filter(kw => Boolean(kw)).join(' ').split(' ')).join(' ')
          result[access_type].push({
            _id: service._id,
            label: service.label,
            keywords: keywords,
          })
        })
      })
      res.json(result)
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

router.get('/partner/:partner_name', (req, res) => {
  const company_name=req.params.partner_name
  Company.findOne({name: company_name}, '_id')
    .then(company => {
      if (!company) {
        return res.status(HTTP_CODES.NOT_FOUND).json(`No company ${company_name} found`)
      }
      return Prestation.find({private_company: company}, '_id')
        .populate('service', '_id')
    })
    .then(prestations => {
      const count=Object.keys(lodash(prestations).countBy(p => p.service._id.toString()).value()).length
      if (count!=1) {
        return res.status(500).json(`${count} services différents trouvés pour ${company_name}`)
      }
      return Service.findOne({_id: prestations[0].service})
        .populate('prestations')
    })
    .then(service => {
      return res.json(service)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).json(err)
    })
})

module.exports = router
