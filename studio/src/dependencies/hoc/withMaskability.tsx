import React from 'react'
import { UserCtx } from '../context/user';
import { getConditionalProperties } from '../utils/filters';
import { NOT_CONNECTED } from '../utils/misc';

const withMaskability = (Component: React.FC<any>) => {
  const internal = ({
    hiddenRoles,
    user,
    dataSource,
    ...props
  }: {
    hiddenRoles: string
    user: UserCtx
    dataSource: any
  }) => {

    const conditional_props=getConditionalProperties(props, dataSource, props.getComponentValue)

    if (conditional_props?.visibility==false) {
      return null
    }
    // while user not yet fetched, mask items doesn't appear
    if (user === false) {
      return null
    }

    const rolesToHide = JSON.parse(hiddenRoles || "[]")
    const roleUser = user && user?.role || NOT_CONNECTED

    // if nothing to hide, render
    if (rolesToHide?.length && rolesToHide.length === 0) {
      return <Component {...props} />
    }

    // When roleUser is available, reveal
    if (rolesToHide.includes(roleUser)) {
      return null
    }

    return <Component {...props} />

  }

  return internal
}

export default withMaskability
