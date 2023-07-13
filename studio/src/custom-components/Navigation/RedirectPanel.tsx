import { Select, Checkbox } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { memo } from 'react'
import lodash from 'lodash'

import {
  DEFAULT_REDIRECT_PAGE,
  REDIRECT_COUNT,
  REDIRECT_PAGE,
  REDIRECT_ROLE
} from '../../utils/misc';
import { getPages } from '../../core/selectors/components';
import { getRoles } from '../../core/selectors/roles';
import { pagesList } from '../../utils/actions';
import { useForm } from '../../hooks/useForm'
import FormControl from '../../components/inspector/controls/FormControl'
import usePropsSelector from '../../hooks/usePropsSelector'

const RedirectPanel = () => {
  const { setValueFromEvent } = useForm()
  const roles= useSelector(getRoles)
  const autoRedirectRoles = lodash.range(REDIRECT_COUNT).map(idx => usePropsSelector(`autoRedirectRole_${idx}`))
  const autoRedirectPages = lodash.range(REDIRECT_COUNT).map(idx => usePropsSelector(`autoRedirectPage_${idx}`))
  const defaultRedirect=usePropsSelector(DEFAULT_REDIRECT_PAGE)

  const pages = useSelector(getPages)
  return (
    <>
      {lodash.range(REDIRECT_COUNT).map(idx => (
        <>
        <FormControl htmlFor={`${REDIRECT_ROLE}${idx}`} label="Si rôle">
          <Select
            id={`${REDIRECT_ROLE}${idx}`}
            onChange={setValueFromEvent}
            name={`${REDIRECT_ROLE}${idx}`}
            size="sm"
            value={autoRedirectRoles[idx] || ''}
          >
            <option value={undefined}></option>
            {Object.entries(roles).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl htmlFor={`${REDIRECT_PAGE}${idx}`} label="Rediriger vers">
          <Select
            id={`${REDIRECT_PAGE}${idx}`}
            onChange={setValueFromEvent}
            name={`${REDIRECT_PAGE}${idx}`}
            size="sm"
            value={autoRedirectPages[idx] || ''}
          >
            <option value={undefined}></option>
            {pagesList({pages}).map((p, i) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </Select>
        </FormControl>
        </>
    ))}
      <FormControl htmlFor={DEFAULT_REDIRECT_PAGE} label="Sinon rediriger vers">
        <Select
          id={DEFAULT_REDIRECT_PAGE}
          onChange={setValueFromEvent}
          name={DEFAULT_REDIRECT_PAGE}
          size="sm"
          value={defaultRedirect || ''}
        >
          <option value={undefined}></option>
          {pagesList({pages}).map((p, i) => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )

}

export default memo(RedirectPanel)
