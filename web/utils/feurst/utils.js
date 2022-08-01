import joursFeries from '@socialgouv/jours-feries'
import {isSameDay, isWeekend} from 'date-fns'

const isPublicHoliday = date => {
  const currentDate = new Date(date)
  const publicHolidays = joursFeries(date.getFullYear())
  const isCurrentDateOnPublicHolidays = Object.values(publicHolidays).find(el => isSameDay(el, currentDate))

  return !!isCurrentDateOnPublicHolidays
}

const isAnOrderDay = date => {
  return !isPublicHoliday(new Date(date)) && !isWeekend(new Date(date))
}


export {isPublicHoliday, isAnOrderDay}
