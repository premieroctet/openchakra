import React from 'react'
import lodash from 'lodash'

const withDynamicDate = Component => {
  const internal = props => {
    const value = lodash.get(props.dataSource, props.attribute)
    const date = new Date(value).toLocaleDateString()
    const dateOptionsToConsider = props?.['data-format'] ? props?.['data-format'] : {}

    // TODO fr-FR locale dynamic
    const dateTimeFormat = new Intl.DateTimeFormat('fr-FR', dateOptionsToConsider);
    const dateToDisplay = dateTimeFormat.format(date)

    return <Component {...lodash.omit(props, ['children'])}>{dateToDisplay}</Component>
  }

  return internal
}

export default withDynamicDate
