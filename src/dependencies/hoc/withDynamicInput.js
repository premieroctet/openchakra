import React, {useState} from 'react'
import lodash from 'lodash'
import { ACTIONS } from '../utils/actions'

const withDynamicInput = Component => {

  const Internal = ({dataSource, context, datavalue, backend, ...props}) => {


    const [internalDataValue, setInternalDataValue]=useState(datavalue)

    const onChange = ev =>{
      ACTIONS.putValue({context, value:ev.target.value, props, backend})
        .then(() => {console.log('ok'); props.reload()})
        .catch(err => console.error(err))
    }

    const value = lodash.get(dataSource, props.attribute)
    return <Component {...props} value={value} onChange={onChange} datavalue={internalDataValue}/>
  }

  return Internal
}

export default withDynamicInput
