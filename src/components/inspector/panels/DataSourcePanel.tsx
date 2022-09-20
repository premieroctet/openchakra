import { Select } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, memo } from 'react'

import { getComponents } from '../../../core/selectors/components'
import { getModelAttributes } from '../../../core/selectors/datasources'
import { useForm } from '../../../hooks/useForm'
import FormControl from '../controls/FormControl'
import usePropsSelector from '../../../hooks/usePropsSelector'

const DataSourcePanel = () => {
  const components = useSelector(getComponents)
  const { setValueFromEvent } = useForm()
  const dataSource = usePropsSelector('dataSource')
  const attribute = usePropsSelector('attribute')
  const [providers, setProviders] = useState([])
  const provider = providers.find(p => p.id == dataSource)
  const attributes = useSelector(getModelAttributes(provider?.props.model))

  useEffect(() => {
    const dataProviders = Object.values(components).filter(
      c => c.type == 'DataProvider',
    )
    setProviders(dataProviders)
  }, [components])

  return (
    <>
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
              {provider.props?.model || provider.id}
            </option>
          ))}
        </Select>
      </FormControl>
      {attributes && (
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
    </>
  )
}

export default memo(DataSourcePanel)
