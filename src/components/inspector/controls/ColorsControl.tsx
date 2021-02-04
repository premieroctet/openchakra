import React, { ReactNode, memo } from 'react'
import FormControl from './FormControl'
import ColorPickerControl from './ColorPickerControl'

type ColorControlPropsType = {
  name: string
  label: string | ReactNode
  enableHues?: boolean
  withFullColor?: boolean
}

const ColorsControl = (props: ColorControlPropsType) => {
  return (
    <FormControl label={props.label}>
      <ColorPickerControl
        withFullColor={props.withFullColor}
        name={props.name}
        gradient={false}
      />
    </FormControl>
  )
}

export default memo(ColorsControl)
