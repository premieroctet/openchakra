import React from 'react'
import { UserCtx } from '../context/user';

import { NOT_CONNECTED } from '../utils/misc';

const withMaskability = (Component: React.FC<any>) => {
  const internal = ({
    hiddenRoles,
    user,
    ...props
  }: {
    hiddenRoles: string
    user: UserCtx
  }) => {
    
    const rolesToHide = JSON.parse(hiddenRoles)
    const roleUser = user && user?.role || NOT_CONNECTED

    // while user not yet fetched, mask items doesn't appear
    if (user === false) {
      return null
    }

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
