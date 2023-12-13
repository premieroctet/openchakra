import { ACTIONS } from '../utils/actions'

import React, {useState} from 'react'
import lodash from 'lodash'

const withDynamicCheckbox = Component => {
  const Internal = ({ dataSource, insideGroup, context, contextAttribute, noautosave, ...props }) => {

    const initialValue = lodash.get(dataSource, props.attribute || '_id')
    const [value, setValue]=useState((!contextAttribute && initialValue) || false)

    if (insideGroup) {
      return <Component {...props} value={value} insideGroup />
    }

    const onChange = ev => {
      setValue(!!ev.target.checked)
      if (!noautosave) {
        const action=contextAttribute ?
          ACTIONS.addToContext({value: dataSource._id, context, append: !!ev.target.checked, contextAttribute})
          :
          ACTIONS.putValue({context: dataSource?._id, value: !!ev.target.checked, props})

        action.then(() => props.reload())
      }
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
