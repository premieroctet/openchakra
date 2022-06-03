import getDistance from 'geolib/es/getDistance'
import convertDistance from 'geolib/es/convertDistance'
const isEmpty = require('../server/validation/is-empty')
import nominatim from 'nominatim-client'
import lodash from 'lodash'

const computeDistanceKm = (latlon1, latlon2) => {
  if (isEmpty(latlon1) || isEmpty(latlon2)) {
    return null
  }
  if (isEmpty(latlon1.lat) || isEmpty(latlon1.lng)) {
    return null
  }
  if (isEmpty(latlon2.lat) || isEmpty(latlon2.lng)) {
    return null
  }
  try {
    return convertDistance(
      getDistance(
        {latitude: latlon1.lat, longitude: latlon1.lng},
        {latitude: latlon2.lat, longitude: latlon2.lng},
      ),
      'km',
    )
  }
  catch (error) {
    console.error(error)
    return null
  }
}

const computeAverageNotes = notes => {
  let res = {}
  if (isEmpty(notes)) {
    return res
  }
  Object.keys(notes[0]).forEach(k => {
    const value = notes.reduce((prev, next) => prev + next[k], 0) / notes.length
    res[k] = value
  })
  return res
}

const computeSumSkills = skills => {
  let res = {}
  if (isEmpty(skills)) {
    return res
  }
  Object.keys(skills[0]).forEach(k => {
    const value = skills.reduce((prev, next) => prev + next[k], 0)
    res[k] = value
  })
  return res
}

const roundCurrency = amount => {
  if (!amount) {
    return amount
  }
  return Math.round(amount*100)/100
}

const getLocationSuggestions = (value, type) => {
  const citySearch=type=='city'
  const client = nominatim.createClient({
    useragent: 'My Alfred',
    referer: 'https://my-alfred.io',
  })
  const query={q: value, addressdetails: 1, dedupe: 1, countrycodes: 'fr'}
  if (citySearch) {
    query.city=value
  }
  else {
    query.q=value
  }
  return client.search(query)
    .then(res => {
      let suggestions=res
      if (citySearch) {
        suggestions=res.filter(r => r.address && r.lat && r.lon && (r.address.postcode && r.address.city || r.address.village || r.address.town))
      }
      else {
        suggestions=res.filter(r => r.address && r.lat && r.lon && (r.address.postcode && r.address.road && (r.address.city || r.address.village || r.address.town)))
      }
      suggestions=suggestions.map(r => ({
        name: r.address.road,
        city: r.address.city || r.address.village || r.address.town,
        postcode: r.address.postcode,
        country: r.country,
        latlng: {lat: r.lat, lng: r.lon}}))
      suggestions=lodash.uniqBy(suggestions, r => (citySearch ? `${r.city},${r.postcode},${r.country}`: `${r.name},${r.city},${r.postcode},${r.country}`))
      const number=parseInt(value)
      if (!isNaN(number)) {
        suggestions=suggestions.map(r => ({...r, name: `${number} ${r.name}`}))
      }
      return suggestions
    })
}

module.exports = {
  computeDistanceKm, computeAverageNotes, computeSumSkills, roundCurrency,
  getLocationSuggestions,
}
