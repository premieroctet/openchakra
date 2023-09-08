import React from 'react'
import { Button, Select, Input, Flex } from '@chakra-ui/react'
import { useEffect, useState, memo } from 'react'
import { OPERATORS, ValueComponent } from '../../../dependencies/utils/filters'
import lodash from 'lodash'

const FiltersPanel = ({ attributes, filter, onValidate }) => {
  const [attribute, setAttribute] = useState(filter?.attribute || null)
  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState(filter?.operator || null)
  const [value, setValue] = useState(filter?.value || null)

  useEffect(() => {
    setOperators(OPERATORS[attributes[attribute]?.type] || [])
  }, [attribute, attributes])

  useEffect(() => {
    setValue(null)
  }, [attribute, operator])

  const enumValues = attributes[attribute]?.enumValues

  const onValidateInternal = () => {
    onValidate({ attribute, operator, value, type })
  }

  const type = attributes[attribute]?.type

  return (
    <>
      <Flex>
        <Select
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
        <Select onChange={ev => setOperator(ev.target.value)} value={operator}>
          <option />
          {Object.keys(operators).map(op => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </Select>
        {attribute && operator ? (
          !lodash.isEmpty(enumValues) ? (
            <>
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
            </>
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
