import { Accordion, Input, Select, Box, Checkbox } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, memo } from 'react'
import lodash from 'lodash'

import {
  getDataProviders,
  getAvailableAttributes,
  getFilterAttributes,
  CONTAINER_TYPE,
} from '~utils/dataSources'
import { getModels } from '~core/selectors/dataSources'
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
  const { setValueFromEvent, setValue, removeValue } = useForm()
  const addTarget = usePropsSelector('addTarget')
  const dataSource = usePropsSelector('dataSource')
  const model = usePropsSelector('model')
  const attribute = usePropsSelector('attribute')
  const subDataSource = usePropsSelector('subDataSource')
  const subAttribute = usePropsSelector('subAttribute')
  const subAttributeDisplay = usePropsSelector('subAttributeDisplay')
  const limit = usePropsSelector('limit')
  const contextFilter = usePropsSelector('contextFilter')
  const filterValue = usePropsSelector('filterValue')
  const filterAttribute = usePropsSelector('filterAttribute')
  const [providers, setProviders] = useState<IComponent[]>([])
  const [contextProviders, setContextProviders] = useState<IComponent[]>([])
  const [attributes, setAttributes] = useState({})
  const [subAttributes, setSubAttributes] = useState({})
  const [subAttributesDisplay, setSubAttributesDisplay] = useState({})
  const [filterAttributes, setFilterAttributes] = useState({})
  const models = useSelector(getModels)

  useEffect(() => {
    setProviders(getDataProviders(activeComponent, components))
    if (!lodash.isEmpty(models)) {
      try {
        const attrs = getAvailableAttributes(activeComponent, components, models)
        setAttributes(attrs)
      }
      catch (err) {
        console.error(err)
        alert(err)
      }
      try {
        const filterAttrs = getFilterAttributes(activeComponent, components, models)
        setFilterAttributes(filterAttrs)
      }
      catch (err) {
        alert(err)
      }
      if (!subDataSource) {
        setSubAttributes({})
        setSubAttributesDisplay({})
      }
      else {
        const model = models[components[subDataSource].props ?.model]
        if (model) {
          const subAttrs = lodash(model.attributes)
            .pickBy((def, k) => def.multiple && def.ref)
            .value()
          setSubAttributes(subAttrs)
        }
        console.log(`SubAttribute:${JSON.stringify(!!subAttribute)}`)
        const subModel=subAttribute ? models[model.attributes[subAttribute].type] : model
        console.log(`SubModel:${typeof(subModel)}`)
        const subAttrsDisplay = lodash(subModel.attributes)
          .pickBy((def, k) => !def.multiple && !def.ref)
          .value()
        setSubAttributesDisplay(subAttrsDisplay)
      }
    }
  }, [activeComponent, components, models, subDataSource, subAttribute])

  useEffect(() => {
    if (!providers ?.length > 0 || !activeComponent || components ?.length > 0) {
      return
    }
    // TODO: have to fix getDataProviderDataType and remove try/catch
    try {
      const currentModel = getDataProviderDataType(
        activeComponent,
        components,
        dataSource,
        models,
      ) ?.type
      setContextProviders(providers.filter(p => p.props.model == currentModel))
    } catch (err) {
      console.error(err)
    }
  }, [providers, activeComponent, components, dataSource, models])

  const onContextFilterChange = ev => {
    setValue('contextFilter', ev.target.checked)
  }

  const onDataSourceOrModelChange = ev => {
    const {name, value}=ev.target
    console.log(name, value)
    if (!value) {
      removeValue(name)
    }
    else {
      setValueFromEvent(ev)
    }
    removeValue(name=='model'?'dataSource':'model')
    removeValue('attribute')
  }

  const onSubDataSourceChange = ev => {
    const {name, value}=ev.target
    console.log(name, value)
    if (!value) {
      removeValue(name)
    }
    else {
      setValueFromEvent(ev)
    }
    removeValue('subAttribute')
    removeValue('subAttributeDisplay')
  }

  const onSubAttributeChange = ev => {
    const {name, value}=ev.target
    console.log(name, value)
    if (!value) {
      removeValue(name)
    }
    else {
      setValueFromEvent(ev)
    }
    removeValue('subAttributeDisplay')
  }

  const onAddToTargetChange = ev => {
    setValue(ev.target.name, ev.target.checked)
  }

  return (
    <Accordion allowToggle={true}>
      <AccordionContainer title="Data source">
        {(activeComponent?.type=='Checkbox' || activeComponent?.type=='IconCheck') &&
        <FormControl htmlFor="addTarget" label='Add to context'>
          <Checkbox
            id="addTarget"
            name="addTarget"
            isChecked={addTarget}
            onChange={onAddToTargetChange}
          ></Checkbox>
        </FormControl>
        }
        <FormControl htmlFor="dataSource" label="Datasource">
          <Select
            id="dataSource"
            onChange={onDataSourceOrModelChange}
            name="dataSource"
            size="xs"
            value={dataSource || ''}
          >
            <option value={undefined}></option>
            {providers.map((provider, i) => (
              <option key={`prov${i}`} value={provider.id}>
                {`${provider.id} (${provider.props ?.model})`}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl htmlFor="model" label="Model">
          <Select
            id="model"
            onChange={onDataSourceOrModelChange}
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
        {CONTAINER_TYPE.includes(activeComponent ?.type) && (
          <FormControl htmlFor="limit" label="Limit">
            <Input
              id="limit"
              name="limit"
              size="xs"
              value={limit}
              type="number"
              onChange={setValueFromEvent}
            />
          </FormControl>
        )}
        {CONTAINER_TYPE.includes(activeComponent ?.type) && (
          <FormControl htmlFor="contextFilter" label="Filter context">
            <Select
              id="contextFilter"
              onChange={setValueFromEvent}
              name="contextFilter"
              size="xs"
              value={contextFilter || ''}
            >
              <option value={undefined}></option>
              {contextProviders.map((provider, i) => (
                <option key={`prov${i}`} value={provider.id}>
                  {`${provider.id} (${provider.props ?.model})`}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {CONTAINER_TYPE.includes(activeComponent ?.type) && filterAttributes && (
          <>
            <FormControl htmlFor="filterAttribute" label="Filter attribute">
              <Select
                id="filterAttribute"
                onChange={setValueFromEvent}
                name="filterAttribute"
                size="xs"
                value={filterAttribute || ''}
              >
                <option value={undefined}></option>
                {Object.keys(filterAttributes).map((attribute, i) => (
                  <option key={`attr${i}`} value={attribute}>
                    {attribute}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl htmlFor="filterValue" label="Filter value">
              <Select
                id="filterValue"
                onChange={setValueFromEvent}
                name="filterValue"
                size="xs"
                value={filterValue || ''}
              >
                <option value={undefined}></option>
                {Object.values(components)
                  .filter(c => !CONTAINER_TYPE.includes(c.type))
                  .map((component, i) => (
                    <option key={`comp${i}`} value={component.id}>
                      {`${component.id} (${component.type})`}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </>
        )}
        {activeComponent ?.type == "Select" && (
          <Box borderWidth='1px' p='5px'>
            <small>Choose values</small>
            <FormControl htmlFor="subDataSource" label="Datasource">
              <Select
                id="subDataSource"
                onChange={onSubDataSourceChange}
                name="subDataSource"
                size="xs"
                value={subDataSource || ''}
              >
                <option value={undefined}></option>
                {providers.map((provider, i) => (
                  <option key={`prov${i}`} value={provider.id}>
                    {`${provider.id} (${provider.props ?.model})`}
                  </option>
                ))}
              </Select>
            </FormControl>
              <FormControl htmlFor="subAttribute" label="Attribute">
                <Select
                  id="subAttribute"
                  onChange={onSubAttributeChange}
                  name="subAttribute"
                  size="xs"
                  value={subAttribute || ''}
                >
                  <option value={undefined}></option>
                  {Object.keys(subAttributes).map((attribute, i) => (
                    <option key={`attr${i}`} value={attribute}>
                      {attribute}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl htmlFor="subAttributeDisplay" label="Display attribute">
                <Select
                  id="subAttributeDisplay"
                  onChange={setValueFromEvent}
                  name="subAttributeDisplay"
                  size="xs"
                  value={subAttributeDisplay || ''}
                >
                  <option value={undefined}></option>
                  {Object.keys(subAttributesDisplay).map((attribute, i) => (
                    <option key={`attr${i}`} value={attribute}>
                      {attribute}
                    </option>
                  ))}
                </Select>
              </FormControl>
          </Box>
        )}
      </AccordionContainer>
    </Accordion>
  )
}

export default memo(DataSourcePanel)
