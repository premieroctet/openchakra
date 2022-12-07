import React from "react";
import lodash from "lodash";

const withDynamicImage = Component => {
  const internal = props => {
    const src = lodash.get(props.dataSource, props.attribute);
    if (!src) {
      return null;
    }
    return <Component {...lodash.omit(props, ["children"])} src={src} />;
  };

  return internal;
};

export default withDynamicImage;
