import { ACTIONS } from '../utils/actions'

import React, {useState} from 'react'
import lodash from 'lodash'

const withDynamicCheckbox = Component => {
  const Internal = ({ dataSource, context, subDataSource, subAttribute, enum: enums, backend, ...props }) => {

    const initialValue = lodash.get(dataSource, props.attribute)
    const [value, setValue]=useState(initialValue)
    let refValues=null

    const onChange = ev => {
      setValue(!!ev.target.checked)
      ACTIONS.putValue({
        context: dataSource?._id,
        value: !!ev.target.checked,
        props,
        backend,
      }).then(() => props.reload())
    }

    // attribute, dataModel, value

    if (enums) {
      const checkOptions = JSON.parse(enums)
    }


    console.log({ dataSource, context, subDataSource, subAttribute, enums, backend, ...props })
    // console.log(checkOptions)
    console.log(initialValue)
    console.log('props', props)

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
