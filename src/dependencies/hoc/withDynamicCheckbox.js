import { ACTIONS } from '../utils/actions';

import React, {useState} from 'react'
import lodash from 'lodash'

const withDynamicCheckbox = Component => {

  const Internal = ({dataSource, context, datavalue, backend, ...props}) => {
    const [internalDataValue, setInternalDataValue]=useState(datavalue)

    const onChange = ev => {
      setInternalDataValue(ev.target.checked)
      ACTIONS.putValue({context, value:!!ev.target.checked, props, backend})
        .then(() => props.reload())
    }

    const value = lodash.get(dataSource, props.attribute)
    return <Component {...props} isChecked={value} onChange={onChange} datavalue={internalDataValue}/>
  }

  return Internal
}

export default withDynamicCheckbox
