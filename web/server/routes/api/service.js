const express=require('express')
const mongoose = require('mongoose')
const {PART, PRO}=require('../../../utils/consts')
const {HTTP_CODES}=require('../../utils/errors')
const passport=require('../../config/passport')
const Company = require('../../models/Company')
const Prestation = require('../../models/Prestation')
const Service = require('../../models/Service')
const ServiceUser = require('../../models/ServiceUser')
const {isPlatform} = require('../../../config/config')
const serviceFilters = require('../../utils/filters')

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
    .populate('category')
    .populate({path: 'prestations', populate: {path: 'filter_presentation'}})
    .populate('equipments')
    .then(service => {
      if (!service) {
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

// @Route POST /myAlfred/api/serviceUser/search
// Search serviceUser according to optional coordinates, keyword, cat/service/prestation
router.post('/search', (req, res) => {
  const kw = req.body.keyword
  const status = req.body.status // PRO or PART
  const category=req.body.category

  console.log(`Searching serviceUser ${JSON.stringify(req.body)}`)

  const filter = status==PRO ? {'professional_access': true} : {'particular_access': true}
  Service.find(filter, 'prestations category description label')
    .populate({
      path: 'prestations', match: filter,
      populate: {path: 'job', select: 's_label'},
    })
    .populate({
      path: 'category', select: status==PRO ? 's_professional_label':'s_particular_label',
    })
    .lean({virtuals: true})

    .then(result => {
      let services=result
      console.log(`Found ${services.length} services before filtering`)
      if (isPlatform()) {
        console.log('En plateforme')
        // Only retain prestations having company_price
        services=services.map(s => { return {...s, prestations: s.prestations.filter(p => !!p.company_price)} })
        services=services.filter(s => s.prestations.length>0)
      }
      if (kw) {
        services = serviceFilters.filterServicesKeyword(services, kw, status)
      }
      if (category) {
        services=services.filter(s => s.category._id==category)
      }
      console.log(`Remaining ${services.length} after keyword filtering`)
      return res.json(services)
    })
    .catch(err => {
      console.error(err)
      return res.status(404).json(err)
    })
})

// @Route GET /myAlfred/api/serviceUser/cardPreview/:id
// Data fro serviceUser cardPreview
// @Access private
router.get('/cardPreview/:id', (req, res) => {
  const suId = mongoose.Types.ObjectId(req.params.id)
  Service.findOne(suId, 'label picture description')
    .then(service => {
      const result = {
        _id: service._id, label: service.label, picture: service.picture, description: service.description,
      }
      res.json(result)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({error: err})
    })
})


// @Route POST /myAlfred/api/serviceUser/compute
// Computes total price and fees for serviceUser booking
// @Access public
router.post('/compute', (req, res) => {

  // Just sum prestations prices
  const valued_prestas = lodash.pickBy(req.body.prestations, value => !!value)
  Prestation.find({_id: {$in: Object.keys(valued_prestas)}}, {company_price: 1})
    .then(prestations => {
      const total=lodash.sumBy(prestations.filter(p => !!p.company_price), p => p.company_price*valued_prestas[p._id.toString()])
      res.json({
        total_prestations: total,
        travel_tax: 0,
        pick_tax: 0,
        // Fees array
        customer_fees: [],
        // Fees total
        customer_fee: 0,
        // Fees array
        provider_fees: [],
        // Fees total
        provider_fee: 0,
        total_cesu: 0,
        total: total,
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})


module.exports = router
