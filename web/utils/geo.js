const nominatim=require('nominatim-client')
const lodash=require('lodash')

const getLocationSuggestions = (value, type) => {
  const cityOnly=type=='city'
  const client = nominatim.createClient({
    useragent: 'My Alfred',
    referer: 'https://my-alfred.io',
  })
  const query={q: value, addressdetails: 1, dedupe: 1, countrycodes: 'fr'}
  if (cityOnly) {
    query.city=value
  }
  else {
    query.q=value
  }
  return client.search(query)
    .then(res => {
      let suggestions=res
      if (cityOnly) {
        suggestions=res.filter(r => r.address && r.lat && r.lon && (r.address.postcode && (r.address.city || r.address.village || r.address.town || r.address.county)))
      }
      else {
        suggestions=res.filter(r => r.address && r.lat && r.lon && (r.address.postcode && r.address.road && (r.address.city || r.address.village || r.address.town || r.address.county)))
      }
      suggestions=suggestions.map(r => ({
        name: r.address.road,
        city: r.address.city || r.address.village || r.address.town || r.address.county,
        postcode: r.address.postcode,
        country: r.country,
        latlng: {lat: r.lat, lng: r.lon}}))
      suggestions=lodash.uniqBy(suggestions, r => (cityOnly ? `${r.city},${r.postcode},${r.country}`: `${r.name},${r.city},${r.postcode},${r.country}`))
      const number=parseInt(value)
      if (!isNaN(number)) {
        suggestions=suggestions.map(r => ({...r, name: `${number} ${r.name}`}))
      }
      return suggestions
    })
}

module.exports={getLocationSuggestions}
