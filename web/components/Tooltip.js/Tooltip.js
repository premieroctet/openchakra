import React, {useEffect, useState} from 'react'
import {useKeyPress} from '../../hooks/use-keypress'

const Tooltip = ({trigger: TriggerComponent, content: ContentComponent}) => {

  const [visibility, setVisibility] = useState(false)
  const pressEscape = useKeyPress('Escape')
  const tooltipId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  useEffect(() => {
    /* Tooltip must dismiss the tooltip */
    pressEscape && setVisibility(false)
  }, [pressEscape])

  return (<div className='tooltip'>
    <div
      aria-describedby={tooltipId}
      onMouseOver={() => setVisibility(true)}
      onFocus={() => setVisibility(true)}
      onMouseOut={() => setVisibility(false)}
      onBlur={() => setVisibility(false)}
      tabIndex="0"
    >
      <TriggerComponent />
    </div>
    {visibility ?
      <div role={'tooltip'} id={tooltipId}>
        <ContentComponent />
      </div>
      : null}
  </div>)
}

export default Tooltip
