import getDistance from 'geolib/es/getDistance'
import convertDistance from 'geolib/es/convertDistance'
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

const combineStyles = (...styles) => {
  return function CombineStyles(theme) {
    const outStyles = styles.map(arg => {
      // Apply the "theme" object for style functions.
      if (typeof arg === 'function') {
        return arg(theme)
      }
      // Objects need no change.
      return arg
    })

    return outStyles.reduce((acc, val) => Object.assign(acc, val))
  }
}

module.exports = {
  computeDistanceKm, computeAverageNotes, computeSumSkills, combineStyles
}
