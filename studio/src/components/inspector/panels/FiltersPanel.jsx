import { Button, Select, Input, Flex, Box } from '@chakra-ui/react'
import {Select as MultipleSelect} from 'chakra-react-select'
import React, { memo, useEffect, useState } from 'react';
import lodash from 'lodash'

import { components } from '../../../tests/data/dashboardAlfred.json';
import { getOperators, isOperatorMultiple, ValueComponent } from '../../../dependencies/utils/filters'

const FiltersPanel = ({ attributes, components, filter, onValidate }) => {
  const [attribute, setAttribute] = useState(filter?.attribute || null)
  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState(filter?.operator || null)
  const [value, setValue] = useState(filter?.value || null)

  useEffect(() => {
    setOperators(getOperators(attributes[attribute]) || [])
  }, [attribute, attributes])

  useEffect(() => {
    setValue(null)
  }, [attribute, operator])

  const enumValues = attributes[attribute]?.enumValues

  const enumMultiple=Object.entries(enumValues||{}).map(([k,v]) => ({value: k,label: v}))

  const multipleChoiceEnabled = isOperatorMultiple(attributes[attribute], operator)

  const type = attributes[attribute]?.multiple ? 'Array' : attributes[attribute]?.enumValues ? 'Enum': attributes[attribute]?.ref ? 'Ref' : attributes[attribute]?.type
  const isComponent = !!attributes[attribute]?.isComponent

  const onValidateInternal = () => {
    onValidate({ attribute, operator, value, type, isComponent })
  }


  return (
    <>
      <Flex>
        <Select flex="1"
          onChange={ev => setAttribute(ev.target.value)}
          value={attribute}
        >
          <option />
          {Object.keys(attributes).map(att => (
            <option key={att} value={att}>
              {att}
            </option>
          ))}
        </Select>
        <Select  flex="1" onChange={ev => setOperator(ev.target.value)} value={operator}>
          <option />
          {Object.keys(operators).map(op => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </Select>
        {attribute && operator ? (
          !lodash.isEmpty(enumValues) ? (
            <Box flex="1">
              {multipleChoiceEnabled ?
                <MultipleSelect
                  isMulti
                  onChange={ev => setValue(lodash.map(ev, 'value').join(','))}
                  value={value?.split(',').map(v => enumMultiple.find(m => m.value==v)) || undefined}
                  options={enumMultiple}
                >
                </MultipleSelect>
                :
                <Select
                onChange={ev => setValue(ev.target.value)}
                value={value || undefined}
                >
                <option value={null}/>
                {Object.entries(enumValues).map(([k,v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </Select>
              }
            </Box>
          ) : (
            <ValueComponent
              onChange={ev => setValue(ev.target.value)}
              type={type}
              operator={operator}
              value={value}
            />
          )
        ) : null}
      </Flex>
      <Flex
        style={{ alignItems: 'center', justifyContent: 'center' }}
        marginTop="15px"
      >
        <Button onClick={onValidateInternal}>Validate</Button>
      </Flex>
    </>
  )
}

export default memo(FiltersPanel)
