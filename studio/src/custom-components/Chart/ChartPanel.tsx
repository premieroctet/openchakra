import React, { memo } from 'react'
import { Input } from '@chakra-ui/react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import usePropsSelector from '~hooks/usePropsSelector'
import { useForm } from '~hooks/useForm'

const ChartPanel = () => {

  return (
    <>
      <SwitchControl label="Editable" name="isEditable" />
    </>
  )
}

export default memo(ChartPanel)
