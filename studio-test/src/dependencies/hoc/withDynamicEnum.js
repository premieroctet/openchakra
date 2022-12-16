import React from 'react'
import { Radio, Flex } from '@chakra-ui/react'
import { ACTIONS } from '../utils/actions'
import lodash from 'lodash'

const withDynamicEnum = Component => {
  const internal = props => {
    const dataSource=props.dataSource
    const enumValues=props?.enum?.split(',') || []
    const value = lodash.get(props.dataSource, props.attribute)
    const spreaded = {...lodash.omit(props, ['children']), 'data-value': value, value}

    const onChange = evValue => {
      ACTIONS.putValue({
        context: dataSource?._id,
        value: evValue,
        props,
      })
        .then(() => props.reload())
        .catch(err => console.error(err))
    }

    return (
      <Component {...spreaded} onChange={onChange}>
      <>
      {
        enumValues.map((e, idx) => <Flex flexDirection='row'><Radio value={e} />{e}</Flex>)
      }
      </>
      </Component>
    )
  }

  return internal
}

export default withDynamicEnum
