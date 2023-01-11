import React, { useEffect, useState } from 'react'
import lodash from 'lodash'

import { ACTIONS } from '../utils/actions'
import useDebounce from '../hooks/useDebounce.hook'

const withDynamicInput = Component => {
  const Internal = ({ dataSource, noautosave, context, backend, ...props }) => {

    let keptValue = lodash.get(dataSource, props.attribute) || ''

    const isADate = !isNaN(Date.parse(keptValue)) && new Date(Date.parse(keptValue));

    if (isADate instanceof Date) {

      const retainedDate = isADate.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'})
        .split(/\s/)
      const transformedDate = `${retainedDate[0].split('/').reverse().join('-')}T${retainedDate[1]}`

      if (props?.type === 'datetime-local') {
          keptValue = transformedDate.slice(0, 16)
      }
      if (props?.type === 'date') {
        keptValue = transformedDate.slice(0, 10)
      }
      if (props?.type === 'time') {
          keptValue = transformedDate.slice(11, 16)
      }
    }


    const [internalDataValue, setInternalDataValue] = useState(keptValue)

    const [neverTyped, setNeverTyped] = useState(true)
    const debouncedValue = useDebounce(internalDataValue, 500)

    const onChange = ev => {
      ev = ev.target?.value || ev
      setInternalDataValue(ev)
      if (neverTyped) {
        setNeverTyped(false)
      }
    }

    useEffect(() => {
      if (!neverTyped && !noautosave) {
        if (typeof debouncedValue === 'string') {
          ACTIONS.putValue({
            context: dataSource?._id,
            value: debouncedValue,
            props,
            backend,
          })
            .then(() => {}) //props.reload())
            .catch(err => console.error(err))
        }
      }
    }, [backend, context, dataSource, debouncedValue, neverTyped, noautosave, props])

    return (
      <Component
      {...props}
      value={lodash.isNil(internalDataValue) ? '' : internalDataValue}
      onChange={onChange}
    />
    )
  }

  return Internal
}

export default withDynamicInput
