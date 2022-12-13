import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box, Text } from '@chakra-ui/react'

const NumberFormatPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id, [])
  const { props, ref } = useInteractive(component, true)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  const languageToConsider = props?.['data-lang']
    ? props?.['data-lang']
    : 'fr-FR'
  const numberToConsider = props?.['data-value'] ? +props?.['data-value'] : 0.0
  const numberOptionsToConsider = props?.['data-format']
    ? props?.['data-format']
    : {}

  const numberFormat = new Intl.NumberFormat(
    languageToConsider,
    numberOptionsToConsider,
  )
  const numberToDisplay = numberFormat.format(numberToConsider)

  return (
    <Box as={'span'} pos="relative" ref={drop(ref)} {...boxProps}>
      <Text as={'span'} {...props}>
        {numberToDisplay}
      </Text>
    </Box>
  )
}

export default NumberFormatPreview
