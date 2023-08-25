import { Accordion, Input, Select, Box, Checkbox } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, memo } from 'react'
import lodash from 'lodash'

import { getModels } from '~core/selectors/dataSources'
import AccordionContainer from '~components/inspector/AccordionContainer'

import { useForm } from '../../../hooks/useForm'
import FormControl from '../controls/FormControl'
import TextControl from '../controls/TextControl';
import usePropsSelector from '../../../hooks/usePropsSelector'

const FilterPanel: React.FC = () => {
  const {setValueFromEvent, setValue, removeValue} = useForm()
  const models = useSelector(getModels)
  const [attributes, setAttributes] = useState({})
  const model = usePropsSelector('model')
  const attribute = usePropsSelector('attribute')
  const filterType = usePropsSelector('filterType')

  useEffect(() => {
    if (!model) {
      setAttributes({})
      setValue('attribute', null)
      return
    }
    try {
      // Kep direct attribute, non multiple, simple types
      const attrs =  Object.fromEntries(
        Object.entries(models[model].attributes)
          .filter(([attName, attParams]) =>
            !attName.includes('.') && !attParams.multiple && !attParams.ref)
      )
      setAttributes(attrs)
    }
    catch (err) {
      console.error(err)
      alert(err)
    }
  }, [model])

  useEffect(() => {
    if (!model || !attribute) {
      return removeValue('filterType')
    }
    return setValue('filterType', models[model].attributes[attribute].type)
  }, [attribute, model, models])

  return (
    <Accordion allowToggle={true}>
      <AccordionContainer title="Filter attribute">
        <FormControl htmlFor="model" label="Model">
          <Select
            id="model"
            onChange={setValueFromEvent}
            name="model"
            size="xs"
            value={model || ''}
          >
            <option value={undefined}></option>
            {Object.keys(models).map(model => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </Select>
        </FormControl>
        {attributes && (
          <FormControl htmlFor="attribute" label="Attribute">
            <Select
              id="attribute"
              onChange={setValueFromEvent}
              name="attribute"
              size="xs"
              value={attribute || ''}
            >
              <option value={undefined}></option>
              {Object.keys(attributes).map((attribute, i) => (
                <option key={`attr${i}`} value={attribute}>
                  {attribute}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
      </AccordionContainer>
    </Accordion>
  )
}

export default memo(FilterPanel)
