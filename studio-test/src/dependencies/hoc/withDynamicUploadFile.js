import React from "react";
// import get from 'lodash/get'

const withDynamicUploadFile = Component => {
  const Internal = ({ dataSource, context, backend, attribute, ...props }) => {
    // const value = get(dataSource, props.attribute)
    return (
      <Component
        {...props}
        backend={backend}
        attribute={attribute}
        ressource_id={context}
      />
    );
  };

  return Internal;
};

export default withDynamicUploadFile;
