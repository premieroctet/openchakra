import { ACTIONS } from '../utils/actions'

import React from 'react'
import lodash from 'lodash'

const withDynamicCheckbox = Component => {
  const Internal = ({ dataSource, context, backend, ...props }) => {
    const onChange = ev => {
      ACTIONS.putValue({
        context,
        value: !!ev.target.checked,
        props,
        backend,
      }).then(() => props.reload())
    }

    const value = lodash.get(dataSource, props.attribute)
    return <Component {...props} isChecked={value} onChange={onChange} />
  }

  return Internal
}

export default withDynamicCheckbox
