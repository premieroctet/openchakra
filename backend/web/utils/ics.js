const moment=require('moment')
const {createEvent}=require('ics')

const generateIcs = async ({start, end, title, description, ...rest}) => {
  if (!start || !end) {
    throw new Error(`ICS:At least start and end are required`)
  }
  const formatMoment = date => {
    return moment(date).format('YYYY-M-D-H-m').split("-").map((a) => parseInt(a))
  }

  const event={
    start: formatMoment(start),
    end: formatMoment(end),
    title,
    description,
    ...rest,
  } 
  const {value, error}=createEvent(event)
  if (error) {
    return Promise.reject(error)
  }
  console.log(value)
  return value
}

module.exports={
  generateIcs,
}