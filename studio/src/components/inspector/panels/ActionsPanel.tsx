import { Accordion, Select, Checkbox } from '@chakra-ui/react'
import { MultiSelect } from 'react-multi-select-component'
import { useSelector } from 'react-redux'
import React, { memo, useEffect, useState } from 'react'
import lodash from 'lodash'

import { getModels } from '~core/selectors/dataSources'
import AccordionContainer from '~components/inspector/AccordionContainer'

import { ACTIONS } from '../../../utils/actions'
import { getAvailableAttributes } from '../../../utils/dataSources';
import {
  getComponents,
  getPages,
  getSelectedComponent
} from '../../../core/selectors/components';
import { useForm } from '../../../hooks/useForm'
import FormControl from '../controls/FormControl'
import usePropsSelector from '../../../hooks/usePropsSelector'

const ActionPanel = ({
  id,
  actionLabel,
  actions,
  action,
  actionProps,
  optionsParams,
  onActionChange,
  onActionPropChange,
  onActionPropSet,
}) => {
  return (
    <>
      <FormControl htmlFor={id} label={actionLabel}>
        <Select
          id={id}
          onChange={onActionChange}
          name={id}
          size="sm"
          value={action || ''}
        >
          <option value={undefined}></option>
          {lodash.orderBy(actions, a => ACTIONS[a].label).map((action, i) => (
            <option key={i} value={action}>{ACTIONS[action].label}</option>
          ))}
        </Select>
      </FormControl>
      {action &&
        Object.keys(ACTIONS[action].options).map(k => {
          const optionValues: any[] = ACTIONS[action].options[k](optionsParams)
          const optionValue = actionProps[k]
          const isMultiple=(ACTIONS[action].multiple||[]).includes(k)
          const multOptionValues=isMultiple && optionValues.map(o => ({value:o.key, ...o}))
          const multOptionsValue=isMultiple && actionProps[k].map(o => ({value:o.key, ...o}))
          return (
            <FormControl htmlFor={k} label={k}>
              {isMultiple ?
                <MultiSelect
                  options={multOptionValues}
                  name={k}
                  value={multOptionsValue}
                  onChange={values => onActionPropSet(k, values)}
                  hasSelectAll={false}
                  disableSearch={true}
                />
                :
                <Select
                  id={k}
                  onChange={onActionPropChange}
                  name={k}
                  size="sm"
                  value={optionValue}
                >
                  <option key={null} value={null}></option>
                  {optionValues.map((optionValue, i) => (
                    <option key={`acp${i}`} value={optionValue.key}>
                      {optionValue.label}
                    </option>
                  ))}
                </Select>
              }
            </FormControl>
          )
        })}
    </>
  )
}

const ActionsPanel: React.FC = () => {
  const { setValueFromEvent, setValue, removeValue } = useForm()
  const hideIfForbidden = usePropsSelector('hideIfForbidden')
  const action = usePropsSelector('action')
  const nextAction = usePropsSelector('nextAction')
  const actionProps = usePropsSelector('actionProps')
  const nextActionProps = usePropsSelector('nextActionProps')
  const redirectTo = usePropsSelector('redirectTo')
  const pages = useSelector(getPages)
  const models = useSelector(getModels)
  const components = useSelector(getComponents)
  const activeComponent: IComponent = useSelector(getSelectedComponent)
  const [attrs, setAttrs] = useState({})

  useEffect(() => {
    try {
      const attributes = getAvailableAttributes(
        activeComponent,
        components,
        models,
      )
      setAttrs(attributes)
    } catch (err) {
      console.error(err)
    }
  }, [activeComponent, components, models])

  const optionsParams = { pages, models, components: Object.values(components), attributes: attrs }

  const onActionPropChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = ev.target
    setValue('actionProps', value ? { ...actionProps, [name]: value } : lodash.omit(actionProps, [name]))
  }

  const onActionPropSet = (name, values) => {
    const vals=values.map(v => v.key)
    setValue('actionProps', {...actionProps, [name]: vals})
  }

  const onNextActionPropChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = ev.target
    setValue('nextActionProps', { ...nextActionProps, [name]: value })
  }

  const onNextActionPropSet = (name, values) => {
    const vals=values.map(v => v.key)
    setValue('nextActionProps', {...actionProps, [name]: vals})
  }

  const onActionChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    removeValue(ev.target.name=='action' ? 'actionProps':'nextActionProps')
    setValueFromEvent(ev)
  }
  const onHideChange = ev => {
    setValue('hideIfForbidden', ev.target.checked)
  }

  return (
    <Accordion>
      <AccordionContainer title="Actions">
        <FormControl htmlFor="hideIfForbidden" label='Hide if action is forbidden'>
          <Checkbox
            id="hideIfForbidden"
            name="hideIfForbidden"
            isChecked={hideIfForbidden}
            onChange={onHideChange}
          ></Checkbox>
        </FormControl>
        <ActionPanel
          id="action"
          actionLabel="Action"
          actions={Object.keys(ACTIONS)}
          action={action}
          actionProps={actionProps}
          optionsParams={optionsParams}
          onActionChange={onActionChange}
          onActionPropChange={onActionPropChange}
          onActionPropSet={onActionPropSet}
        />
        {ACTIONS[action]?.next?.length > 0 ? (
          <ActionPanel
            id="nextAction"
            actionLabel="If success"
            actions={ACTIONS[action].next}
            action={nextAction}
            actionProps={nextActionProps}
            optionsParams={optionsParams}
            onActionChange={onActionChange}
            onActionPropChange={onNextActionPropChange}
            onActionPropSet={onNextActionPropSet}
          />
        ) : null}
      </AccordionContainer>
    </Accordion>
  )
}

export default memo(ActionsPanel)
