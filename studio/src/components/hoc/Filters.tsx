import {
  IconButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from '@chakra-ui/react'
import { SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import lodash from 'lodash'

import { generateId } from '../../utils/generateId'
import {
  getAvailableAttributes,
  getDataProviderDataType
} from '../../utils/dataSources';
import {
  getComponents,
  getSelectedComponent,
} from '../../core/selectors/components'
import {
  getConditionPropertyName,
  getConditionsPropertyName,
} from '../../dependencies/utils/filters'
import { getModels } from '../../core/selectors/dataSources'
import { useForm } from '../../hooks/useForm'
import FiltersPanel from '../inspector/panels/FiltersPanel'
import FormControl from '../inspector/controls/FormControl'
import usePropsSelector from '../../hooks/usePropsSelector'

//const FILTERABLE_COMPONENT_TYPES=['RadioGroup', 'Input']
const FILTERABLE_COMPONENT_TYPES=['RadioGroup', 'Input', 'Select']

export const withFilters = Component => {

  const Internal = props => {
    const { setValue, removeValue } = useForm()

    const allComponents: IComponents = useSelector(getComponents)
    const activeComponent: IComponent = useSelector(getSelectedComponent)
    const models = useSelector(getModels)
    const conditions = usePropsSelector(getConditionsPropertyName(props.name))
    const [attrs, setAttrs] = useState({})
    const [components, setComponents] = useState({})
    const [modalOpen, setModalOpen] = useState(false)

  // Get attributes for curent component
  useEffect(() => {
      if (!activeComponent || lodash.isEmpty(models) || lodash.isEmpty(allComponents)) {
        return
      }
      try {
        const model= getDataProviderDataType(
          activeComponent,
          allComponents,
          activeComponent.props.dataSource, // || components[activeComponent.parent].props.dataSource,
          models,
        )
        setAttrs(models[model.type].attributes)
      }
      catch (err) {
        console.error(err)
        try{
        const parent=allComponents[activeComponent.parent]
        const model= getDataProviderDataType(
          parent,
          components,
          parent.props.dataSource,
          models,
        )
        setAttrs(models[model.type].attributes)
      }
      catch (err) {
        console.error(err)
      }
    }
  }, [activeComponent, allComponents, models])

  useEffect(() => {
    if (lodash.isEmpty(models) || lodash.isEmpty(allComponents)) {
      return
    }
    const comps=Object.values(allComponents).filter(c => FILTERABLE_COMPONENT_TYPES.includes(c.type))
    const compsToAdd={}
    comps.forEach(component => {
      try {
        const model=component.props.model ? {type: component.props.model} : getDataProviderDataType(
          component,
          allComponents,
          component.props.dataSource, // || components[activeComponent.parent].props.dataSource,
          models,
        )
        if (component.type=='RadioGroup') {
          console.log(component.id, component.type, model)
        }
        if (model && component.props?.attribute) {
          compsToAdd[component.id]={...models[model.type].attributes[component.props.attribute], isComponent: true}
        }
      }
      catch (err) {
        //console.error(err)
      }
    })
    setComponents(compsToAdd)
  }, [activeComponent, allComponents, models])

  const onAddFilter = (filter: Filter) => {
    const newId = generateId('').replace(/^-/, '')
    const conds = { ...conditions, [newId]: filter }
    setValue(getConditionsPropertyName(props.name), conds)
    setModalOpen(false)
  }

  const onRemoveFilter = condId => {
    const propName = getConditionPropertyName(condId)
    removeValue(propName)
    const conds = lodash.omit(conditions, [condId])
    setValue(getConditionsPropertyName(props.name), conds)
  }

    useEffect(() => {
      if (lodash.isEmpty(conditions)) {
        removeValue(getConditionsPropertyName(props.name))
      }
    }, [conditions, props.name, removeValue])

    const passedAttributes={...attrs, ...components}

    return (
      <>
        {conditions &&
          Object.keys(conditions).map(condId => {
            const propName = getConditionPropertyName(condId)
            const cond = conditions[condId]
            const newProps = { ...props, name: propName }
            return (
              <>
                <div>
                  {cond.attribute}
                  {cond.operator}
                  {cond.value}
                </div>
                <Flex>
                  <IconButton
                    icon={<SmallCloseIcon />}
                    onClick={() => onRemoveFilter(condId)}
                  />
                  <Component {...newProps} />
                </Flex>
              </>
            )
          })}
        <div>default
          <SmallAddIcon onClick={() => setModalOpen(true)}/>
        </div>

        <Component {...props} />
        {attrs && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size='x1'>
            <ModalContent>
              <ModalHeader>Add a condition</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FiltersPanel attributes={passedAttributes} onValidate={onAddFilter} />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </>
    )
  }

  return Internal
}
