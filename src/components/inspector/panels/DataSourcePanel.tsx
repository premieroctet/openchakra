import { Select } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, memo } from 'react'
import { Input } from '@chakra-ui/react'
import { Accordion } from '@chakra-ui/react'
import AccordionContainer from '~components/inspector/AccordionContainer'

import { CONTAINER_TYPE } from '../../../utils/code'
import {
  getComponents,
  getSelectedComponent,
} from '../../../core/selectors/components'
import { getModelAttributes } from '../../../core/selectors/datasources'
import { useForm } from '../../../hooks/useForm'
import FormControl from '../controls/FormControl'
import usePropsSelector from '../../../hooks/usePropsSelector'

const DataSourcePanel: React.FC = () => {
  const components = useSelector(getComponents)
  const activeComponent = useSelector(getSelectedComponent)
  const { setValueFromEvent } = useForm()
  const dataSource = usePropsSelector('dataSource')
  const attribute = usePropsSelector('attribute')
  const limit = usePropsSelector('limit')
  const [providers, setProviders] = useState<IComponent[]>([])
  const provider = providers.find(p => p.id == dataSource)
  const attributes = useSelector(getModelAttributes(provider?.props.model))

  useEffect(() => {
    const dataProviders = Object.values(components).filter(
      c => !!c.props?.model,
    )
    setProviders(dataProviders)
  }, [components])

  return (
    <Accordion>
      <AccordionContainer title="Data source">
        <FormControl htmlFor="dataSource" label="Datasource">
          <Select
            id="dataSource"
            onChange={setValueFromEvent}
            name="dataSource"
            size="sm"
            value={dataSource || ''}
          >
            <option value={null}></option>
            {providers.map(provider => (
              <option value={provider.id}>
                {provider.id == 'root'
                  ? 'Page'
                  : provider.props?.model || provider.id}
              </option>
            ))}
          </Select>
        </FormControl>
        {attributes && !CONTAINER_TYPE.includes(activeComponent?.type) && (
          <FormControl htmlFor="attribute" label="Champ">
            <Select
              id="attribute"
              onChange={setValueFromEvent}
              name="attribute"
              size="sm"
              value={attribute || ''}
            >
              <option value={null}></option>
              {Object.keys(attributes).map(attribute => (
                <option value={attribute}>{attribute}</option>
              ))}
            </Select>
          </FormControl>
        )}
        {CONTAINER_TYPE.includes(activeComponent?.type) && (
          <FormControl htmlFor="limit" label="Limit">
            <Input
              id="limit"
              name="limit"
              size="sm"
              value={limit}
              type="number"
              onChange={setValueFromEvent}
            />
          </FormControl>
        )}
      </AccordionContainer>
    </Accordion>
  )
}

export default memo(DataSourcePanel)
