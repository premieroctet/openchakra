import React, { memo, useState } from 'react'
import { CheckboxGroup, Checkbox } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'

const EnumFilter = props => {


  const enumValues=JSON.parse(props.enumValues)
  return (
    <CheckboxGroup onChange={props.onChange}>
    {Object.entries(enumValues).map(([key, value]) => (
      <Checkbox value={key}>{value}</Checkbox>
    ))}
    </CheckboxGroup>
  )
}

const FilterDetail = props => {

  const {enumValues} = props
  return enumValues ? (<EnumFilter enumValues={enumValues} onChange={props.onChange}/>)
  :
  (<h1>{props.filterType}</h1>)
}

const Filter = ({children, ...props}) => {

  const [value, setValue]=useState(null)

  const onChange= ev => {
    setValue(ev)
  }

  return (
    <Flex {...props}>
    {children}
    <FilterDetail {...props} onChange={onChange}/>
    <h1>Value:{JSON.stringify(value)}</h1>
    </Flex>
  )
}

export default memo(Filter)
