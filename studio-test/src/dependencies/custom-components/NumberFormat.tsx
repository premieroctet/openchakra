import React from 'react'
import lodash from 'lodash'
import { Text } from '@chakra-ui/react'

const NumberComp = ({
  'data-lang': dataLang,
  value: dataValue,
  'data-format': dataFormat,
  ...props
}: {
  'data-lang'?: string
  value: string
  'data-format': string
}) => {
  
  // @ts-ignore
  const isdynamicValue = props?.dataSource && props?.attribute
  // @ts-ignore
  const dynamicValue = isdynamicValue ? lodash.get(props?.dataSource, props.attribute) : dataValue


  const languageToConsider = dataLang ? dataLang : 'fr-FR'
  const numberToConsider = dynamicValue ? +dynamicValue : 0.0
  const numberOptionsToConsider = dataFormat ? dataFormat : {}

  const numberFormat = new Intl.NumberFormat(
    languageToConsider,
    numberOptionsToConsider,
  )
  const numberToDisplay = numberFormat.format(numberToConsider)

  return (
    <Text as={'span'} {...props}>
      {numberToDisplay}
    </Text>
  )
}

export default NumberComp
