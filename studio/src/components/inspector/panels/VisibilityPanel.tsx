import React, { memo } from 'react'
import { useForm } from '../../../hooks/useForm'
import lodash from 'lodash'
import { NOT_CONNECTED } from '../../../dependencies/utils/misc';
import FormControl from '../controls/FormControl'
import usePropsSelector from '../../../hooks/usePropsSelector'
import { List, Checkbox } from '@chakra-ui/react'
import { getRoles } from '~core/selectors/roles'
import { useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'

const VisibilityPanel: React.FC = () => {
  const hiddenRoles = usePropsSelector('hiddenRoles')
  const { setValue } = useForm()
  const roles = useSelector(getRoles)

  const onRoleChange = event => {
    const { name, checked } = event.target
    const newRoles = checked
      ? lodash([...hiddenRoles, name])
          .uniq()
          .value()
      : hiddenRoles.filter(r => r != name)
    setValue('hiddenRoles', newRoles)
  }

  const getPairs = rs => {
    return (rs||[]).map(r => ({value: r, label: roles[r]}))
  }

  return (
    <FormControl htmlFor="hiddenRoles" label="Hidden for">
      <MultiSelect
          options={[{value: NOT_CONNECTED, label: 'Non connect'}, ...getPairs(Object.keys(roles))]}
          value={getPairs(hiddenRoles)}
          onChange={values => setValue('hiddenRoles', values.map(v => v.value))}
          labelledBy="Select"
          hasSelectAll={false}
          disableSearch={true}
        />
      </FormControl>
  )
}

export default memo(VisibilityPanel)
