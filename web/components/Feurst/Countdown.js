import React, {useEffect} from 'react'
import {isPast, intervalToDuration} from 'date-fns'

const Countdown = ({limit}) => {

  const [duration, setDuration] = React.useState()

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(intervalToDuration({
        start: Date.now(),
        end: limit,
      }))
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    !isPast(limit) ? <div role={'timer'}>
      <span className='hours'>{duration?.hours}</span>
      <span className='minutes'>{duration?.minutes}</span>
      <span className='seconds'>{duration?.seconds}</span>
    </div> : null
  )
}

export default Countdown
