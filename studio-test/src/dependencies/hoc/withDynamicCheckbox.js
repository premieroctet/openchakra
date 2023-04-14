import { ACTIONS } from '../utils/actions'

import React, {useState} from 'react'
import lodash from 'lodash'

const withDynamicCheckbox = Component => {
  const Internal = ({ dataSource, context, backend, addTarget, ...props }) => {

    const initialValue = lodash.get(dataSource, props.attribute)
    const [value, setValue]=useState((!addTarget && initialValue) || false)

    console.log(`Datasource is ${JSON.stringify(dataSource._id)}, context is ${JSON.stringify(context)}`)
    const onChange = ev => {
      setValue(!!ev.target.checked)
      const action=addTarget ?
        ACTIONS.addTarget({value: dataSource._id, context, append: !!ev.target.checked})
        :
        ACTIONS.putValue({context: dataSource?._id, value: !!ev.target.checked, props,backend})

      action.then(() => props.reload())
    }

    const pr={...props, isChecked: value, value}
    return (
      <div {...pr}>
        <Component {...lodash.omit(props, ['id'])} isChecked={value} onChange={onChange} />
      </div>
    )
  }

  return Internal
}

export default withDynamicCheckbox
