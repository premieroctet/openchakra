import { Accordion, Select } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { memo } from 'react'
import { getModels } from '~core/selectors/dataSources'
import AccordionContainer from '~components/inspector/AccordionContainer'
import { ACTIONS } from '../../../utils/actions'
import { getComponents, getPages } from '../../../core/selectors/components'
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
          {actions.map(action => (
            <option value={action}>{ACTIONS[action].label}</option>
          ))}
        </Select>
      </FormControl>
      {action &&
        Object.keys(ACTIONS[action].options).map(k => {
          const optionValues: any[] = ACTIONS[action].options[k](optionsParams)
          return (
            <FormControl htmlFor={k} label={k}>
              <Select
                id={k}
                onChange={onActionPropChange}
                name={k}
                size="sm"
                value={actionProps[k] || ''}
              >
                <option value={undefined}></option>
                {optionValues.map((optionValue, i) => (
                  <option key={`acp${i}`} value={optionValue.key}>
                    {optionValue.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          )
        })}
    </>
  )
}

const ActionsPanel: React.FC = () => {
  const { setValueFromEvent, setValue } = useForm()
  const action = usePropsSelector('action')
  const nextAction = usePropsSelector('nextAction')
  const actionProps = usePropsSelector('actionProps')
  const nextActionProps = usePropsSelector('nextActionProps')
  const redirectTo = usePropsSelector('redirectTo')
  const pages = useSelector(getPages)
  const models = useSelector(getModels)
  const components = useSelector(getComponents)

  const optionsParams = { pages, models, components: Object.values(components) }

  const onActionPropChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = ev.target
    setValue('actionProps', { ...actionProps, [name]: value })
  }

  const onNextActionPropChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = ev.target
    setValue('nextActionProps', { ...nextActionProps, [name]: value })
  }

  const onActionChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(ev.target)
    // Reset action props on action change
    //setValue('actionProps', {})
    setValueFromEvent(ev)
  }

  return (
    <Accordion>
      <AccordionContainer title="Actions">
        <ActionPanel
          id="action"
          actionLabel="Action"
          actions={Object.keys(ACTIONS)}
          action={action}
          actionProps={actionProps}
          optionsParams={optionsParams}
          onActionChange={onActionChange}
          onActionPropChange={onActionPropChange}
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
          />
        ) : null}
      </AccordionContainer>
    </Accordion>
  )
}

export default memo(ActionsPanel)
