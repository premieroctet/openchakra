import React, {useState} from 'react'
import { Radio, Flex } from '@chakra-ui/react'
import { ACTIONS } from '../utils/actions'
import lodash from 'lodash'

const withDynamicEnum = Component => {

  const Internal = props => {
    const dataSource=props.dataSource
    const enumValues=JSON.parse(props?.enum || {})
    const [internalValue, setInternalValue] = useState(lodash.get(props.dataSource, props.attribute))
    //const spreaded = {...lodash.omit(props, ['children']), 'data-value': internalValue, value: internalValue}

    const onChange = evValue => {
      setInternalValue(evValue)
      props.setStateValue(evValue)

      ACTIONS.putValue({
        context: dataSource?._id,
        value: evValue,
        props,
      })
        .then(() => props.reload())
        .catch(err => console.error(err))
    }

    return (
      <Component {...props} onChange={onChange} key={internalValue} value={internalValue}>
        <Flex flexDirection={props.flexDirection} justifyContent={props.justifyContent}>
        {
          Object.keys(enumValues).map((k, idx) => <Flex flexDirection='row'><Radio value={k} />{enumValues[k]}</Flex>)
        }
        </Flex>
      </Component>
    )
  }

  return Internal
}

export default withDynamicEnum
