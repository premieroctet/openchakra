import React, {useState, useCallback, useEffect} from 'react'
import { Box } from '@chakra-ui/react'
import useEventListener from '~hooks/useEventListener'
import { useStopwatch } from 'react-timer-hook'
import useInterval from '~hooks/useInterval'

/**
 * Le Timer doit démarrer au chargement de la ressource, ou à la lecture de la vidéo.
 * Si aucune activité n'est détectée (souris, clavier), on arrêter le timer (sauf vidéo)
 * Le temps doit être envoyé au back, à un moment.
 */

const Timer = () => {

  const TIME_TO_SEND = 10000
  const TIME_BEFORE_LOGOUT = 10000
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [lastCoords, setLastCoords] = useState({ x: 0, y: 0 });
  const [lastTyping, setLastTyping] = useState<Date>(new Date());
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

  const handleMoves = useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  const handleTyping = useCallback(
    ({ keyCode }) => {
      console.log(keyCode)
      setLastTyping(new Date());
    },
    [setLastTyping]
  ); 

  const handleVisibility = useCallback((e) => {
    if (document.visibilityState === "hidden") {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    } 
  }, [setIsVisible])

  
  useEventListener("mousemove", handleMoves);
  useEventListener("keyup", handleTyping);
  useEventListener("visibilitychange", handleVisibility);

  /* If counter is running, no more ping sent */
  useInterval(() => {
    console.log('send time data')
  }, isRunning ? TIME_TO_SEND : null)

  /* typing or mousemove or logout */
  useInterval(() => {
    console.log('no interaction')
  }, isRunning ? TIME_BEFORE_LOGOUT : null)

  useEffect(() => {
    isRunning && !isVisible && pause()
    !isRunning && isVisible && start()
  }, [isRunning, isVisible, pause, start])


  return (
    <Box pos="relative">
      <h1>The mouse position is ({coords.x}, {coords.y})</h1>
      <h2>Time spent : {hours} {minutes} {seconds}</h2>
    </Box>
  )

}

export default Timer