import React, { memo } from 'react'
import { useForm } from '../../../hooks/useForm'
import lodash from 'lodash'
import FormControl from '../controls/FormControl'
import usePropsSelector from '../../../hooks/usePropsSelector'
import { List, Checkbox } from '@chakra-ui/react'

const ROLES = ['apprenant', 'formateur', 'concepteur', 'administrateur']

const VisibilityPanel: React.FC = () => {
  const hiddenRoles = usePropsSelector('hiddenRoles')
  const { setValue } = useForm()

  const onRoleChange = event => {
    const { name, checked } = event.target
    const newRoles = checked
      ? lodash([...hiddenRoles, name])
          .uniq()
          .value()
      : hiddenRoles.filter(r => r != name)
    setValue('hiddenRoles', newRoles)
  }

  return (
    <FormControl htmlFor="hiddenRoles" label="Hidden for">
      <List>
        {ROLES.map((role, i) => (
          <Checkbox
            key={`vis${i}`}
            name={role}
            value={role}
            isChecked={hiddenRoles.includes(role)}
            onChange={onRoleChange}
          >
            {role}
          </Checkbox>
        ))}
      </List>
    </FormControl>
  )
}

export default memo(VisibilityPanel)
