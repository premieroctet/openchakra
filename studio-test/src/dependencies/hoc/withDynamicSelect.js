import React from "react";

const withDynamicSelect = Component => {
  const Internal = props => {
    const values = props.dataSource;
    const attribute = props.attribute;
    return (
      <Component {...props}>
        <option value={null}></option>
        {(values || []).map(v => (
          <option value={v._id}>{attribute ? v[attribute] : v}</option>
        ))}
      </Component>
    );
  };

  return Internal;
};

export default withDynamicSelect;
