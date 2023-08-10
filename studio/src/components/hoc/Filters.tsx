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

export const withFilters = Component => {
  const Internal = props => {
    const { setValue, removeValue } = useForm()

    const components: IComponents = useSelector(getComponents)
    const activeComponent: IComponent = useSelector(getSelectedComponent)
    const models = useSelector(getModels)
    const conditions = usePropsSelector(getConditionsPropertyName(props.name))
    const [attrs, setAttrs] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
      if (!activeComponent || lodash.isEmpty(models) || lodash.isEmpty(components)) {
        return
      }
      try {
        const model= getDataProviderDataType(
          activeComponent,
          components,
          activeComponent.props.dataSource, // || components[activeComponent.parent].props.dataSource,
          models,
        )
        setAttrs(models[model.type].attributes)
      }
      catch (err) {
        console.error(err)
        try{
        const parent=components[activeComponent.parent]
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
    }, [activeComponent, components, models])

    const onAddFilter = (filter: Filter) => {
      const newId = generateId('').replace(/^-/, '')
      const conds = { ...conditions, [newId]: filter }
      setValue(getConditionsPropertyName(props.name), conds)
      setModalOpen(false)
    }

    const onRemoveFilter = condId => {
      const propName = getConditionPropertyName(condId)
      removeValue(propName)
      console.log(`After Removing property ${propName}`)
      const conds = lodash.omit(conditions, [condId])
      setValue(getConditionsPropertyName(props.name), conds)
      console.log(`After Setting conditions ${conds}`)
    }

    useEffect(() => {
      if (lodash.isEmpty(conditions)) {
        removeValue(getConditionsPropertyName(props.name))
      }
    }, [conditions, props.name, removeValue])

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
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <ModalContent>
              <ModalHeader>Add a condition</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FiltersPanel attributes={attrs} onValidate={onAddFilter} />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </>
    )
  }

  return Internal
}
