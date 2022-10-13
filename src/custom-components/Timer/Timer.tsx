import React, {useState, useCallback, useEffect} from 'react'
import { Text } from '@chakra-ui/react'
import useEventListener from '~hooks/useEventListener'
import { useStopwatch } from 'react-timer-hook'
import useFetch from 'use-http'
import useInterval from '~hooks/useInterval'
import config from '../../../env.json'

/**
 * Timer autostarts on ressource loaded
 * Time sent every X seconds
 */

const Timer = ({"data-source": dataSource = null, ...props}: {'data-source': string | null}) => {

  const { post, response, error } = useFetch(config.targetDomain)
  const RESSOURCE_SENDING_PERIOD = 10000
  // const TIME_BEFORE_LOGOUT = 10000
  // const [coords, setCoords] = useState({ x: 0, y: 0 });
  // const [lastCoords, setLastCoords] = useState({ x: 0, y: 0 });
  // const [lastTyping, setLastTyping] = useState<Date>(new Date());
  const [isVisible, setIsVisible] = useState<boolean>(document?.visibilityState !== "hidden" || false)
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  // const handleMoves = useCallback(
  //   ({ clientX, clientY }) => {
  //     setCoords({ x: clientX, y: clientY });
  //   },
  //   [setCoords]
  // );

  // const handleTyping = useCallback(
  //   ({ keyCode }) => {
  //     console.log(keyCode)
  //     setLastTyping(new Date());
  //   },
  //   [setLastTyping]
  // ); 

  const handleVisibility = useCallback((e) => {
    if (document.visibilityState === "hidden") {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    } 
  }, [setIsVisible])

  
  // useEventListener("mousemove", handleMoves);
  // useEventListener("keyup", handleTyping);
  useEventListener("visibilitychange", handleVisibility);

  /* If counter is running, no more ping sent */
  useInterval(async () => {
    if (dataSource) {
      await post('/duration', {ressource: dataSource})
      if (response.ok) {
        console.log(`send data time for ${dataSource}`)
      }
    }
  }, isRunning ? RESSOURCE_SENDING_PERIOD : null)

  /* typing or mousemove or logout */
  // useInterval(() => {
  //   console.log('no interaction')
  // }, isRunning ? TIME_BEFORE_LOGOUT : null)

  useEffect(() => {
    isRunning && !isVisible && pause()
    !isRunning && isVisible && start()
  }, [isRunning, isVisible, pause, start])


  return (
    <Text as={'span'} {...props}>{hours}:{minutes}:{seconds}</Text>
  )

}

export default Timer