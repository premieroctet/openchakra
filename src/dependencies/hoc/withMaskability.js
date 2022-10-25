import React from 'react'

const withMaskability = Component => {
  const internal = ({ hiddenRoles, user, ...props }) => {
    const roles = (hiddenRoles || '').split(',')
    if (roles.includes(user?.role)) {
      return null
    }
    return <Component {...props}>{props.children}</Component>
  }

  return internal
}

export default withMaskability
