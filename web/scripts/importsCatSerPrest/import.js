const mongoose = require('mongoose')
const lodash=require('lodash')
const Prestation = require('../../server/models/Prestation')
const Service = require('../../server/models/Service')
const Category = require('../../server/models/Category')

const fs = require('fs').promises

const filename=process.argv[2]

if (!filename) {
  console.error('Fichier attendu')
  process.exit(1)
}

const importLine = ([idx, categoryLabel, serviceLabel, prestationLabel]) => {
  let category=null
  let illustrations=null

  return Service.find()
    .then(services => {
      illustrations=services.filter(s => !!s.picture)
      return Category.remove({}).then(() => Service.remove({})).then(() => Prestation.remove({}))
    })
    .then(() => {
      let illu=illustrations.find(s => s.label==categoryLabel)?.picture
      return Category.updateOne(
        {particular_label: categoryLabel},
        {professional_label: categoryLabel, particular_picture: illu, professional_picture: illu},
        {upsert: true, runValidators: true})
    })
    .then(res => { console.log(`Category ${categoryLabel}:${JSON.stringify(res.upserted)}`); return Category.findOne({particular_label: categoryLabel}) })
    .then(c => {
      category=c
      if (!serviceLabel) {
        return Promise.reject(`Ligne ${idx}: pas de label pour le service`)
      }
      return Service.updateOne(
        {label: serviceLabel, category: category._id},
        {s_label: serviceLabel, particular_access: true, professional_access: true, location: {visio: true}},
        {upsert: true, runValidators: true})
        .then(res => { console.log(`Service ${serviceLabel}:${JSON.stringify(res.upserted)}`); return Service.findOne({label: serviceLabel}) })
    })
    .then(service => {
      if (!prestationLabel) {
        return Promise.reject(`Ligne ${idx}: pas de label pour la prestation`)
      }
      return Prestation.updateOne(
        {label: prestationLabel, category: category._id, service: service._id},
        {company_price: lodash.random(6, 10)*100},
        {upsert: true, runValidators: true})
    })
    .catch(err => {
      if (err.match(/pas de.*pour.*/)) {
        return Promise.reject(err)
      }
      return Promise.resolve()
    })
}

mongoose.connect('mongodb://localhost/aftral', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    return fs.readFile(filename, 'utf8')
  })
  .then(contents => {
    array=contents.split('\n').slice(1).filter(l => !!l)
    array.forEach((line, idx) => {
      const labels=line.split(';').map(i => i.trim())
      // console.log(labels)
      importLine([idx, ...labels])
    })
  })
