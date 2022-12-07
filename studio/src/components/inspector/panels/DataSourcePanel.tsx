import { Accordion, Input, Select, Checkbox } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, memo } from 'react'

import {
  getDataProviders,
  getAvailableAttributes,
  CONTAINER_TYPE,
} from '~utils/dataSources'
import { getModels, getModelAttributes } from '~core/selectors/dataSources'
import AccordionContainer from '~components/inspector/AccordionContainer'
import {
  getComponents,
  getSelectedComponent,
} from '../../../core/selectors/components'
import { getDataProviderDataType } from '../../../utils/dataSources'
import { useForm } from '../../../hooks/useForm'
import FormControl from '../controls/FormControl'
import usePropsSelector from '../../../hooks/usePropsSelector'

const DataSourcePanel: React.FC = () => {
  const components: IComponents = useSelector(getComponents)
  const activeComponent: IComponent = useSelector(getSelectedComponent)
  const { setValueFromEvent, setValue } = useForm()
  const dataSource = usePropsSelector('dataSource')
  const attribute = usePropsSelector('attribute')
  const limit = usePropsSelector('limit')
  const contextFilter = usePropsSelector('contextFilter')
  const textFilter = usePropsSelector('textFilter')
  const [providers, setProviders] = useState<IComponent[]>([])
  const [contextProviders, setContextProviders] = useState<IComponent[]>([])
  const [attributes, setAttributes] = useState([])
  const models = useSelector(getModels)

  useEffect(() => {
    setProviders(getDataProviders(activeComponent, components))
    if (models.length > 0) {
      try {
        const attrs = getAvailableAttributes(
          activeComponent,
          components,
          models,
        )
        setAttributes(attrs)
      } catch (err) {
        alert(err)
      }
    }
  }, [activeComponent, components, dataSource, models])

  useEffect(() => {
    if (!providers?.length > 0 || !activeComponent || components?.length > 0) {
      return
    }
    // TODO: have to fix getDataProviderDataType and remove try/catch
    try {
      const currentModel = getDataProviderDataType(
        activeComponent,
        components,
        dataSource,
        models,
      )?.type
      setContextProviders(providers.filter(p => p.props.model == currentModel))
    } catch (err) {
      console.error(err)
    }
  }, [providers, activeComponent, components, dataSource, models])

  const onContextFilterChange = ev => {
    setValue('contextFilter', ev.target.checked)
  }

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
            <option value={undefined}></option>
            {providers.map((provider, i) => (
              <option key={`prov${i}`} value={provider.id}>
                {`${provider.id} (${provider.props?.model})`}
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
              size="sm"
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
        {CONTAINER_TYPE.includes(activeComponent?.type) && (
          <FormControl htmlFor="contextFilter" label="Filter context">
            <Select
              id="contextFilter"
              onChange={setValueFromEvent}
              name="contextFilter"
              size="sm"
              value={contextFilter || ''}
            >
              <option value={undefined}></option>
              {contextProviders.map((provider, i) => (
                <option key={`prov${i}`} value={provider.id}>
                  {`${provider.id} (${provider.props?.model})`}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {CONTAINER_TYPE.includes(activeComponent?.type) && (
          <FormControl htmlFor="textFilter" label="Filter text">
            <Select
              id="textFilter"
              onChange={setValueFromEvent}
              name="textFilter"
              size="sm"
              value={textFilter || ''}
            >
              <option value={undefined}></option>
              {Object.values(components)
                .filter(c => c.type == 'Input')
                .map((component, i) => (
                  <option key={`comp${i}`} value={component.id}>
                    {`${component.id} (${component.type})`}
                  </option>
                ))}
            </Select>
          </FormControl>
        )}
      </AccordionContainer>
    </Accordion>
  )
}

export default memo(DataSourcePanel)
