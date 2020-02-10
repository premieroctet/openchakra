import React, { memo, useState } from 'react'
import TextControl from '../../controls/TextControl'
import ColorsControl from '../../controls/ColorsControl'

const GridPanel = () => {
  const [propsList] = useState([
    { name: 'gridArea' },
    { name: 'gridTemplateAreas' },
    { name: 'gridGap' },
    { name: 'gridRowGap' },
    { name: 'gridColumnGap' },
    { name: 'gridAutoColumns' },
    { name: 'gridColumn' },
    { name: 'gridRow' },
    { name: 'gridAutoFlow' },
    { name: 'gridAutoRows' },
    { name: 'gridTemplateRows' },
    { name: 'gridTemplateColumns' },
  ])

  return (
    <>
      <ColorsControl withFullColor label="Color" name="bg" enableHues />
      {propsList.map((e, i) => (
        <TextControl label={e.name} name={e.name} key={i} />
      ))}
    </>
  )
}

export default memo(GridPanel)
