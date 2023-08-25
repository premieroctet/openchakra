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
import { withFilters } from '../../hoc/Filters'

const VisibilityPanel: React.FC = props => {
  const hiddenRoles:string[] = usePropsSelector('hiddenRoles')
  const { setValue, removeValue } = useForm()
  const roles = useSelector(getRoles)

  const onRoleChange = values => {
    if (values.length==0) {
      removeValue('hiddenRoles')
    }
    else {
      setValue('hiddenRoles', values.map(v => v.value))
    }
  }

  const getPairs = rs => {
    return (rs||[]).map(r => ({value: r, label: roles[r]}))
  }

  return (
    <FormControl htmlFor="hiddenRoles" label="Hidden for">
      <MultiSelect
          options={[{value: NOT_CONNECTED, label: 'Non connecté'}, ...getPairs(Object.keys(roles))]}
          value={getPairs(hiddenRoles)}
          onChange={onRoleChange}
          labelledBy="Select"
          hasSelectAll={false}
          disableSearch={true}
        />
      </FormControl>
  )
}

export default memo(withFilters(VisibilityPanel))
