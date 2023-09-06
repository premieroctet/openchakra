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
import ColorsControl from '../controls/ColorsControl';
import FormControl from '../controls/FormControl'
import usePropsSelector from '../../../hooks/usePropsSelector'

const DataSourcePanel: React.FC = () => {
  const components: IComponents = useSelector(getComponents)
  const activeComponent: IComponent = useSelector(getSelectedComponent)
  const { setValueFromEvent, setValue, removeValue } = useForm()
  const dataSource = usePropsSelector('dataSource')
  const model = usePropsSelector('model')
  const attribute = usePropsSelector('attribute')
  const subDataSource = usePropsSelector('subDataSource')
  const subAttribute = usePropsSelector('subAttribute')
  const subAttributeDisplay = usePropsSelector('subAttributeDisplay')
  const limit = usePropsSelector('limit')
  const contextFilter = usePropsSelector('contextFilter')
  const filterAttribute = usePropsSelector('filterAttribute')
  const filterValue = usePropsSelector('filterValue')
  const filterConstant = usePropsSelector('filterConstant')
  const filterAttribute2 = usePropsSelector('filterAttribute2')
  const filterValue2 = usePropsSelector('filterValue2')
  const contextAttribute = usePropsSelector('contextAttribute')
  const series_attributes = lodash.range(5).map(idx => usePropsSelector(`series_${idx}_attribute`))
  const series_labels = lodash.range(5).map(idx => usePropsSelector(`series_${idx}_label`))
  const hidePagination = usePropsSelector('hidePagination')
  const shuffle = usePropsSelector('shuffle')
  const radioGroup = usePropsSelector('radioGroup')
  const [providers, setProviders] = useState<IComponent[]>([])
  const [contextProviders, setContextProviders] = useState<IComponent[]>([])
  const [attributes, setAttributes] = useState({})
  const [subAttributes, setSubAttributes] = useState({})
  const [subAttributesDisplay, setSubAttributesDisplay] = useState({})
  const [filterAttributes, setFilterAttributes] = useState({})
  const [contextAttributes, setContextAttributes] = useState({})
  const [radioGroups, setRadioGroups] = useState([])
  const models = useSelector(getModels)
  const [isChart, setIsChart] = useState(false)
  const [availableSeries, setAvailableSeries] = useState([])
  const [dataType, setDataType] = useState('menu')

  useEffect(()=> {
    setIsChart(activeComponent?.type=='Chart')
  }, [activeComponent])

  useEffect(()=> {
    if (isChart && dataSource && attribute && models && !lodash.isEmpty(attributes)) {
      const type=attributes[attribute]?.type
      const chartModel=models[type]
      const numberAttributes=lodash(chartModel.attributes).pickBy((att, attName) =>
        att.type=='Number' && att.multiple==false && !attName.includes('.')).keys().value()
        setAvailableSeries(numberAttributes)
    }
    else {
      setAvailableSeries([])
    }
  }, [isChart, dataSource, attribute, attributes, models])

  useEffect(() => {
    try {
      const type=getDataProviderDataType(activeComponent, components, dataSource, models)
      setDataType(type.type)
    }
    catch(err) {setDataType(null)}
  }, [dataSource, models, activeComponent, components])

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

      const parentType = components.root.props.model

      if (parentType) {
        setContextAttributes(lodash.pickBy(models[parentType].attributes,
          (att, name) =>att.ref && att.multiple && !name.includes('.')
        ))
      }
    } catch (err) {
      console.error(err)
    }
  }, [providers, activeComponent, components, dataSource, models])

  useEffect(() => {
    if (lodash.isEmpty(components)) {
      setRadioGroups([])
    }
    else {
      setRadioGroups(lodash(components).pickBy(attrs => attrs.type==='RadioGroup').keys().value())
    }
  }, [components])

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

  const onCheckboxChange = ev => {
    setValue(ev.target.name, ev.target.checked)
  }

  return (
    <Accordion allowToggle={true}>
      <AccordionContainer title="Data source">
        {(activeComponent?.type=='Checkbox' || activeComponent?.type=='IconCheck') &&
        <FormControl htmlFor="radioGroup" label='Radio group'>
        <Select
          id="radioGroup"
          onChange={setValueFromEvent}
          name="radioGroup"
          size="xs"
          value={radioGroup || ''}
        >
          <option value={undefined}></option>
          {radioGroups.map(att => (
            <option key={att} value={att}>
              {att}
            </option>
          ))}
        </Select>
        </FormControl>
        }
        <FormControl htmlFor="dataSource" label={<>Datasource<div>{dataType}</div></>}>
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
        <FormControl htmlFor="hidePagination" label='Hide pagination'>
          <Checkbox
            id="hidePagination"
            name="hidePagination"
            isChecked={hidePagination}
            onChange={onCheckboxChange}
          ></Checkbox>
        </FormControl>
        )}
        {CONTAINER_TYPE.includes(activeComponent ?.type) && (
        <FormControl htmlFor="shuffle" label='Shuffle'>
          <Checkbox
            id="shuffle"
            name="shuffle"
            isChecked={shuffle}
            onChange={onCheckboxChange}
          ></Checkbox>
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
            <FormControl htmlFor="filterConstant" label="Filter constant">
              <Input
                id="filterConstant"
                onChange={setValueFromEvent}
                name="filterConstant"
                size="xs"
                value={filterConstant || ''}
              />
            </FormControl>
            <FormControl htmlFor="filterAttribute2" label="Filter attribute 2">
              <Select
                id="filterAttribute2"
                onChange={setValueFromEvent}
                name="filterAttribute2"
                size="xs"
                value={filterAttribute2 || ''}
              >
                <option value={undefined}></option>
                {Object.keys(filterAttributes).map((attribute, i) => (
                  <option key={`attr${i}`} value={attribute}>
                    {attribute}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl htmlFor="filterValue2" label="Filter value 2">
              <Select
                id="filterValue2"
                onChange={setValueFromEvent}
                name="filterValue2"
                size="xs"
                value={filterValue2 || ''}
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
        {isChart &&
          (<Box borderWidth='1px' p='5px'>
            <small>Series</small>
            { lodash.range(5).map((_,i)=> (
              <>
                <FormControl htmlFor={`series_${i}_attribute`} label={`Series ${i}`}>
                <Select
                  id={`series_${i}_attribute`}
                  name={`series_${i}_attribute`}
                  onChange={setValueFromEvent}
                  size="xs"
                  value={series_attributes[i]}
                >
                  <option value={undefined}></option>
                  {availableSeries.map((serie,i) => (
                    <option key={`serie${i}`} value={serie}>
                      {serie}
                    </option>
                  ))}
                </Select>
                </FormControl>
                <FormControl htmlFor={`series_${i}_label`} label={`Title ${i}`}>
                  <Input
                  id={`series_${i}_label`}
                  name={`series_${i}_label`}
                  size="xs"
                  value={series_labels[i]}
                  type="text"
                  onChange={setValueFromEvent}
                  />
                </FormControl>
                <ColorsControl label={`Color ${i}`} name={`series_${i}_color`} />
                </>
              ))}
            </Box>)
        }
      </AccordionContainer>
    </Accordion>
  )
}

export default memo(DataSourcePanel)
