import React, { useEffect, useState } from 'react'
import lodash from 'lodash'

import { ACTIONS } from '../utils/actions'
import useDebounce from '../hooks/useDebounce.hook'

const withDynamicInput = Component => {
  const Internal = ({ dataSource, context, backend, ...props }) => {
    const [internalDataValue, setInternalDataValue] = useState(null)

    const [neverTyped, setNeverTyped] = useState(true)
    const debouncedValue = useDebounce(internalDataValue, 500)

    useEffect(() => {
      setInternalDataValue(lodash.get(dataSource, props.attribute))
    }, [dataSource, props.attribute])

    const onChange = ev => {
      setInternalDataValue(ev.target.value)
      if (neverTyped) {
        setNeverTyped(false)
      }
    }

    useEffect(() => {
      if (!neverTyped) {
        ACTIONS.putValue({
          context: dataSource?._id,
          value: debouncedValue,
          props,
          backend,
        })
          .then(() => props.reload())
          .catch(err => console.error(err))
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backend, context, debouncedValue, neverTyped])

    return (
      <Component {...props} value={internalDataValue} onChange={onChange} />
    )
  }

  return Internal
}

export default withDynamicInput
