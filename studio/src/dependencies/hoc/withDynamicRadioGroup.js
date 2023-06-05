import { Radio, Flex } from '@chakra-ui/react'
import React, {useState} from 'react'
import lodash from 'lodash'

import { ACTIONS } from '../utils/actions'

const withDynamicGroup = Component => {

  const Internal = ({children, noautosave, ...props}) => {
    const dataSource=props.dataSource
    const enumValues=props.enum ? JSON.parse(props.enum) : null
    const [internalValue, setInternalValue] = useState(lodash.get(props.dataSource, props.attribute))

    const onChange = evValue => {
      setInternalValue(evValue)
      props.setComponentValue && props.setComponentValue(props.id, evValue)

      if (!noautosave) {
        ACTIONS.putValue({
          context: dataSource?._id,
          value: evValue,
          props,
        })
        .then(() => props.reload())
        .catch(err => console.error(err))
      }
    }

    return (
      <Component {...props} onChange={onChange} key={internalValue} value={internalValue} data-value={internalValue} >
        {enumValues ?
          <Flex flexDirection={props.flexDirection} justifyContent={props.justifyContent}>
          {
            Object.keys(enumValues).map((k, idx) => <Flex flexDirection='row'><Radio value={k} />{enumValues[k]}</Flex>)
          }
          </Flex>
          :null
        }
        <div>{children}</div>
      </Component>
    )
  }

  return Internal
}

export default withDynamicGroup
