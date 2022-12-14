import React, { useEffect, useState } from "react";
import lodash from "lodash";

import { ACTIONS } from "../utils/actions";
import useDebounce from "../hooks/useDebounce.hook";

const withDynamicInput = Component => {
  const Internal = ({ dataSource, context, backend, ...props }) => {
    let keptValue = lodash.get(dataSource, props.attribute);

    const isADate =
      !isNaN(Date.parse(keptValue)) && new Date(Date.parse(keptValue));
    if (props?.type === "datetime-local") {
      if (isADate instanceof Date) {
        keptValue = isADate.toISOString().slice(0, 16);
      }
    }
    if (props?.type === "date") {
      if (isADate instanceof Date) {
        keptValue = isADate.toISOString().slice(0, 10);
      }
    }

    const [internalDataValue, setInternalDataValue] = useState(keptValue);

    const [neverTyped, setNeverTyped] = useState(true);
    const debouncedValue = useDebounce(internalDataValue, 500);

    const onChange = ev => {
      setInternalDataValue(ev.target.value);
      if (neverTyped) {
        setNeverTyped(false);
      }
    };

    useEffect(() => {
      if (!neverTyped) {
        ACTIONS.putValue({
          context: dataSource?._id,
          value: debouncedValue,
          props,
          backend
        })
          .then(() => props.reload())
          .catch(err => console.error(err));
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backend, context, debouncedValue, neverTyped]);

    return (
      <Component {...props} value={internalDataValue} onChange={onChange} />
    );
  };

  return Internal;
};

export default withDynamicInput;
