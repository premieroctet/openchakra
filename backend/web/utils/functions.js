const {getDistance} = require('geolib')
const {convertDistance} = require('geolib')

const isEmpty = require('../server/validation/is-empty')

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

const rgbaToHex = orig => {
  let a, isPercent,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = (rgb && rgb[4] || '').trim(),
    hex = rgb ?
      (rgb[1] | 1 << 8).toString(16).slice(1) +
      (rgb[2] | 1 << 8).toString(16).slice(1) +
      (rgb[3] | 1 << 8).toString(16).slice(1) : orig

  if (alpha !== '') {
    a = alpha
  }
  else {
    a = 0.1
  }
  // multiply before convert to HEX
  a = ((a * 255) | 1 << 8).toString(16).slice(1)
  hex = hex + a

  return `#${ hex}`
}

const valueBetween = (value, start, stop) => {
  return value>=start && value <=stop
}

const sanitizeFilename = (name) => {
  return name.toLowerCase()
      .replace(/ /gi, '-')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
}

module.exports = {
  computeDistanceKm, computeAverageNotes, computeSumSkills, rgbaToHex,
  valueBetween, sanitizeFilename,
}
