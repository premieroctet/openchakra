import React from "react";

const withMaskability = (Component: React.FC<any>) => {
  const internal = ({
    hiddenRoles,
    user,
    ...props
  }: {
    hiddenRoles: string;
    user: { role: string };
  }) => {
    const rolesToHide = JSON.parse(hiddenRoles);
    const roleUser = user?.role;

    // if nothing to hide, render
    if (rolesToHide?.length && rolesToHide.length === 0) {
      return <Component {...props} />;
    }

    // When roleUser is available, reveal
    if (roleUser) {
      if (rolesToHide.includes(roleUser)) {
        return null;
      }
      return <Component {...props} />;
    }
    return null;
  };

  return internal;
};

export default withMaskability;
