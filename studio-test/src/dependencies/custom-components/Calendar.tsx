import React, {useState, useMemo} from 'react'
import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import {
  Calendar,
  CalendarDefaultTheme,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
} from '@uselessdev/datepicker'

const WCalendar = props => {

  const [date, setDate] = React.useState()

  const handleSelectDate = selected => setDate(selected)

  const theme = useMemo(() => extendTheme(CalendarDefaultTheme, {
    components: {
      Calendar: {
        parts: ['calendar'],
  
        baseStyle: {
          calendar: {
            rounded: props.borderRadius,
          },
        },
      },
      CalendarDay: {
        variants: {
          selected: {
            bgColor: props.backgroundColor,
            _hover: {
             bgColor: props.backgroundColor,
            },
          }
        }
      }
  
    },
  }), [props.borderRadius, props.backgroundColor])
  
  return (
    <ChakraProvider theme={theme} >
      <Calendar 
        value={{start: date}} 
        onSelectDate={handleSelectDate}
        singleDateSelection        
        disableFutureDates
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </ChakraProvider>
  )
}

export default WCalendar