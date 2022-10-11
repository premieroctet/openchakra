import { Accordion, Input, Select } from '@chakra-ui/react';
import { useSelector } from 'react-redux'
import React, { useState, useEffect, memo } from 'react'

import { getDataProviders, getAvailableAttributes, CONTAINER_TYPE } from '~utils/dataSources'
import {getModels, getModelAttributes} from '~core/selectors/dataSources'
import AccordionContainer from '~components/inspector/AccordionContainer'

import { ACTIONS } from '../../../utils/actions';
import {
  getComponents,
  getPages,
  getSelectedComponent
} from '../../../core/selectors/components';
import { useForm } from '../../../hooks/useForm'
import FormControl from '../controls/FormControl'
import usePropsSelector from '../../../hooks/usePropsSelector'


const ActionsPanel:React.FC = () => {
  const { setValueFromEvent } = useForm()
  const action = usePropsSelector('action')
  const redirectTo = usePropsSelector('redirectTo')
  const pages = useSelector(getPages)

  return (
    <Accordion >
      <AccordionContainer title="Actions">
      <FormControl htmlFor="action" label="Action">
        <Select
          id="action"
          onChange={setValueFromEvent}
          name="action"
          size="sm"
          value={action || ''}
        >
          <option value={null}></option>
          {Object.keys(ACTIONS).map(action => (
            <option value={action}>
              {action}
            </option>
          ))}
        </Select>
        </FormControl>
        <FormControl htmlFor="redirectTo" label="Redirect if success">
        <Select
          id="redirectTo"
          onChange={setValueFromEvent}
          name="redirectTo"
          size="sm"
          value={redirectTo || ''}
        >
          <option value={null}></option>
          {Object.values(pages).map(page => (
            <option value={page.id}>
              {page.pageName}
            </option>
          ))}
        </Select>
      </FormControl>
    </AccordionContainer>
    </Accordion>
  )
}

export default memo(ActionsPanel)
