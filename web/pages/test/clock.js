import React, {useState, useEffect} from 'react'
import moment from 'moment'

import Clock from '../../components/Clock/Clock'

function ClockTest(props) {

  const [now, setNow] = useState(moment())

  useEffect(() => {
    const timer = setTimeout(() => {
      setNow(moment())
    }, 1000)
  })

  return (
    <Clock hours={now.get('hours')} minutes={now.get('minutes')}/>
  )
}

export default ClockTest
