import React from 'react'
import lodash from 'lodash'

const withDynamicSource = Component => {
  const internal = props => {

    /* Je ferais bien un truc différent qui va fetcher chaque source de données, pour le current-user */

    const value = lodash.get(props.dataSource, props.attribute)
    const spreaded = {...lodash.omit(props, ['children']), value}

    return <Component {...spreaded} />
  }

  return internal
}

export default withDynamicSource
