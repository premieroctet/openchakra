import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import VariantsControl from '~components/inspector/controls/VariantsControl'
import SizeControl from '~components/inspector/controls/SizeControl'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import IconControl from '~components/inspector/controls/IconControl'
import FormControl from '~components/inspector/controls/FormControl'
import { Select } from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'

const IconButtonPanel = () => {
  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')
  const { setValueFromEvent } = useForm()

  return (
    <>
      <IconControl name="icon" label="Icon" />
      <SizeControl name="size" label="Size" value={size} />
      <ColorsControl label="Color" name="colorScheme" />
      <ColorsControl label="Fill Color" name="fill" />
      <SwitchControl label="Loading" name="isLoading" />
      <SwitchControl label="Round" name="isRound" />
      <VariantsControl label="Variant" name="variant" value={variant} />
    </>
  )
}

export default memo(IconButtonPanel)
